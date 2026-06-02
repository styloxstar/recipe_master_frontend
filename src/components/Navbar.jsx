import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, LogOut, User, LayoutDashboard, Search, Utensils, Zap, Droplets, Heart, Sprout, Calendar, Activity, Wind, Plus } from 'lucide-react';

export default function Navbar() {
  const { user, theme, toggleTheme, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Recipes', path: '/', icon: <Utensils size={14} />, color: '#fbbf24' },
    { name: 'Nutrition', path: '/nutrition', icon: <Zap size={14} />, color: '#38bdf8' },
    { name: 'Juices', path: '/juices', icon: <Droplets size={14} />, color: '#4ade80' },
    { name: 'Remedies', path: '/remedies', icon: <Heart size={14} />, color: '#f87171' },
    { name: 'Seeds', path: '/seeds', icon: <Sprout size={14} />, color: '#a78bfa' },
    { name: 'Daily Schedule', path: '/schedule', icon: <Calendar size={14} />, color: '#fb923c' },
    { name: 'Vitals Guide', path: '/vitals', icon: <Activity size={14} />, color: '#ec4899' },
    { name: 'Detox Drinks', path: '/detox', icon: <Wind size={14} />, color: '#2dd4bf' },
  ];

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="nav-container" style={{ padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            display: 'flex', 
            background: 'rgba(255,255,255,0.03)', 
            padding: '6px', 
            borderRadius: '16px',
            gap: '8px',
            overflowX: 'auto',
            maxWidth: '900px'
          }} className="hide-scrollbar">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`nav-pill ${location.pathname === item.path ? 'active' : ''}`}
                style={{ '--accent-color': item.color }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={toggleTheme} className="icon-btn">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => navigate('/add')} className="icon-btn" title="Create New Recipe">
                <Plus size={18} color="var(--neon-cyan)" />
              </button>
              {user.isAdmin && (
                <button onClick={() => navigate('/admin')} className="icon-btn">
                  <LayoutDashboard size={18} color="var(--neon-purple)" />
                </button>
              )}
              <div className="user-profile-small" title={user.name}>
                <User size={16} />
              </div>
              <button onClick={logout} className="icon-btn">
                <LogOut size={18} color="#ff4444" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary-small">LOGIN</Link>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
          white-space: nowrap;
        }
        .nav-pill:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--accent-color);
        }
        .nav-pill.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.1);
          color: var(--accent-color);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.05); }
        .user-profile-small {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .btn-primary-small {
          background: var(--neon-cyan);
          color: var(--text-on-accent, #000);
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 800;
          text-decoration: none;
        }
        @media (max-width: 868px) {
          .nav-container {
            flex-direction: column;
            height: auto !important;
            padding: 15px 20px !important;
            gap: 15px;
          }
          .nav-pill {
            padding: 6px 12px !important;
            font-size: 10px !important;
          }
        }
      `}} />
    </nav>
  );
}
