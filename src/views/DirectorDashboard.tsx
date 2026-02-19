
import React, { useState } from 'react';
import { User, Obra, SolicitudCesion } from '../types';
import { MOCK_OBRAS, MOCK_SOLICITUDES } from '../constants';

interface Props {
  user: User;
  onLogout: () => void;
}

const DirectorDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [solicitudes, setSolicitudes] = useState<SolicitudCesion[]>(MOCK_SOLICITUDES);

  // Lógica KPI: Rendimiento = Dinero Recaudado Cesiones / Valor Económico
  const getRendimiento = (obra: Obra) => {
    if (!obra.valoracion) return "0.00";
    return (obra.recaudadoCesiones / obra.valoracion).toFixed(2);
  };

  // Gestión FIFO: Procesar la primera solicitud de la lista
  const procesarSiguiente = () => {
    if (solicitudes.length === 0) return;
    const [primera, ...resto] = solicitudes;
    alert(`Procesando solicitud de: ${primera.museo} para la obra "${primera.obraTitulo}"`);
    setSolicitudes(resto);
  };

  const totalValoracion = MOCK_OBRAS.reduce((acc, curr) => acc + curr.valoracion, 0);
  const totalRecaudado = MOCK_OBRAS.reduce((acc, curr) => acc + curr.recaudadoCesiones, 0);
  const rendimientoGlobal = (totalRecaudado / totalValoracion).toFixed(2);

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark">
      {/* Sidebar Corporativo */}
      <aside className="w-72 border-r border-white/5 bg-[#0d1117] p-8 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="flex items-center gap-3">
             <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-background-dark shadow-[0_0_20px_rgba(236,182,19,0.2)]">
                <span className="material-symbols-outlined font-black text-3xl">account_balance</span>
             </div>
             <div>
                <h1 className="text-sm font-black uppercase tracking-widest text-primary leading-none">Museo de<br/>La Mancha</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Dirección Ejecutiva</p>
             </div>
          </div>

          <nav className="space-y-1">
             <div className="flex items-center gap-3 px-4 py-4 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold">
                <span className="material-symbols-outlined">dashboard</span> Panel Central
             </div>
             <div className="flex items-center gap-3 px-4 py-4 text-slate-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                <span className="material-symbols-outlined">swap_horiz</span> Gestión de Cesiones
             </div>
             <div className="flex items-center gap-3 px-4 py-4 text-slate-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                <span className="material-symbols-outlined">analytics</span> Informes de KPI
             </div>
          </nav>
        </div>

        <div className="space-y-6">
           <div className="flex items-center gap-3 px-2">
              <img src={user.avatar} className="size-10 rounded-full border-2 border-primary/30" alt="dir" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-black text-white truncate">{user.name}</p>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Director General</p>
              </div>
           </div>
           <button onClick={onLogout} className="w-full py-3 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/10 rounded-xl border border-rose-500/20 transition-all">Cerrar Sesión</button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-[#0d1117]/50 backdrop-blur-md">
           <div>
              <h2 className="text-2xl font-black">Panel de Control Ejecutivo</h2>
              <p className="text-sm text-slate-500">Métricas de rendimiento y cola de gestión patrimonial.</p>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">Ejecución en Tiempo Real</span>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10">
           {/* Resumen de KPIs */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-dark p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                    <span className="material-symbols-outlined text-6xl text-primary">euro_symbol</span>
                 </div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Valoración Total Activos</p>
                 <h3 className="text-4xl font-black text-primary">€{(totalValoracion / 1000000).toFixed(2)}M</h3>
                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-6">Crecimiento Anual +4.2%</p>
              </div>

              <div className="bg-surface-dark p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                    <span className="material-symbols-outlined text-6xl text-white">insights</span>
                 </div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rendimiento Global (DRC/VE)</p>
                 <h3 className="text-4xl font-black text-white">{rendimientoGlobal}</h3>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-6">Eficiencia de Cesiones Media</p>
              </div>

              <div className="bg-surface-dark p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                    <span className="material-symbols-outlined text-6xl text-white">pending_actions</span>
                 </div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Solicitudes en Cola</p>
                 <h3 className="text-4xl font-black text-white">{solicitudes.length}</h3>
                 <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-6">Gestión por Prioridad FIFO</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Columna FIFO */}
              <div className="lg:col-span-4 space-y-6">
                 <div className="flex justify-between items-center">
                    <h4 className="text-lg font-black flex items-center gap-2">
                       <span className="material-symbols-outlined text-primary">format_list_numbered</span> Cola de Cesiones
                    </h4>
                    <button 
                      onClick={procesarSiguiente}
                      disabled={solicitudes.length === 0}
                      className="text-[10px] font-black bg-primary text-background-dark px-3 py-1 rounded-lg uppercase tracking-widest disabled:opacity-50 hover:brightness-110 transition-all"
                    >
                      Procesar Sig.
                    </button>
                 </div>
                 <div className="space-y-4">
                    {solicitudes.length > 0 ? solicitudes.map((sol, idx) => (
                       <div key={sol.id} className={`p-5 rounded-2xl bg-[#1a212c] border border-white/5 hover:border-primary/40 transition-all ${idx === 0 ? 'ring-2 ring-primary/30 ring-inset border-l-4 border-l-primary' : ''}`}>
                          <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase mb-3">
                             <span>ID #{sol.id}</span>
                             {idx === 0 && <span className="text-primary animate-pulse">PRÓXIMA SALIDA</span>}
                          </div>
                          <h5 className="font-bold text-white mb-1">{sol.museo}</h5>
                          <p className="text-xs text-slate-400 italic">"{sol.obraTitulo}"</p>
                       </div>
                    )) : (
                      <div className="p-8 border-2 border-dashed border-white/5 rounded-2xl text-center text-slate-600 font-bold uppercase text-xs">
                        Sin solicitudes pendientes
                      </div>
                    )}
                 </div>
              </div>

              {/* Tabla de Rendimiento */}
              <div className="lg:col-span-8 bg-surface-dark border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden">
                 <div className="mb-8">
                    <h4 className="text-lg font-black">Métricas de Rendimiento por Activo</h4>
                    <p className="text-[10px] text-slate-500 italic mt-1 uppercase font-black tracking-[0.2em]">Fórmula: Rendimiento = DRC / VE</p>
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-white/5 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                             <th className="py-4">Posición</th>
                             <th className="py-4">Obra de Arte</th>
                             <th className="py-4 text-right">Val. Económica (VE)</th>
                             <th className="py-4 text-right">Rendimiento (R)</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {MOCK_OBRAS.sort((a,b) => parseFloat(getRendimiento(b)) - parseFloat(getRendimiento(a))).map((obra, i) => (
                             <tr key={obra.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 font-black text-primary/40 group-hover:text-primary transition-colors text-xl">#{i+1}</td>
                                <td className="py-6">
                                   <div className="flex items-center gap-4">
                                      <img src={obra.imagenUrl} className="size-12 rounded-xl object-cover shadow-lg" alt="o" />
                                      <div>
                                        <p className="font-bold text-sm text-white">{obra.titulo}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">{obra.autor}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="py-6 text-right font-medium text-slate-300">€{(obra.valoracion).toLocaleString()}</td>
                                <td className="py-6 text-right">
                                   <span className={`px-4 py-1.5 rounded-full text-xs font-black ${parseFloat(getRendimiento(obra)) > 0.8 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary/10 text-primary'} border border-current/20`}>
                                      {getRendimiento(obra)}
                                   </span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default DirectorDashboard;
