import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaShieldAlt, FaWifi, FaBolt } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Instalación de Cámaras de Seguridad",
    "Redes de Datos y Energía",
    "Tecnología de Vanguardia",
    "Seguridad Garantizada"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hola ElectroRedes Medellín, me gustaría obtener información sobre sus servicios de cámaras de seguridad y redes de datos.");
    window.open(`https://wa.me/573136176784?text=${message}`, '_blank');
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            {/* Versión con logo */}
            <div className="hero-logo">
              <img src="/logo.jpg" alt="ElectroRedes Medellín" className="hero-logo-image" />
            </div>
            
            {/* Versión con texto (comentada para futura referencia)
            <h1 className="hero-title">
              <span className="hero-title-main">ElectroRedes</span>
              <span className="hero-title-sub">Medellín</span>
            </h1>
            */}
            
            <div className="hero-subtitle">
              <span className="typing-text">
                {texts[currentText]}
                <span className="typing-cursor">|</span>
              </span>
            </div>
            
            <p className="hero-description">
              Especialistas en instalación de cámaras de seguridad, redes de datos y energía. 
              Tecnología de vanguardia para proteger tu negocio y hogar.
            </p>
            
            <div className="hero-buttons">
              <button onClick={handleWhatsApp} className="btn btn-primary hero-btn">
                <FaWhatsapp className="btn-icon" />
                Contactar por WhatsApp
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-content">
                <FaShieldAlt className="hero-card-icon" />
                <h3>Seguridad Total</h3>
                <p>Protección 24/7 para tu tranquilidad</p>
              </div>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <FaWifi className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Cobertura</span>
                </div>
              </div>
              
              <div className="stat-item">
                <FaBolt className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Monitoreo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Desliza para explorar</span>
      </div>
    </section>
  );
};

export default Hero; 