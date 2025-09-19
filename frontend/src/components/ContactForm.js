import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaUser, FaCheck, FaTimes } from 'react-icons/fa';
import { 
  sanitizeAndValidateForm, 
  AdvancedRateLimiter, 
  getUserIdentifier, 
  logSecurityEvent 
} from '../utils/security';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Campo oculto anti-bot
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [rateLimiter] = useState(() => new AdvancedRateLimiter(3, 60000, 300000)); // 3 intentos/min, bloqueo 5min
  const [userIdentifier] = useState(() => getUserIdentifier());

  // Validación con sanitización robusta
  const validateForm = () => {
    const validation = sanitizeAndValidateForm(formData);
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      logSecurityEvent('form_validation_failed', {
        errors: validation.errors,
        formData: {
          nameLength: formData.name?.length || 0,
          emailLength: formData.email?.length || 0,
          messageLength: formData.message?.length || 0
        }
      });
    }
    
    return validation;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Aplicar sanitización básica en tiempo real
    let sanitizedValue = value;
    if (name === 'name') {
      sanitizedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').substring(0, 100);
    } else if (name === 'email') {
      sanitizedValue = value.toLowerCase().replace(/[^a-z0-9@._-]/g, '').substring(0, 254);
    } else if (name === 'message') {
      sanitizedValue = value.replace(/[<>]/g, '').substring(0, 2000);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Limpiar error cuando el usuario escriba
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar honeypot (protección anti-bot)
    if (formData.honeypot) {
      logSecurityEvent('bot_detected', { honeypot: formData.honeypot });
      setSubmitStatus('success'); // Simular éxito para confundir bots
      return;
    }
    
    // Verificar rate limiting
    const rateLimitResult = rateLimiter.canAttempt(userIdentifier);
    if (!rateLimitResult.allowed) {
      logSecurityEvent('rate_limit_exceeded', {
        reason: rateLimitResult.reason,
        timeRemaining: rateLimitResult.timeRemaining
      });
      
      const errorMessage = rateLimitResult.reason === 'blocked' 
        ? `Cuenta bloqueada. Intenta en ${Math.ceil(rateLimitResult.timeRemaining / 60)} minutos.`
        : `Demasiados intentos. Espera ${rateLimitResult.timeRemaining} segundos.`;
        
      setErrors({ general: errorMessage });
      setSubmitStatus('error');
      return;
    }
    
    // Validar y sanitizar formulario
    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Usar datos sanitizados
      const response = await fetch('https://formspree.io/f/xrbkddlb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: validation.sanitizedData.name,
          email: validation.sanitizedData.email,
          message: validation.sanitizedData.message,
          _subject: 'Nuevo mensaje de contacto - ElectroRedes Medellín',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent.substring(0, 100),
          // Datos adicionales para análisis de seguridad
          securityMetadata: {
            rateLimit: rateLimitResult,
            formVersion: '2.0',
            sanitized: true
          }
        })
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setErrors({});
        rateLimiter.reset(userIdentifier);
        
        logSecurityEvent('form_submitted_successfully', {
          nameLength: validation.sanitizedData.name.length,
          emailDomain: validation.sanitizedData.email.split('@')[1],
          messageLength: validation.sanitizedData.message.length
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setSubmitStatus('error');
      
      logSecurityEvent('form_submission_error', {
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola ElectroRedes Medellín,\n\nMi nombre es: ${formData.name || '[Tu nombre]'}\nMi email es: ${formData.email || '[Tu email]'}\n\nMensaje:\n${formData.message || '[Tu mensaje]'}`
    );
    window.open(`https://wa.me/573136176784?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">
          ¿Necesitas información sobre nuestros servicios? Contáctanos y te responderemos lo antes posible.
        </p>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-card glass-card">
              <h3>Información de Contacto</h3>
              <div className="contact-item">
                <FaWhatsapp className="contact-icon" />
                <div>
                  <h4>WhatsApp</h4>
                  <p>+57 313 617 6784</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>gill1@hotmail.es</p>
                </div>
              </div>
              <div className="contact-item">
                <FaUser className="contact-icon" />
                <div>
                  <h4>Propietario</h4>
                  <p>Gilberto Rodriguez</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleEmailSubmit} className="contact-form glass-card">
              <h3>Envíanos un Mensaje</h3>
              
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Tu nombre completo"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows="5"
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              {/* Campo honeypot para detectar bots */}
              <div className="form-group" style={{ display: 'none' }}>
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>
              
              {errors.general && (
                <div className="error-message" style={{ textAlign: 'center', marginBottom: '20px' }}>
                  {errors.general}
                </div>
              )}
              
              <div className="form-buttons">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      <FaEnvelope className="btn-icon" />
                      Enviar por Email
                    </>
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleWhatsApp}
                >
                  <FaWhatsapp className="btn-icon" />
                  Enviar por WhatsApp
                </button>
              </div>
              
              {submitStatus && (
                <div className={`submit-status ${submitStatus}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <FaCheck className="status-icon" />
                      <span>¡Mensaje enviado exitosamente!</span>
                    </>
                  ) : (
                    <>
                      <FaTimes className="status-icon" />
                      <span>Error al enviar el mensaje. Intenta de nuevo.</span>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="contact-map-info">
          <h4>Atención virtual y servicios presenciales en Medellín</h4>
          <div className="contact-map-container">
            <iframe
              title="Mapa Medellín"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.619964893019!2d-75.5798156852376!3d6.244338995484998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44282d1e6b1e0b%3A0x1e7d1b1b1b1b1b1b!2sMedell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1680000000000!5m2!1ses-419!2sco"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 