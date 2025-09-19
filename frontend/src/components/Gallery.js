import React from 'react';
import './Gallery.css';

const products = [
  { name: 'Imou Ranger Dual', brand: 'Imou', img: '/productos/imou-ranger-dual.png' },
  { name: 'Imou Cruiser Triple', brand: 'Imou', img: '/productos/imou-cruiser-triple.jpg' },
  { name: 'Hikvision Turbo HD', brand: 'Hikvision', img: '/productos/hikvision-turbo-hd.png' },
  { name: 'DVR Hikvision 8CH DS-7108HGHI', brand: 'Hikvision', img: '/productos/hikvisiondvr.png' },
  { name: 'Hilook IPC-T221H', brand: 'Hilook', img: '/productos/hilook-ipc-t221h.png' },
  { name: 'IP-COM G1105P-4-63W', brand: 'IP-COM', img: '/productos/ipcom-g1105p.jpg' },
  { name: 'Cisco Catalyst 2960', brand: 'Cisco', img: '/productos/cisco-catalyst-2960.jpg' },
  { name: 'TP-Link Archer C6', brand: 'TP-Link', img: '/productos/tplink-archer-c6.jpg' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="section gallery-section">
      <h2 className="section-title">Galería de Productos</h2>
      <p className="section-subtitle">Algunos de los equipos y marcas que instalamos</p>
      <div className="gallery-grid">
        {products.map((product, idx) => (
          <div className="gallery-card gallery-3d" key={idx}>
            <div className="gallery-img-container">
              <img
                src={product.img}
                alt={product.name}
                className="gallery-img"
                loading="lazy"
                onError={e => { e.target.onerror = null; e.target.src = '/productos/placeholder.svg'; }}
              />
            </div>
            <div className="gallery-info">
              <h3>{product.name}</h3>
              <span className="gallery-brand">{product.brand}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery; 