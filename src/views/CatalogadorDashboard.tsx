
import React, { useState } from 'react';
import { User, TipoObra } from '../types';
import { MOCK_OBRAS } from '../constants';

interface Props {
  user: User;
  onLogout: () => void;
}

const CatalogadorDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoObra>('CUADRO');

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-dark border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-primary rounded-lg text-background-dark">
              <span className="material-symbols-outlined font-bold">museum</span>
            </div>
            <h1 className="text-xs font-black uppercase tracking-widest text-primary leading-tight">Museo de La Mancha<br/><span className="text-slate-500">Gestión</span></h1>
          </div>
          
          <nav className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold">
              <span className="material-symbols-outlined">grid_view</span>
              Dashboard
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined">inventory_2</span>
              Inventario
            </div>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
             <img src={user.avatar} className="size-8 rounded-full" alt="avatar" />
             <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-primary uppercase font-bold tracking-tighter">Catalogador</p>
             </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-2 text-rose-400 text-xs font-bold hover:bg-rose-500/10 rounded-lg transition-all">
            <span className="material-symbols-outlined text-sm">logout</span> CERRAR SESIÓN
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <section className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black">Catálogo de Obras</h2>
              <p className="text-slate-400">Gestión y visualización de la colección permanente.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-surface-dark border border-white/10 rounded-lg text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span> Filtros
              </button>
              <button className="px-4 py-2 bg-primary text-background-dark rounded-lg text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span> Exportar
              </button>
            </div>
          </div>

          <div className="bg-surface-dark border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-slate-500">
                  <th className="p-4">ID</th>
                  <th className="p-4">Obra</th>
                  <th className="p-4">Autor</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Periodo</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_OBRAS.map(obra => (
                  <tr key={obra.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 text-primary font-bold text-sm">{obra.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={obra.imagenUrl} className="size-10 rounded object-cover" alt={obra.titulo} />
                        <span className="font-bold text-sm">{obra.titulo}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">{obra.autor}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase">{obra.tipo}</span>
                    </td>
                    <td className="p-4 text-sm text-slate-400">{obra.periodo}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-slate-500 hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Alta Side Form */}
        <aside className="w-[400px] bg-surface-dark border-l border-white/10 p-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary font-bold">add_circle</span>
            <h3 className="text-xl font-black">Alta de Obra</h3>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">ID Inventario</label>
              <input type="text" readOnly value="#AUTOGEN-000" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-slate-500 text-sm outline-none" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Título de la Obra</label>
              <input type="text" placeholder="Ej: Paisaje de La Mancha" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary outline-none" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Tipo de Obra</label>
              <select 
                value={tipoSeleccionado}
                onChange={(e) => setTipoSeleccionado(e.target.value as TipoObra)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary outline-none"
              >
                <option value="CUADRO">Cuadro (Pintura)</option>
                <option value="ESCULTURA">Escultura</option>
                <option value="FOTOGRAFIA">Fotografía</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>

            {/* Campos Condicionales */}
            {tipoSeleccionado === 'CUADRO' && (
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 animate-in fade-in slide-in-from-top-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Técnica</label>
                <input type="text" placeholder="Ej: Óleo sobre lienzo" className="w-full bg-black/20 border border-primary/20 rounded-lg p-3 text-white text-sm focus:border-primary outline-none" />
              </div>
            )}

            {tipoSeleccionado === 'ESCULTURA' && (
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 animate-in fade-in slide-in-from-top-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Material</label>
                <input type="text" placeholder="Ej: Mármol de Carrara" className="w-full bg-black/20 border border-primary/20 rounded-lg p-3 text-white text-sm focus:border-primary outline-none" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Autor</label>
                <input type="text" placeholder="Autor" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Periodo</label>
                <input type="text" placeholder="Ej: S. XVIII" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-yellow-500 text-background-dark font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">save</span> REGISTRAR OBRA
            </button>
            <p className="text-center text-[9px] text-slate-500 uppercase font-bold">Los cambios requieren validación del conservador jefe</p>
          </form>
        </aside>
      </main>
    </div>
  );
};

export default CatalogadorDashboard;
