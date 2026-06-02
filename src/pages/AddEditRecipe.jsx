import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { Save, X, Plus, Trash2, Layout, List, Heart, Info, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper Categories mapping for existing categories
const categoriesMap = {
  'recipe': ['Soya', 'Paneer', 'Chicken', 'Egg', 'Pizza & Other', 'Fish & Seafood', 'Sprouts & Legumes', 'Millets & Grains', 'Fusion Airfry'],
  'nutrition': ['Macro', 'Micro', 'Essential'],
  'juice': ['Immunity', 'Blood', 'Skin', 'Digestion', 'Cooling', 'Herbal'],
  'remedy': ['Fitness', 'Digestion', 'Cold & Flu', 'Skin', 'Hair', 'Weight Loss'],
  'seed': ['Seeds', 'Superfoods', 'Herbal Spices'],
  'schedule': ['Morning', 'Meals', 'Snacks', 'Fitness', 'Drinks', 'Night'],
  'vitals': ['Vitamin', 'Mineral', 'Essential Fat'],
  'detox': ['Morning Detox', 'Immunity Detox', 'Liver Detox', 'Gut Detox', 'Summer Detox', 'Blood Detox']
};

const getCategoriesForType = (type, recipes = []) => {
  const predefined = categoriesMap[type] || [];
  const fromRecipes = recipes
    .filter(r => r.type === type && r.category)
    .map(r => r.category);
  
  const allUnique = Array.from(new Set([...predefined, ...fromRecipes]))
    .filter(cat => cat !== 'All' && cat.trim() !== '');
  return allUnique;
};

export default function AddEditRecipe() {
  const { id } = useParams();
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const { user } = useAuth();
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
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const typeRef = useRef(null);
  const catRef = useRef(null);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setTypeDropdownOpen(false);
      }
      if (catRef.current && !catRef.current.contains(event.target)) {
        setCatDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isEdit) {
      const recipe = recipes.find(r => r._id === id);
      if (recipe) {
        if (!user.isAdmin && recipe.author && recipe.author !== user.id) {
          navigate('/');
          return;
        }

        setFormData({
          ...recipe,
          ingredients: recipe.ingredients.join(', '),
          benefits: recipe.benefits?.join(', ') || '',
        });

        // Check if category is custom (not in existing categories for this type)
        const existing = getCategoriesForType(recipe.type, recipes);
        if (recipe.category && !existing.includes(recipe.category)) {
          setIsCustomCategory(true);
        }
      }
    }
  }, [id, recipes, user, navigate]);

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
    <div className="container" style={{ maxWidth: '850px', margin: '0 auto', padding: '50px 20px' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h5 style={{ color: 'var(--neon-cyan)', letterSpacing: '4px', fontSize: '11px', fontWeight: '900' }}>CONTENT MANAGEMENT</h5>
          <h1 style={{ fontSize: '36px', fontWeight: '900', marginTop: '8px', letterSpacing: '-0.5px' }}>{isEdit ? 'Update' : 'Initialize'} <span className="text-gradient">Protocol</span></h1>
        </div>
        <button onClick={() => navigate(-1)} className="btn-icon-round glass"><X size={20} /></button>
      </header>

      <form onSubmit={handleSubmit} className="glass content-form-pane" style={{ padding: '50px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
        
        {/* Row 1: Item Name & Type (Custom Dropdown) */}
        <div className="form-row-grid">
          <div className="form-group">
            <label><Layout size={13} color="var(--neon-cyan)" /> ITEM NAME</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Neon Detox Juice" />
          </div>
          
          <div className="form-group dropdown-field" ref={typeRef} style={{ position: 'relative' }}>
            <label><Plus size={13} color="var(--neon-cyan)" /> TYPE</label>
            <div 
              className="dropdown-trigger" 
              onClick={() => {
                setTypeDropdownOpen(!typeDropdownOpen);
                setCatDropdownOpen(false);
              }}
            >
              <span>{formData.type.toUpperCase()}</span>
              <ChevronDown size={15} color="var(--neon-cyan)" />
            </div>

            <AnimatePresence>
              {typeDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="dropdown-options glass"
                >
                  {['recipe', 'juice', 'remedy', 'seed', 'detox', 'vitamin', 'mineral'].map(t => (
                    <div 
                      key={t} 
                      className={`dropdown-opt ${formData.type === t ? 'active' : ''}`}
                      onClick={() => {
                        setFormData({ ...formData, type: t, category: '' });
                        setTypeDropdownOpen(false);
                        setIsCustomCategory(false);
                      }}
                    >
                      {t.toUpperCase()}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 2: Category & Dietary Switch */}
        <div className="form-row-grid">
          
          <div className="form-group dropdown-field" ref={catRef} style={{ position: 'relative' }}>
            <label><Info size={13} color="var(--neon-purple)" /> CATEGORY</label>
            
            {isCustomCategory ? (
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <input 
                  type="text" 
                  required
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})} 
                  placeholder="Enter custom category name..." 
                  style={{ flex: 1 }}
                />
                <button 
                  type="button" 
                  onClick={() => {
                    setIsCustomCategory(false);
                    setFormData({...formData, category: ''});
                  }}
                  className="btn-icon-square glass"
                  title="Choose from existing categories"
                  style={{ width: '56px', height: '56px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--neon-purple)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <>
                <div 
                  className="dropdown-trigger" 
                  onClick={() => {
                    setCatDropdownOpen(!catDropdownOpen);
                    setTypeDropdownOpen(false);
                  }}
                >
                  <span>{formData.category ? formData.category.toUpperCase() : 'SELECT CATEGORY...'}</span>
                  <ChevronDown size={15} color="var(--neon-purple)" />
                </div>

                <AnimatePresence>
                  {catDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="dropdown-options glass"
                    >
                      {getCategoriesForType(formData.type, recipes).map(cat => (
                        <div 
                          key={cat} 
                          className={`dropdown-opt ${formData.category === cat ? 'active' : ''}`}
                          onClick={() => {
                            setFormData({ ...formData, category: cat });
                            setCatDropdownOpen(false);
                          }}
                        >
                          {cat.toUpperCase()}
                        </div>
                      ))}
                      <div 
                        className="dropdown-opt create-custom-opt"
                        onClick={() => {
                          setIsCustomCategory(true);
                          setFormData({ ...formData, category: '' });
                          setCatDropdownOpen(false);
                        }}
                      >
                        ➕ ADD NEW CATEGORY...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          <div className="form-group toggle-wrapper">
            <label style={{ color: 'var(--neon-purple)' }}>DIETARY PREFERENCE</label>
            <div className="toggle-container">
              <label className="switch">
                <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} />
                <span className="slider round"></span>
              </label>
              <span className={`toggle-label ${formData.isVeg ? 'veg' : 'non-veg'}`}>
                {formData.isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
              </span>
            </div>
          </div>
        </div>

        {/* Textarea 1: Ingredients */}
        <div className="form-group">
          <label><List size={13} color="var(--neon-blue)" /> INGREDIENTS (COMMA SEPARATED)</label>
          <textarea value={formData.ingredients} onChange={e => setFormData({...formData, ingredients: e.target.value})} placeholder="Item 1, Item 2, Item 3..." style={{ height: '110px', resize: 'vertical' }} />
        </div>

        {/* Textarea 2: Preparation Method */}
        <div className="form-group">
          <label><List size={13} color="var(--neon-blue)" /> PREPARATION METHOD</label>
          <textarea value={formData.method} onChange={e => setFormData({...formData, method: e.target.value})} placeholder="Describe the step-by-step assembly process..." style={{ height: '180px', resize: 'vertical' }} />
        </div>

        {/* Row 3: Benefits & Duration */}
        <div className="form-row-grid">
          <div className="form-group">
            <label><Heart size={13} color="var(--neon-pink)" /> HEALTH BENEFITS (COMMA SEPARATED)</label>
            <input type="text" value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} placeholder="e.g. Muscle Gain, Liver Detox" />
          </div>
          <div className="form-group">
            <label><Info size={13} color="var(--neon-pink)" /> DURATION / TIMING</label>
            <input type="text" value={formData.timing} onChange={e => setFormData({...formData, timing: e.target.value})} placeholder="e.g. 20 mins" />
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <button type="submit" className="btn-primary" style={{ flex: 1, height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {loading ? 'PROCESSING...' : (isEdit ? 'SYNC CHANGES' : 'INITIALIZE ITEM')}
            {!loading && <Check size={18} />}
          </button>
          {isEdit && (
            <button type="button" onClick={handleDelete} className="glass delete-btn" style={{ width: '56px', height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ff4444', borderRadius: '12px', border: '1px solid rgba(255, 68, 68, 0.2)' }}>
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        .content-form-pane {
          background: rgba(10, 12, 16, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 255, 242, 0.02) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .form-row-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          width: 100%;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .form-group label {
          font-size: 10px;
          font-weight: 800;
          color: var(--neon-blue);
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-transform: uppercase;
        }
        .form-group input, .form-group textarea {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 20px;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 15px rgba(0, 255, 242, 0.15);
          background: rgba(255, 255, 255, 0.04);
        }
        
        /* Custom Dropdown Styles */
        .dropdown-trigger {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 20px;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
        }
        .dropdown-trigger:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
        }
        .dropdown-options {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(13, 17, 23, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 12px;
          z-index: 100;
          max-height: 250px;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 242, 0.02);
          backdrop-filter: blur(20px);
          padding: 6px;
        }
        .dropdown-opt {
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .dropdown-opt:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }
        .dropdown-opt.active {
          background: rgba(0, 255, 242, 0.08);
          color: var(--neon-cyan);
        }
        .create-custom-opt {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--neon-purple);
          margin-top: 4px;
          padding-top: 14px;
        }
        .create-custom-opt:hover {
          color: var(--neon-pink);
          background: rgba(255, 0, 255, 0.05);
        }

        .toggle-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: flex-start;
        }
        .toggle-container {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 11px 0;
        }
        .toggle-label {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }
        .toggle-label.veg {
          color: var(--veg);
          text-shadow: 0 0 8px rgba(74, 222, 128, 0.15);
        }
        .toggle-label.non-veg {
          color: var(--nv);
          text-shadow: 0 0 8px rgba(248, 113, 113, 0.15);
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 28px;
          flex-shrink: 0;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: var(--text-secondary);
          transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: rgba(0, 255, 242, 0.1);
          border-color: var(--neon-cyan);
        }
        input:checked + .slider:before {
          transform: translateX(24px);
          background-color: var(--neon-cyan);
          box-shadow: 0 0 10px var(--neon-cyan);
        }
        .btn-icon-round {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-icon-round:hover {
          border-color: rgba(0, 255, 242, 0.4);
          background: rgba(255, 255, 255, 0.05);
          transform: rotate(90deg);
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue)) !important;
          color: #000 !important;
          font-weight: 800 !important;
          border-radius: 12px !important;
          letter-spacing: 1.5px !important;
          font-size: 13px !important;
          box-shadow: 0 0 20px rgba(0, 255, 242, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .btn-primary:hover {
          box-shadow: 0 0 30px rgba(0, 255, 242, 0.45);
          transform: translateY(-2px);
        }
        .delete-btn {
          background: rgba(255, 68, 68, 0.05) !important;
          transition: all 0.3s ease !important;
        }
        .delete-btn:hover {
          background: rgba(255, 68, 68, 0.15) !important;
          border-color: #ff4444 !important;
          box-shadow: 0 0 15px rgba(255, 68, 68, 0.25) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .content-form-pane {
            padding: 24px !important;
          }
        }
      `}} />
    </div>
  );
}
