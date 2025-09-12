import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Liste des hôtels', href: '/hotels' },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon"></div>
            RED PRODUCT
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <p style={{ color: '#a0aec0', fontSize: '12px', fontWeight: '600', marginBottom: '15px', textTransform: 'uppercase' }}>
              Principal
            </p>
            {navigation.map((item) => (
              <div
                key={item.name}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => navigate(item.href)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <h1>
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/hotels' && 'Liste des hôtels'}
            </h1>
            <p>
              {location.pathname === '/dashboard' && 'Bienvenue sur RED Product'}
              {location.pathname === '/hotels' && 'Hôtels 8'}
            </p>
          </div>
          
          <div className="header-right">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Recherche" 
                className="form-input"
              />
              <MagnifyingGlassIcon className="search-icon w-4 h-4" />
            </div>
            
            <div className="notification">
              <BellIcon className="w-6 h-6 text-gray-400" />
              <span className="notification-badge">3</span>
            </div>
            
            <div className="user-profile">
              <div className="user-avatar">
                <span>U</span>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
