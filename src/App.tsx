import React from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      
      {/* Sección de Lista de Espera */}
      <section id="waitlist" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Listo para Empezar?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Únete a nuestra lista de espera y sé de los primeros en acceder a FotoGo. 
              Además, recibirás 350 monedas extra para empezar con ventaja.
            </p>
          </div>
          
          <WaitlistForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;