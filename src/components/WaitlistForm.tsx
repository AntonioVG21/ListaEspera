import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Mail, User, CheckCircle, Loader2, Gift, Sparkles, AlertCircle } from 'lucide-react';
import { assignInitialCoins } from '../lib/userCoins';

const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validación básica
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Por favor completa todos los campos');
      setIsSubmitting(false);
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      setIsSubmitting(false);
      return;
    }

    try {
      // Guardar en Firebase Firestore con reintentos
      const waitlistData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        timestamp: serverTimestamp(),
        source: 'landing_page',
        status: 'pending',
        createdAt: new Date().toISOString(),
        browser: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown'
      };

      // Intentar guardar con reintentos
      let retryCount = 0;
      const maxRetries = 3;
      let lastError;

      while (retryCount < maxRetries) {
        try {
          const docRef = await addDoc(collection(db, 'waitlist'), waitlistData);
          console.log('Usuario guardado con ID:', docRef.id);

          // Asignar monedas iniciales
          const coinsResult = await assignInitialCoins(
            formData.email.toLowerCase().trim(),
            formData.name.trim()
          );

          if (coinsResult.success) {
            console.log('Monedas asignadas correctamente');
            break; // Salir del bucle si todo fue exitoso
          }
        } catch (error) {
          lastError = error;
          console.error(`Error en intento ${retryCount + 1}:`, error);
          
          if (retryCount < maxRetries - 1) {
            // Esperar antes de reintentar
            await new Promise(resolve => setTimeout(resolve, 1000));
            retryCount++;
            continue;
          }
          throw error; // Si llegamos aquí, lanzar el último error
        }
      }
      
      setIsSuccess(true);
      setFormData({ name: '', email: '' });
      
      // Opcional: Enviar evento de analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore - gtag puede no estar definido en el tipo Window
        window.gtag('event', 'waitlist_signup', {
          event_category: 'engagement',
          event_label: 'fotogo_waitlist'
        });
      }
      
    } catch (err: any) {
      console.error('Error adding document: ', err);
      
      // Manejo de errores específicos
      if (err.code === 'permission-denied') {
        setError('Error de permisos. Por favor intenta más tarde.');
      } else if (err.code === 'unavailable') {
        setError('Servicio temporalmente no disponible. Intenta más tarde.');
      } else {
        setError('Hubo un error al registrarte. Por favor intenta de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl p-8 max-w-md mx-auto text-center border border-green-200 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse delay-500"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4">¡Bienvenido a FotoGo!</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            🎉 Te hemos registrado en nuestra lista VIP. Te contactaremos pronto con acceso anticipado y 
            <span className="font-bold text-green-600"> 350 monedas extra</span> para empezar.
          </p>
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">Bonus de bienvenida activado</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <p className="text-sm text-gray-500">
            📧 Revisa tu email para confirmar tu registro
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-slate-200 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-500"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-2">
            Únete a la Lista VIP
          </h3>
          <p className="text-gray-600 font-medium">
            Acceso anticipado + 350 monedas extra
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-medium bg-white/50 backdrop-blur-sm"
                placeholder="Tu nombre completo"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-medium bg-white/50 backdrop-blur-sm"
                placeholder="tu@email.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-3 relative z-10" />
                <span className="relative z-10">Registrando...</span>
              </>
            ) : (
              <>
                <Gift className="w-5 h-5 mr-3 relative z-10" />
                <span className="relative z-10">Únete Ahora y Consigue 350 Monedas</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 font-medium">
          🔒 Al registrarte, aceptas recibir actualizaciones sobre el lanzamiento
        </p>
      </div>
    </div>
  );
};

export default WaitlistForm;