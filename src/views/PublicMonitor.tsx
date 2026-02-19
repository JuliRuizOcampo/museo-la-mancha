
import React from 'react';
import { MOCK_OBRAS } from '../constants';

interface Props {
  onBack: () => void;
}

const PublicMonitor: React.FC<Props> = ({ onBack }) => {
  // Duplicamos las obras para asegurar un bucle infinito visualmente perfecto
  const displayObras = [...MOCK_OBRAS, ...MOCK_OBRAS, ...MOCK_OBRAS, ...MOCK_OBRAS];

  return (
    <div className="h-screen bg-background-dark text-white overflow-hidden flex flex-col selection:bg-primary/30">
      {/* Cabecera Flotante Inmersiva */}
      <header className="h-28 bg-[#0a0c12]/70 backdrop-blur-2xl border-b border-primary/20 px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-primary rounded-2xl text-background-dark shadow-[0_0_30px_rgba(236,182,19,0.3)]">
            <span className="material-symbols-outlined text-4xl font-black">museum</span>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none text-white">Museo de La Mancha</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="size-2 rounded-full bg-primary animate-ping"></span>
              <p className="text-[10px] font-black uppercase text-primary tracking-[0.4em]">Monitor de Vestíbulo • Vivo</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Colección Permanente</p>
            <p className="text-lg font-bold text-white uppercase italic">"Don Quijote y su tiempo"</p>
          </div>
          <button onClick={onBack} className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-slate-500 hover:text-primary group">
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>
      </header>

      {/* Marquesina Vertical Infinita */}
      <div className="flex-1 relative bg-[#05070a] overflow-hidden">
        {/* Gradientes de desvanecimiento para mayor inmersión */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#05070a] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05070a] to-transparent z-20 pointer-events-none"></div>
        
        <div className="h-full flex justify-center pt-10">
          <div className="w-full max-w-5xl animate-marquee-vertical space-y-16 px-6">
            {displayObras.map((obra, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-white/5 rounded-[50px] p-10 flex flex-col md:flex-row items-center gap-12 border border-white/10 hover:border-primary/40 transition-all duration-1000">
                {/* Imagen con efecto Parallax simulado */}
                <div className="w-full md:w-80 h-80 rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] shrink-0 group-hover:scale-105 transition-transform duration-[3000ms]">
                   <img src={obra.imagenUrl} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[4000ms]" alt={obra.titulo} />
                </div>

                <div className="flex-1 text-center md:text-left">
                   <div className="inline-flex items-center gap-3 mb-6">
                      <span className="h-[2px] w-8 bg-primary"></span>
                      <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">{obra.sala}</span>
                   </div>
                   <h2 className="text-5xl md:text-6xl font-black mb-6 leading-[1.1] text-white group-hover:text-primary transition-colors duration-500">{obra.titulo}</h2>
                   
                   <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Autor</p>
                         <p className="text-xl font-bold text-slate-200">{obra.autor}</p>
                      </div>
                      <div className="hidden lg:block h-12 w-px bg-white/10 self-center mx-auto"></div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Periodo Histórico</p>
                         <p className="text-xl font-bold text-slate-200">{obra.periodo}</p>
                      </div>
                   </div>
                </div>

                {/* Decoración de fondo */}
                <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-[200px]">palette</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pie de Página de Monitorización */}
      <footer className="h-16 bg-[#0a0c12] border-t border-primary/20 px-12 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
         <div className="flex gap-10">
            <span>© 2024 Fundación Patrimonio de La Mancha</span>
            <span className="hidden sm:inline">Localización: Vestíbulo Principal</span>
         </div>
         <div className="flex items-center gap-3 text-primary/70">
            <span className="material-symbols-outlined text-sm">wifi_protected_setup</span>
            Actualización Automática Activa
         </div>
      </footer>
    </div>
  );
};

export default PublicMonitor;
