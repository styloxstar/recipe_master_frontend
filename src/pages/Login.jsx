import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = isLogin 
      ? await login(formData.email, formData.password)
      : await register(formData.name, formData.email, formData.password);
    
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass" 
        style={{ width: '100%', maxWidth: '450px', padding: '50px', borderRadius: '30px', textAlign: 'center' }}
      >
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '20px', 
          background: 'rgba(0, 255, 242, 0.1)', margin: '0 auto 20px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: 'var(--neon-cyan)', border: '1px solid rgba(0, 255, 242, 0.2)'
        }}>
          <ShieldCheck size={32} />
        </div>

        <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '10px' }}>
          {isLogin ? 'Welcome ' : 'Join the '} <span className="text-gradient">Ecosystem</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '40px' }}>
          {isLogin ? 'Access your wellness dashboard' : 'Start your journey with us today'}
        </p>

        {error && (
          <div style={{ background: 'rgba(255, 0, 0, 0.1)', color: '#ff4444', padding: '12px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px', border: '1px solid rgba(255, 0, 0, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input 
                type="text" placeholder="Full Name" required 
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input 
              type="email" placeholder="Email Address" required 
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type="password" placeholder="Password" required 
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px', height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {loading ? 'SYNCHRONIZING...' : (isLogin ? 'ACCESS DASHBOARD' : 'CREATE ACCOUNT')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ marginTop: '30px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          {isLogin ? "Don't have an account? " : "Already part of the system? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isLogin ? 'Register Now' : 'Login Here'}
          </button>
        </p>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 18px;
          color: var(--text-muted);
        }
        .input-group input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px 16px 16px 50px;
          border-radius: 15px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }
        .input-group input:focus {
          border-color: var(--neon-cyan);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 15px rgba(0, 255, 242, 0.1);
        }
      `}} />
    </div>
  );
}
