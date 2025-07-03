import React from 'react';
import { Camera, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useWaitlistStats } from '../hooks/useWaitlistStats';

const Hero: React.FC = () => {
  const { totalUsers, todaySignups, loading } = useWaitlistStats();

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Función para formatear números de manera atractiva
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    return `${num}+`;
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Elementos decorativos de fondo mejorados */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="flex items-center justify-center min-h-screen">
          {/* Contenido principal centrado */}
          <div className="text-center space-y-8 max-w-5xl">
            {/* Logo/Nombre de la app - PROMINENTE */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-orange-400 leading-none tracking-tight">
                FotoGo
              </h1>
            </div>

            {/* Badge de estado con datos reales */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-400/30 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-3 text-orange-400 animate-pulse" />
              <span className="text-orange-300 font-semibold">
                {loading ? 'Cargando...' : `${formatNumber(totalUsers)} fotógrafos esperando - Acceso Anticipado`}
              </span>
            </div>

            {/* Título principal mejorado */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Donde tus fotos
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
                  se convierten en premios
                </span>
              </h2>
            </div>

            {/* Subtítulo mejorado */}
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
              La primera red social de fotografía donde cada foto que subas puede hacerte ganar premios reales. 
              <span className="text-orange-300 font-medium"> Retos diarios, votaciones épicas, recompensas increíbles.</span>
            </p>

            {/* CTA mejorado */}
            <div className="flex justify-center pt-4">
              <button 
                onClick={scrollToWaitlist}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Camera className="w-6 h-6 mr-3 relative z-10" />
                <span className="relative z-10">Únete a la Lista VIP</span>
                <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Estadísticas reales mejoradas */}
            <div className="grid grid-cols-3 gap-8 pt-12 mt-12 border-t border-white/10 max-w-2xl mx-auto">
              <div className="text-center group">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 group-hover:scale-110 transition-transform duration-300">
                  {loading ? '...' : formatNumber(totalUsers)}
                </div>
                <div className="text-slate-400 text-sm font-medium">En lista de espera</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {loading ? '...' : todaySignups}
                </div>
                <div className="text-slate-400 text-sm font-medium">Registros hoy</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:scale-110 transition-transform duration-300">24h</div>
                <div className="text-slate-400 text-sm font-medium">Nuevos retos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;