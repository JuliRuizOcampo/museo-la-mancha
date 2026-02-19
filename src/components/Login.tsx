
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onPublic: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onPublic }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de roles por email
    let role: UserRole = 'CATALOGADOR';
    let name = 'Catalogador';

    if (email.includes('director')) {
      role = 'DIRECTOR';
      name = 'Dr. Arturo Quijano';
    } else if (email.includes('restaurador')) {
      role = 'RESTAURADOR';
      name = 'Dr. Mateo Velázquez';
    }

    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      avatar: 'https://picsum.photos/100/100'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 bg-surface-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Branding Side */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/20 to-transparent">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-4xl">museum</span>
              <h1 className="text-2xl font-bold tracking-tight text-white">Museo de La Mancha</h1>
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight">Preservando la historia de nuestra tierra.</h2>
          </div>
          <p className="text-white/60 italic">"El arte es la mentira que nos permite comprender la verdad." <br/> <span className="text-primary font-bold">— PABLO PICASSO</span></p>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white">Iniciar Sesión</h3>
            <p className="text-slate-400 text-sm">Acceso al sistema central de gestión museística.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                required
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="usuario@museomancha.es"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Contraseña</label>
              <input 
                type="password" 
                required
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              ACCEDER <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <button 
              onClick={onPublic}
              className="w-full py-3 text-slate-400 hover:text-primary text-sm font-bold border border-white/10 rounded-lg transition-all"
            >
              ACCESO MONITOR DE VESTÍBULO
            </button>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <span className="text-primary font-bold">INFO DE ACCESO:</span> Use 'director', 'restaurador' o 'catalogador' en el email para probar las diferentes vistas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
