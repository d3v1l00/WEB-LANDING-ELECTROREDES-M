import React from 'react';
import './Providers.css';

const providers = [
  { name: 'Imou', logo: '/proveedores/imou.png' },
  { name: 'Hikvision', logo: '/proveedores/hikvision.png' },
  { name: 'Hilook', logo: '/proveedores/hilook.png' },
  { name: 'Dahua', logo: '/proveedores/dahua.png' },
  { name: 'IP-COM', logo: '/proveedores/ipcom.png' },
  { name: 'Cisco', logo: '/proveedores/cisco.png' },
  { name: 'TP-Link', logo: '/proveedores/tplink.png' },
];

const Providers = () => (
  <section id="providers" className="section providers-section">
    <h2 className="section-title">Nuestros Proveedores</h2>
    <p className="section-subtitle">Trabajamos con las mejores marcas del mercado</p>
    <div className="providers-logos">
      {providers.map((prov, idx) => (
        <div className="provider-logo-card" key={idx}>
          <img
            src={prov.logo}
            alt={prov.name}
            className="provider-logo-img"
            onError={e => { e.target.onerror = null; e.target.src = '/proveedores/placeholder.svg'; }}
          />
          <span className="provider-logo-name">{prov.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Providers; 