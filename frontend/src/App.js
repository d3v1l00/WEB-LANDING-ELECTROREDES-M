import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Providers from './components/Providers';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingSocial from './components/FloatingSocial';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Providers />
      <ContactForm />
      <Footer />
      <FloatingSocial />
    </div>
  );
}

export default App; 