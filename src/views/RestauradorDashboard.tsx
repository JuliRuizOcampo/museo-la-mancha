
import React from 'react';
import { User, Obra } from '../types';
import { MOCK_OBRAS } from '../constants';

interface Props {
  user: User;
  onLogout: () => void;
}

const RestauradorDashboard: React.FC<Props> = ({ user, onLogout }) => {
  // Lógica: Comparar 'fecha de última restauración' con fecha actual. Si >= 5 años, alerta roja.
  const needsMaintenance = (fechaRestauracion: string) => {
    const lastDate = new Date(fechaRestauracion);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return diffYears >= 5;
  };

  const obrasAlertadas = MOCK_OBRAS.filter(o => needsMaintenance(o.ultimaRestauracion));

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark">
      <aside className="w-72 bg-surface-dark border-r border-white/5 p-8 flex flex-col justify-between">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary rounded-xl text-background-dark shadow-lg shadow-primary/10">
              <span className="material-symbols-outlined font-black">architecture</span>
            </div>
            <h1 className="text-sm font-black uppercase tracking-tight text-white">Museo de<br/>La Mancha</h1>
          </div>
          
          <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-4 mb-3">
              <img src={user.avatar} className="size-10 rounded-full border-2 border-primary/20" alt="rest" />
              <div>
                <p className="text-xs font-bold leading-none">{user.name}</p>
                <p className="text-[9px] text-primary uppercase font-black tracking-widest mt-1">Sénior Conservador</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-primary w-2/3"></div>
            </div>
            <p className="text-[8px] text-slate-500 uppercase font-bold mt-2 text-right">Turno: Mañana</p>
          </div>

          <nav className="space-y-1">
            <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-primary/10 text-primary font-bold border-l-4 border-primary">
              <span className="material-symbols-outlined">analytics</span> Estado Patrimonial
            </div>
            <div className="flex items-center gap-3 px-4 py-4 rounded-xl text-slate-500 hover:bg-white/5 transition-all cursor-pointer">
              <span className="material-symbols-outlined">inventory</span> Taller de Restauración
            </div>
            <div className="flex items-center gap-3 px-4 py-4 rounded-xl text-slate-500 hover:bg-white/5 transition-all cursor-pointer">
              <span className="material-symbols-outlined">biotech</span> Análisis Químico
            </div>
          </nav>
        </div>

        <button onClick={onLogout} className="flex items-center justify-center gap-2 py-4 text-rose-500 font-black text-xs hover:bg-rose-500/10 rounded-xl border border-rose-500/10 transition-all uppercase tracking-widest">
          <span className="material-symbols-outlined text-lg">logout</span> Finalizar Jornada
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black">Monitor de Conservación</h2>
            <p className="text-slate-500 mt-1">Seguimiento preventivo y correctivo de la colección.</p>
          </div>
          <div className="flex items-center gap-3 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sistemas Óptimos</span>
          </div>
        </header>

        {/* Notificaciones Críticas */}
        {obrasAlertadas.length > 0 && (
          <section className="bg-rose-500/10 border border-rose-500/30 rounded-[32px] p-8 mb-12 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
              <span className="material-symbols-outlined text-[160px] text-rose-500">warning</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-rose-500 rounded-2xl text-white shadow-xl shadow-rose-500/20 animate-bounce">
                  <span className="material-symbols-outlined font-black">priority_high</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-rose-500">Mantenimiento Requerido</h3>
                  <p className="text-sm text-slate-400 font-medium italic">Se han detectado activos que exceden el ciclo de 5 años de restauración.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {obrasAlertadas.map(obra => (
                  <div key={obra.id} className="flex items-center gap-5 bg-background-dark/50 backdrop-blur-md p-5 rounded-2xl border border-rose-500/20 group hover:border-rose-500 transition-all cursor-pointer">
                    <div className="size-16 rounded-xl overflow-hidden shadow-xl shrink-0">
                      <img src={obra.imagenUrl} className="w-full h-full object-cover" alt="obra" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-black text-white truncate">{obra.titulo}</p>
                      <p className="text-[10px] text-rose-400 font-black uppercase mt-1">Ciclo Excedido: +5 Años</p>
                      <p className="text-[9px] text-slate-500 font-bold mt-1">Ref: {obra.id}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-rose-500">arrow_forward</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Inventario Técnico */}
        <section className="bg-surface-dark border border-white/5 rounded-[40px] p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">history_edu</span> Registro de Intervenciones
            </h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Buscar por ID..." className="bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:border-primary outline-none w-64" />
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black tracking-widest text-slate-500 border-b border-white/5">
                  <th className="pb-6 px-4">Obra / Sala</th>
                  <th className="pb-6 px-4">Tipo Activo</th>
                  <th className="pb-6 px-4">Última Revisión</th>
                  <th className="pb-6 px-4 text-center">Estado Téc.</th>
                  <th className="pb-6 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_OBRAS.map(obra => {
                  const alert = needsMaintenance(obra.ultimaRestauracion);
                  return (
                    <tr key={obra.id} className={`group hover:bg-white/[0.01] transition-all ${alert ? 'bg-rose-500/[0.02]' : ''}`}>
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-4">
                          <img src={obra.imagenUrl} className="size-12 rounded-xl object-cover" alt="o" />
                          <div>
                            <p className="text-sm font-black text-white">{obra.titulo}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{obra.sala}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4">
                         <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">{obra.tipo}</span>
                      </td>
                      <td className="py-6 px-4">
                        <p className={`text-sm font-bold ${alert ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>
                          {new Date(obra.ultimaRestauracion).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex justify-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${alert ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                            {alert ? 'Crítico' : 'Certificado'}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-right">
                        <button className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-background-dark transition-all">
                          <span className="material-symbols-outlined text-xl">history</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RestauradorDashboard;
