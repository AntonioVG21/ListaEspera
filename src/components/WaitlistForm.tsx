import React, { useState } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Mail, User, CheckCircle, Loader2, Gift, Sparkles, AlertCircle } from 'lucide-react';
import { assignInitialCoins } from '../lib/userCoins';

const WaitlistForm: React.FC = () => {
  // Estado para almacenar datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: ''
  });

  // Estado para controlar el proceso de envío, éxito y errores
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Función que maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validación básica: campos no vacíos
    if (!formData.name.trim() || !formData.email.trim() || !formData.age.trim() || !formData.city.trim()) {
      setError('Por favor completa todos los campos');
      setIsSubmitting(false);
      return;
    }

    // Validación simple del email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      setIsSubmitting(false);
      return;
    }

    // Validar que edad sea número positivo
    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      setError('Por favor ingresa una edad válida');
      setIsSubmitting(false);
      return;
    }

    try {
      // *** VERIFICAR SI YA EXISTE EL EMAIL EN WAITLIST ***
      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', formData.email.toLowerCase().trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si el email ya está registrado, mostrar error
        setError('Este email ya está registrado en la lista VIP.');
        setIsSubmitting(false);
        return;
      }

      // *** OBTENER EL ÚLTIMO NÚMERO CORRELATIVO PARA ASIGNAR EL SIGUIENTE ***
      const orderQuery = query(waitlistRef, orderBy('order', 'desc'), limit(1));
      const orderSnapshot = await getDocs(orderQuery);
      let nextOrder = 1; // Default para el primer registro

      if (!orderSnapshot.empty) {
        // Obtener el último número correlativo y sumarle 1
        const lastOrder = orderSnapshot.docs[0].data().order;
        if (typeof lastOrder === 'number') nextOrder = lastOrder + 1;
      }

      // *** DATOS A GUARDAR EN WAITLIST ***
      const waitlistData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        age: ageNum,
        city: formData.city.trim(),
        timestamp: serverTimestamp(),
        source: 'landing_page',
        status: 'pending',
        createdAt: new Date().toISOString(),
        browser: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
        order: nextOrder // Número correlativo de registro
      };

      // Guardar nuevo registro en waitlist
      const docRef = await addDoc(waitlistRef, waitlistData);
      console.log('Usuario guardado en waitlist con ID:', docRef.id);

      // *** GUARDAR DATOS EN COLECCIÓN USERS ***
      const userDocRef = doc(db, 'users', formData.email.toLowerCase().trim());
      await setDoc(
        userDocRef,
        {
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          age: ageNum,
          city: formData.city.trim(),
          createdAt: new Date().toISOString(),
          status: 'active',
        },
        { merge: true }
      );

      // *** ASIGNAR MONEDAS INICIALES AL USUARIO ***
      const coinsResult = await assignInitialCoins(formData.email.toLowerCase().trim(), formData.name.trim());
      if (!coinsResult.success) {
        console.warn('No se pudieron asignar las monedas iniciales:', coinsResult.error);
      }

      // Marcar éxito y limpiar formulario
      setIsSuccess(true);
      setFormData({ name: '', email: '', age: '', city: '' });

      // *** EVENTO DE ANALYTICS (si gtag está disponible) ***
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore
        window.gtag('event', 'waitlist_signup', {
          event_category: 'engagement',
          event_label: 'fotogo_waitlist',
        });
      }
    } catch (err: any) {
      // Manejo de errores según código
      console.error('Error registrando usuario: ', err);
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

  // Función para actualizar estado con los valores del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Limpiar error si lo hay al escribir
    if (error) setError('');
  };

  // Render cuando el registro fue exitoso
  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl p-8 max-w-md mx-auto text-center border border-green-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse delay-500"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4">¡Bienvenido a FotoGo!</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            🎉 Te hemos registrado en nuestra lista VIP. Te contactaremos pronto con acceso anticipado y{' '}
            <span className="font-bold text-green-600">350 monedas extra</span> para empezar.
          </p>
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">Bonus de bienvenida activado</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <p className="text-sm text-gray-500">📧 Revisa tu email para confirmar tu registro</p>
        </div>
      </div>
    );
  }

  // Render formulario normal
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-500"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-2">Únete a la Lista VIP</h3>
          <p className="text-gray-600 font-medium">Acceso anticipado + 350 monedas extra</p>
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

          <div>
            <label htmlFor="age" className="block text-sm font-bold text-gray-700 mb-3">
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              required
              className="w-full pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-medium bg-white/50 backdrop-blur-sm"
              placeholder="Tu edad"
              disabled={isSubmitting}
              min="1"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-3">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-medium bg-white/50 backdrop-blur-sm"
              placeholder="Tu ciudad"
              disabled={isSubmitting}
            />
          </div>

          {/* Mostrar error si existe */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Botón de envío */}
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
