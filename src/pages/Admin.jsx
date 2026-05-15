import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import { BarChart3, Users, BookOpen, Download, TrendingUp, PieChart, Activity, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Admin() {
  const { token } = useAuth();
  const { recipes } = useRecipes();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API_URL}/recipes/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Stats error:', err);
      }
    };
    fetchStats();
  }, [token]);

  const cards = [
    { title: 'Total Content', value: stats?.totalRecipes || 0, icon: <BookOpen />, color: 'var(--neon-cyan)' },
    { title: 'Active Users', value: '1,284', icon: <Users />, color: 'var(--neon-purple)' },
    { title: 'API Uptime', value: '99.9%', icon: <Activity />, color: 'var(--neon-blue)' },
    { title: 'Daily Growth', value: '+12%', icon: <TrendingUp />, color: 'var(--neon-pink)' },
  ];

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
      <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h5 style={{ color: 'var(--neon-purple)', letterSpacing: '4px', fontSize: '12px', fontWeight: '900' }}>ADMINISTRATIVE COMMAND CENTER</h5>
          <h1 style={{ fontSize: '40px', fontWeight: '900', marginTop: '10px' }}>Global <span className="text-gradient">Analytics</span></h1>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={() => window.open(`${import.meta.env.VITE_API_URL}/recipes/export/pdf`, '_blank')}
            className="btn-outline" 
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Download size={18} /> GENERATE REPORT
          </button>
          <div style={{ background: 'rgba(188, 19, 254, 0.1)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(188, 19, 254, 0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={18} color="var(--neon-purple)" />
            <span style={{ fontSize: '12px', fontWeight: '900', color: 'var(--neon-purple)' }}>SYSTEM SECURE</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        {cards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass"
            style={{ padding: '30px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ color: card.color, marginBottom: '20px' }}>{card.icon}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '1px' }}>{card.title.toUpperCase()}</div>
            <div style={{ fontSize: '32px', fontWeight: '900', marginTop: '5px' }}>{card.value}</div>
            <div style={{ 
              position: 'absolute', bottom: '-20px', right: '-20px', 
              fontSize: '100px', fontWeight: '900', color: card.color, 
              opacity: 0.05, transform: 'rotate(-15deg)' 
            }}>
              {idx + 1}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div className="glass" style={{ padding: '40px', borderRadius: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Content Distribution</h3>
            <BarChart3 size={20} color="var(--text-muted)" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {stats?.typeDistribution?.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', fontWeight: 'bold' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item._id?.toUpperCase()}</span>
                  <span style={{ color: 'var(--neon-cyan)' }}>{item.count} ITEMS</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count / stats.totalRecipes) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    style={{ height: '100%', background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-blue))' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: '40px', borderRadius: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <PieChart size={60} color="var(--neon-purple)" style={{ marginBottom: '20px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>System Health</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The ecosystem is currently operating at optimal efficiency. No anomalies detected in the last 24 cycles.
          </p>
          <div style={{ marginTop: '30px', width: '100%', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '10px', fontWeight: '900', color: 'var(--neon-cyan)', letterSpacing: '2px' }}>LATENCY</div>
            <div style={{ fontSize: '24px', fontWeight: '900', marginTop: '5px' }}>24ms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
