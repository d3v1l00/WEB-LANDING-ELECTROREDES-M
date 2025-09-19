import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src="/logo.jpg" alt="ElectroRedes Medellín" className="logo-image" />
        </div>

        {/* Navegación Desktop */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            <li><button onClick={() => scrollToSection('hero')} className="nav-link">Inicio</button></li>
            <li><button onClick={() => scrollToSection('services')} className="nav-link">Servicios</button></li>
            <li><button onClick={() => scrollToSection('gallery')} className="nav-link">Productos</button></li>
            <li><button onClick={() => scrollToSection('providers')} className="nav-link">Proveedores</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="nav-link">Contacto</button></li>
          </ul>
        </nav>

        {/* Redes sociales Desktop */}
        <div className="header-social">
          <a href="https://www.facebook.com/electroredes1" target="_blank" rel="noopener noreferrer" className="header-social-link" title="Facebook">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/electroredes.medellin" target="_blank" rel="noopener noreferrer" className="header-social-link" title="Instagram">
            <FaInstagram />
          </a>
        </div>

        {/* Botón de menú móvil */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegación Móvil */}
        <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-mobile-list">
            <li><button onClick={() => scrollToSection('hero')} className="nav-mobile-link">Inicio</button></li>
            <li><button onClick={() => scrollToSection('services')} className="nav-mobile-link">Servicios</button></li>
            <li><button onClick={() => scrollToSection('gallery')} className="nav-mobile-link">Productos</button></li>
            <li><button onClick={() => scrollToSection('providers')} className="nav-mobile-link">Proveedores</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="nav-mobile-link">Contacto</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 