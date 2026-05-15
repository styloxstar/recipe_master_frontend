import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { Save, X, Plus, Trash2, Layout, List, Heart, Info, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AddEditRecipe() {
  const { id } = useParams();
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    type: 'recipe',
    category: '',
    isVeg: true,
    ingredients: '',
    method: '',
    benefits: '',
    timing: '',
    bestTime: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const recipe = recipes.find(r => r._id === id);
      if (recipe) {
        setFormData({
          ...recipe,
          ingredients: recipe.ingredients.join(', '),
          benefits: recipe.benefits?.join(', ') || '',
        });
      }
    }
  }, [id, recipes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const processedData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      benefits: formData.benefits ? formData.benefits.split(',').map(b => b.trim()) : [],
    };

    const res = isEdit 
      ? await updateRecipe(id, processedData)
      : await addRecipe(processedData);

    if (res.success) {
      navigate('/');
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you absolutely sure you want to delete this item?')) {
      const res = await deleteRecipe(id, formData.type);
      if (res.success) navigate('/');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 20px' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h5 style={{ color: 'var(--neon-cyan)', letterSpacing: '4px', fontSize: '12px', fontWeight: '900' }}>CONTENT MANAGEMENT</h5>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginTop: '10px' }}>{isEdit ? 'Update' : 'Initialize'} <span className="text-gradient">Protocol</span></h1>
        </div>
        <button onClick={() => navigate(-1)} className="btn-icon-round glass"><X size={20} /></button>
      </header>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '50px', borderRadius: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
          <div className="form-group">
            <label><Layout size={14} /> ITEM NAME</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Neon Detox Juice" />
          </div>
          <div className="form-group">
            <label><Plus size={14} /> TYPE</label>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="recipe">RECIPE</option>
              <option value="juice">JUICE</option>
              <option value="remedy">REMEDY</option>
              <option value="seed">SEED</option>
              <option value="detox">DETOX</option>
              <option value="vitamin">VITAMIN</option>
              <option value="mineral">MINERAL</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div className="form-group">
            <label><Info size={14} /> CATEGORY</label>
            <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Soya, Paneer, Morning" />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '15px', height: '100%', paddingTop: '30px' }}>
            <label style={{ margin: 0 }}>VEGETARIAN?</label>
            <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} style={{ width: '24px', height: '24px', accentColor: 'var(--neon-cyan)' }} />
          </div>
        </div>

        <div className="form-group">
          <label><List size={14} /> INGREDIENTS (COMMA SEPARATED)</label>
          <textarea value={formData.ingredients} onChange={e => setFormData({...formData, ingredients: e.target.value})} placeholder="Item 1, Item 2, Item 3..." style={{ height: '100px' }} />
        </div>

        <div className="form-group">
          <label><List size={14} /> PREPARATION METHOD</label>
          <textarea value={formData.method} onChange={e => setFormData({...formData, method: e.target.value})} placeholder="Describe the steps..." style={{ height: '200px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div className="form-group">
            <label><Heart size={14} /> BENEFITS</label>
            <input type="text" value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} placeholder="Benefit 1, Benefit 2..." />
          </div>
          <div className="form-group">
            <label><Info size={14} /> DURATION / TIMING</label>
            <input type="text" value={formData.timing} onChange={e => setFormData({...formData, timing: e.target.value})} placeholder="e.g. 20 mins" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" style={{ flex: 1, height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {loading ? 'PROCESSING...' : (isEdit ? 'SYNC CHANGES' : 'INITIALIZE ITEM')}
            {!loading && <Check size={20} />}
          </button>
          {isEdit && (
            <button type="button" onClick={handleDelete} className="glass" style={{ width: '60px', color: '#ff4444', borderRadius: '15px' }}>
              <Trash2 size={24} />
            </button>
          )}
        </div>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        .form-group { display: flex; flexDirection: column; gap: 10px; }
        .form-group label { font-size: 10px; font-weight: 900; color: var(--neon-blue); letter-spacing: 1px; display: flex; align-items: center; gap: 6px; }
        .form-group input, .form-group select, .form-group textarea {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; color: #fff; font-size: 14px; outline: none; transition: all 0.3s ease;
        }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--neon-cyan); box-shadow: var(--glow-cyan); }
        .form-group select { appearance: none; cursor: pointer; }
        .btn-icon-round { width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; color: #fff; border: 1px solid rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
}
