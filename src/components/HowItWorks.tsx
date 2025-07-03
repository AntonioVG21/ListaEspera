import React from 'react';
import { Camera, Heart, Gift, Trophy, Sparkles } from 'lucide-react';
import { useWaitlistStats } from '../hooks/useWaitlistStats';

const steps = [
  {
    icon: Camera,
    title: '📸 ¡Captura el Momento!',
    description: 'Cada día te lanzamos un reto súper divertido: "Fotografía algo azul", "Captura una sonrisa", "Encuentra sombras épicas"... ¡Tu creatividad es el límite!',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    emoji: '🎯'
  },
  {
    icon: Heart,
    title: '❤️ Vota y Conecta',
    description: '¡Descubre fotos increíbles de otros fotógrafos! Dale like a tus favoritas, comenta, y gana monedas por cada voto. ¡La comunidad más cool de fotografía te espera!',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
    emoji: '🔥'
  },
  {
    icon: Gift,
    title: '🎁 ¡Premios Reales!',
    description: 'Intercambia tus monedas por premios increíbles: AirPods, cámaras profesionales, tarjetas Amazon, trípodes... ¡Tus fotos literalmente te dan dinero!',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50',
    emoji: '💰'
  }
];

const HowItWorks: React.FC = () => {
  const { totalUsers, loading } = useWaitlistStats();

  // Función para formatear números de manera atractiva
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo - menos intrusivos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 mb-6">
            <Sparkles className="w-5 h-5 mr-3 text-orange-500" />
            <span className="text-orange-700 font-bold">¿Cómo funciona la magia?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight px-4">
            Tres pasos para
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 break-words">
              ganar premios reales
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Es súper fácil y súper divertido. ¡En menos de 5 minutos ya estarás ganando tus primeras monedas! 🚀
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className={`bg-gradient-to-br ${step.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50 relative overflow-hidden`}>
                {/* Número del paso con emoji */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-white to-gray-50 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                  <span className="text-2xl">{step.emoji}</span>
                </div>
                
                {/* Elementos decorativos estáticos */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
                
                {/* Icono principal */}
                <div className="mb-8 flex justify-center">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-2xl font-black text-gray-900 mb-6 text-center leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-center font-medium text-lg">
                  {step.description}
                </p>

                {/* Indicador de paso */}
                <div className="flex justify-center mt-6">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color}`}></div>
                    <span className="text-sm font-bold text-gray-500">Paso {index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de motivación extra con datos reales */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                {loading 
                  ? '¡Cargando estadísticas...' 
                  : `¡Ya hay más de ${formatNumber(totalUsers)} fotógrafos esperando! 📸`
                }
              </h3>
              <p className="text-lg md:text-xl text-white/90 font-medium">
                Únete ahora y recibe <span className="font-black">350 monedas extra</span> para empezar con ventaja 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;