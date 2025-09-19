import React from 'react';
import { FaVideo, FaNetworkWired, FaBolt, FaShieldAlt } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <FaVideo />,
      title: "Cámaras de Seguridad",
      description: "Instalación y configuración de sistemas de videovigilancia con tecnología de vanguardia.",
      features: ["Cámaras IP", "Sistemas DVR/NVR", "Vigilancia 24/7", "Acceso remoto"]
    },
    {
      icon: <FaNetworkWired />,
      title: "Redes de Datos",
      description: "Diseño e implementación de infraestructura de red para empresas y hogares.",
      features: ["Cableado estructurado", "Switches y routers", "WiFi empresarial", "Redes VLAN"]
    },
    {
      icon: <FaBolt />,
      title: "Instalación Eléctrica",
      description: "Servicios eléctricos profesionales para sistemas de seguridad y tecnología.",
      features: ["Instalaciones eléctricas", "UPS y estabilizadores", "Iluminación LED", "Mantenimiento"]
    }
  ];

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="section-subtitle">
          Soluciones integrales en seguridad y tecnología para proteger tu negocio y hogar
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card glass-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="service-feature">
                    <FaShieldAlt className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <div className="cta-card glass-card">
            <h3>¿Necesitas una solución personalizada?</h3>
            <p>Contáctanos para evaluar tus necesidades y ofrecerte la mejor solución</p>
            <button 
              className="hero-btn-main"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 