import React from 'react';
import { Camera, Mail, Instagram, Twitter, Facebook, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-300">FotoGo</span>
            </div>
            <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
              La comunidad fotográfica donde tu creatividad tiene recompensa real. Participa, compite y gana premios increíbles con cada foto que compartas
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all duration-300 border border-slate-700 hover:border-transparent group">
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 border border-slate-700 hover:border-transparent group">
                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 border border-slate-700 hover:border-transparent group">
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Producto</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 font-medium">Características</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 font-medium">Premios</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 font-medium">Comunidad</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 font-medium">Blog</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contacto</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 font-medium">Soporte</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 font-medium">Términos</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-200 font-medium">Privacidad</a></li>
              <li className="flex items-center text-slate-400">
                <Mail className="w-4 h-4 mr-2 text-orange-400" />
                <span className="font-medium">info.fotogo.esp@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-400 font-medium">
            © 2024 FotoGo. Todos los derechos reservados. Hecho con ❤️ para fotógrafos que le encante crear.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;