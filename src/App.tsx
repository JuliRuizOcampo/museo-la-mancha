
import React, { useState } from 'react';
import { User, UserRole } from './types.ts';
import Login from './components/Login.tsx';
import CatalogadorDashboard from './views/CatalogadorDashboard.tsx';
import RestauradorDashboard from './views/RestauradorDashboard.tsx';
import DirectorDashboard from './views/DirectorDashboard.tsx';
import PublicMonitor from './views/PublicMonitor.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<UserRole | 'PUBLICO' | 'LOGIN'>('LOGIN');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setView(userData.role);
  };

  const handleLogout = () => {
    setUser(null);
    setView('LOGIN');
  };

  const renderView = () => {
    switch (view) {
      case 'CATALOGADOR':
        return <CatalogadorDashboard user={user!} onLogout={handleLogout} />;
      case 'RESTAURADOR':
        return <RestauradorDashboard user={user!} onLogout={handleLogout} />;
      case 'DIRECTOR':
        return <DirectorDashboard user={user!} onLogout={handleLogout} />;
      case 'PUBLICO':
        return <PublicMonitor onBack={() => setView('LOGIN')} />;
      default:
        return <Login onLogin={handleLogin} onPublic={() => setView('PUBLICO')} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
