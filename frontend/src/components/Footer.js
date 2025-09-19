import React from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';
// import { FaShieldAlt } from 'react-icons/fa'; // Guardado para versión con icono
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hola ElectroRedes Medellín, me gustaría obtener información sobre sus servicios.");
    window.open(`https://wa.me/573136176784?text=${message}`, '_blank');
  };

  return (
    <footer className="footer">

      
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            {/* Versión con logo */}
            <div className="footer-logo">
              <img src="/logo.jpg" alt="ElectroRedes Medellín" className="footer-logo-image" />
            </div>
            
            {/* Versión con texto e icono (comentada para futura referencia)
            <div className="footer-logo">
              <FaShieldAlt className="footer-logo-icon" />
              <div className="footer-logo-text">
                <span className="footer-logo-primary">Electro</span>
                <span className="footer-logo-secondary">Redes</span>
                <span className="footer-logo-location">Medellín</span>
              </div>
            </div>
            */}
            <p className="footer-description">
              Especialistas en instalación de cámaras de seguridad, redes de datos y energía. 
              Protegiendo tu negocio y hogar con tecnología de vanguardia.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Servicios</h3>
            <ul className="footer-links">
              <li><a href="#services">Cámaras de Seguridad</a></li>
              <li><a href="#services">Redes de Datos</a></li>
              <li><a href="#services">Instalación Eléctrica</a></li>
              <li><a href="#gallery">Productos</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contacto</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <FaWhatsapp className="contact-icon" />
                <span>+57 313 617 6784</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>gill1@hotmail.es</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Medellín, Colombia</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Síguenos</h3>
            <div className="footer-social">
              <a href="https://www.facebook.com/electroredes1" target="_blank" rel="noopener noreferrer" className="social-link" title="Síguenos en Facebook">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/electroredes.medellin" target="_blank" rel="noopener noreferrer" className="social-link" title="Síguenos en Instagram">
                <FaInstagram />
              </a>
              <button className="social-link" onClick={handleWhatsApp} title="Contáctanos por WhatsApp">
                <FaWhatsapp />
              </button>
            </div>
            <div className="footer-cta">
              <button onClick={handleWhatsApp} className="btn btn-primary">
                Contactar Ahora
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} ElectroRedes Medellín. Todos los derechos reservados.</p>
            <p>Desarrollado por Alejandro</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 