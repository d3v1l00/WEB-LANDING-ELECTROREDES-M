import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaShareAlt } from 'react-icons/fa';
import './FloatingSocial.css';

const FloatingSocial = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`floating-social ${open ? 'open' : ''}`}>  
      {/* Iconos aparecen ARRIBA del botón */}
      <div className="floating-icons">
        <a href="https://www.instagram.com/electroredes.medellin" target="_blank" rel="noopener noreferrer" className="floating-icon instagram" title="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/electroredes1" target="_blank" rel="noopener noreferrer" className="floating-icon facebook" title="Facebook">
          <FaFacebook />
        </a>
      </div>
      
      {/* Botón principal ABAJO */}
      <button className="floating-btn" onClick={() => setOpen(!open)} title="Redes sociales">
        <FaShareAlt />
      </button>
    </div>
  );
};

export default FloatingSocial; 