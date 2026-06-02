import React, { useEffect, useState, useRef } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, FileText, Grid, Plus, ChevronLeft, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecipeImage } from '../utils/recipeImages';
import paneerFallback from '../assets/paneer_dish.png';
import chickenFallback from '../assets/chicken_dish.png';

export default function Home({ type = 'recipe' }) {
  const { recipes, loading, pagination, fetchRecipes } = useRecipes();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isVegFilter, setIsVegFilter] = useState('all'); // 'all', 'true', 'false'
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);

  const categoriesMap = {
    'recipe': ['All', 'Soya', 'Paneer', 'Chicken', 'Egg', 'Pizza & Other', 'Fish & Seafood', 'Sprouts & Legumes', 'Millets & Grains', 'Fusion Airfry'],
    'nutrition': ['All', 'Macro', 'Micro', 'Essential'],
    'juice': ['All', 'Immunity', 'Blood', 'Skin', 'Digestion', 'Cooling', 'Herbal'],
    'remedy': ['All', 'Fitness', 'Digestion', 'Cold & Flu', 'Skin', 'Hair', 'Weight Loss'],
    'seed': ['All', 'Seeds', 'Superfoods', 'Herbal Spices'],
    'schedule': ['All', 'Morning', 'Meals', 'Snacks', 'Fitness', 'Drinks', 'Night'],
    'vitals': ['All', 'Vitamin', 'Mineral', 'Essential Fat'],
    'detox': ['All', 'Morning Detox', 'Immunity Detox', 'Liver Detox', 'Gut Detox', 'Summer Detox', 'Blood Detox']
  };

  const categories = categoriesMap[type] || ['All'];

  useEffect(() => {
    setPage(1);
    fetchRecipes({ type, category: 'All', search: '', page: 1, limit: 12 });
  }, [type]);

  useEffect(() => {
    fetchRecipes({ 
      type, 
      category, 
      search, 
      page, 
      limit: 12,
      isVeg: isVegFilter === 'all' ? undefined : isVegFilter 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, search, page, isVegFilter]);

  const handleExport = (format) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const query = new URLSearchParams({
      type,
      category: category === 'All' ? '' : category,
      search,
      isVeg: isVegFilter === 'all' ? '' : isVegFilter
    }).toString();
    
    window.open(`${API_URL}/recipes/export/${format}?${query}`, '_blank');
  };

  return (
    <div className="home-root" ref={scrollRef}>
      <div className="content-container">
        <header className="home-header">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="brand-section">
            <h1 className="main-title">Gym Recipe Book</h1>
            <p className="subtitle">HIGH PROTEIN • MEAL PREP • HEALTHY LIVING</p>
          </motion.div>

          <div className="search-bar-container glass">
            <Search size={18} color="var(--neon-cyan)" />
            <input 
              type="text" 
              placeholder="Search recipes, ingredients..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            <div className="items-count">
              {pagination.totalItems || 0} items
            </div>
          </div>

          <div className="filters-section">
            <div className="category-pills hide-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`pill ${category === cat ? 'active' : ''}`}
                >
                  {cat} {category === cat && pagination.totalItems && <span className="pill-count">{pagination.totalItems}</span>}
                </button>
              ))}
            </div>

            <div className="type-filters">
              <span className="filter-label">TYPE</span>
              <button onClick={() => setIsVegFilter('all')} className={`filter-btn ${isVegFilter === 'all' ? 'active' : ''}`}>All</button>
              <button onClick={() => setIsVegFilter('true')} className={`filter-btn veg ${isVegFilter === 'true' ? 'active' : ''}`}>
                <div className="dot" /> Veg
              </button>
              <button onClick={() => setIsVegFilter('false')} className={`filter-btn non-veg ${isVegFilter === 'false' ? 'active' : ''}`}>
                <div className="dot" /> Non-Veg
              </button>
            </div>

            <div className="export-actions">
              {user && (
                <button onClick={() => navigate('/add')} className="export-btn add" style={{ color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)' }} title="Add New Item">
                  <Plus size={16} /> ADD NEW
                </button>
              )}
              <button onClick={() => handleExport('pdf')} className="export-btn pdf" title="Export PDF">
                <FileText size={16} /> PDF
              </button>
              <button onClick={() => handleExport('excel')} className="export-btn excel" title="Export Excel">
                <Grid size={16} /> EXCEL
              </button>
            </div>
          </div>
        </header>

        <main className="items-grid-container">
          <AnimatePresence mode='wait'>
            {loading ? (
              <div className="loader-container">
                <div className="loader-glow" />
              </div>
            ) : recipes.length > 0 ? (
              <div className="recipe-grid">
                {recipes.map((recipe, idx) => (
                  <motion.div 
                    key={recipe._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">!</div>
                <h3>No entries found in this sector</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </AnimatePresence>
        </main>

        {pagination.totalPages > 1 && (
          <div className="pagination-container">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="pag-btn"
            >
              <ChevronLeft size={20} /> PREV
            </button>
            
            <div className="page-numbers">
              {[...Array(pagination.totalPages)].map((_, i) => {
                const p = i + 1;
                // Only show 5 pages around current
                if (p === 1 || p === pagination.totalPages || (p >= page - 2 && p <= page + 2)) {
                  return (
                    <button 
                      key={p}
                      onClick={() => setPage(p)}
                      className={`page-num ${page === p ? 'active' : ''}`}
                    >
                      {p}
                    </button>
                  );
                }
                if (p === 2 || p === pagination.totalPages - 1) return <span key={p}>...</span>;
                return null;
              })}
            </div>

            <button 
              disabled={page === pagination.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="pag-btn"
            >
              NEXT <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-root {
          min-height: calc(100vh - 60px);
          background: transparent;
          color: var(--text-primary);
        }
        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px 100px;
        }
        .home-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .main-title {
          font-size: 64px;
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          margin-bottom: 5px;
          letter-spacing: -1px;
        }
        .subtitle {
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--text-secondary);
          font-weight: 800;
        }
        .search-bar-container {
          max-width: 800px;
          margin: 40px auto;
          display: flex;
          align-items: center;
          padding: 8px 24px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
        }
        .search-bar-container input {
          background: transparent;
          border: none;
          color: #fff;
          padding: 12px;
          flex: 1;
          font-size: 15px;
          outline: none;
        }
        .items-count {
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255,255,255,0.05);
          padding: 4px 12px;
          border-radius: 8px;
        }
        .filters-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        .category-pills {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 5px;
          max-width: 100%;
        }
        .pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-secondary);
          padding: 10px 24px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pill:hover { background: rgba(255,255,255,0.06); }
        .pill.active {
          background: var(--neon-cyan);
          color: var(--text-on-accent, #000);
          border-color: var(--neon-cyan);
        }
        .pill-count {
          background: rgba(0,0,0,0.2);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
        }
        .type-filters {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255,255,255,0.02);
          padding: 6px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .filter-label { font-size: 10px; font-weight: 800; color: var(--text-muted); margin-right: 10px; }
        .filter-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 15px;
          transition: all 0.3s ease;
        }
        .filter-btn .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
        .filter-btn.active { background: rgba(255,255,255,0.05); color: #fff; }
        .filter-btn.veg { color: #4ade80; }
        .filter-btn.non-veg { color: #f87171; }
        
        .export-actions {
          display: flex;
          gap: 10px;
          margin-left: 20px;
          padding-left: 20px;
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .export-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        .export-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: var(--neon-cyan);
          color: #fff;
          transform: translateY(-2px);
        }
        .export-btn.pdf:hover { color: #f87171; }
        .export-btn.excel:hover { color: #4ade80; }
        
        @media (max-width: 768px) {
          .filters-section {
            width: 100%;
          }
          .type-filters {
            flex-wrap: wrap;
            justify-content: center;
          }
          .export-actions {
            margin-left: 0 !important;
            padding-left: 0 !important;
            border-left: none !important;
            justify-content: center;
            width: 100%;
          }
        }
        
        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 40px;
          margin-bottom: 60px;
        }
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
          padding: 40px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .page-numbers {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .page-num {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .page-num:hover {
          background: rgba(255,255,255,0.05);
          border-color: var(--neon-cyan);
        }
        .page-num.active {
          background: var(--neon-cyan);
          color: #000;
          border-color: var(--neon-cyan);
        }
        .pag-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }
        .pag-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.05);
          border-color: var(--neon-cyan);
          color: var(--neon-cyan);
        }
        .pag-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }
        
        .loader-container { grid-column: 1/-1; height: 400px; display: flex; justify-content: center; alignItems: center; }
        .loader-glow { width: 60px; height: 60px; border: 2px solid var(--neon-cyan); border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}

function RecipeCard({ recipe }) {
  const imageUrl = getRecipeImage(recipe);

  return (
    <Link to={`/recipe/${recipe._id}`} className="exact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card-inner glass">
        <div className="card-image-wrapper">
          <img 
            src={imageUrl} 
            alt={recipe.name} 
            className="card-food-img" 
            loading="lazy" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = recipe.isVeg ? paneerFallback : chickenFallback;
            }}
          />
          <div className={`diet-indicator ${recipe.isVeg ? 'veg' : 'non-veg'}`}>
             <div className="dot" /> {recipe.isVeg ? 'Veg' : 'Non-Veg'}
          </div>
        </div>

        <div className="card-content">
          <div className="card-header">
            <h4 className="recipe-name">{recipe.name}</h4>
          </div>
          
          <div className="card-tags">
            <span className="tag type-tag">{recipe.type}</span>
            {recipe.category && <span className="tag cat-tag">{recipe.category}</span>}
          </div>

          <div className="ingredients-preview">
            <div className="ing-label">INGREDIENTS ({recipe.ingredients.length})</div>
            <div className="ing-pills">
              {recipe.ingredients.slice(0, 4).map((ing, i) => (
                <span key={i} className="ing-pill">{ing}</span>
              ))}
              {recipe.ingredients.length > 4 && <span className="ing-pill more">+{recipe.ingredients.length - 4}</span>}
            </div>
          </div>

          <div className="card-footer">
            <span className="timing">cook {recipe.timing || '5 min'}</span>
            <span className="author">
              BY {recipe.authorName || 'System'}
            </span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .exact-card { display: block; height: 100%; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .exact-card:hover { transform: translateY(-6px); }
        .card-inner {
          border-radius: 16px;
          height: 100%;
          border: 1px solid rgba(0, 255, 242, 0.1);
          background: rgba(255, 255, 255, 0.01);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .exact-card:hover .card-inner { border-color: rgba(0, 255, 242, 0.4); box-shadow: 0 10px 30px rgba(0, 255, 242, 0.08); }
        
        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .card-food-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .exact-card:hover .card-food-img {
          transform: scale(1.06);
        }
        
        .card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex: 1;
        }
        
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .recipe-name { font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.4; flex: 1; }
        
        .diet-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 8px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }
        .diet-indicator.veg { color: #4ade80; background: rgba(74, 222, 128, 0.15); border: 1px solid rgba(74, 222, 128, 0.2); }
        .diet-indicator.non-veg { color: #f87171; background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.2); }
        .diet-indicator .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
        
        .card-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag { font-size: 9px; font-weight: 900; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px; text-transform: uppercase; }
        .type-tag { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.1); }
        .cat-tag { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.1); }
        
        .ing-label { font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 1px; }
        .ing-pills { display: flex; gap: 6px; flex-wrap: wrap; }
        .ing-pill { background: rgba(255,255,255,0.05); color: var(--text-secondary); padding: 4px 10px; border-radius: 6px; font-size: 10px; border: 1px solid rgba(255,255,255,0.03); }
        .ing-pill.more { background: rgba(255,255,255,0.1); color: #fff; }
        
        .card-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .timing { font-size: 10px; color: var(--text-muted); font-style: italic; }
        .author { font-size: 10px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; font-weight: 600; }
      `}} />
    </Link>
  );
}
