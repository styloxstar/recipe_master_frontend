import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Edit3, Share2, Clock, Calendar, CheckCircle, Leaf, Zap, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecipeImage } from '../utils/recipeImages';
import paneerFallback from '../assets/paneer_dish.png';
import chickenFallback from '../assets/chicken_dish.png';

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes } = useRecipes();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const recipe = recipes.find(r => r._id === id);
  const imageUrl = recipe ? getRecipeImage(recipe) : '';
  const [activeImgUrl, setActiveImgUrl] = useState(imageUrl);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setActiveImgUrl(imageUrl);
      img.onerror = () => {
        setActiveImgUrl(recipe?.isVeg ? paneerFallback : chickenFallback);
      };
    }
  }, [imageUrl, recipe]);

  if (!recipe) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Item not found</h2>
        <button onClick={() => navigate('/')} className="btn-outline" style={{ marginTop: '20px' }}>BACK TO HUB</button>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.name,
          text: `Check out this ${recipe.type}: ${recipe.name}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div className="hero-banner" style={{ 
        height: '40vh', 
        background: `linear-gradient(to bottom, rgba(10, 12, 16, 0.4), var(--bg-dark)), url(${activeImgUrl}) center/cover`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 0 50px 0'
      }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
          <button onClick={() => navigate(-1)} className="glass btn-back" style={{ marginBottom: '30px' }}>
            <ChevronLeft size={20} />
          </button>
          
          <div className="recipe-header-flex">
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <span className="badge" style={{ background: 'rgba(0, 255, 242, 0.1)', color: 'var(--neon-cyan)' }}>{recipe.type?.toUpperCase()}</span>
                <span className="badge" style={{ background: 'rgba(188, 19, 254, 0.1)', color: 'var(--neon-purple)' }}>{recipe.category}</span>
              </div>
              <h1 className="recipe-title">{recipe.name}</h1>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={handleShare} className="glass btn-icon-round"><Share2 size={20} /></button>
              {(user?.isAdmin || (recipe.author && user?.id === recipe.author)) && (
                <button onClick={() => navigate(`/edit/${recipe._id}`)} className="glass btn-icon-round" style={{ borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}>
                  <Edit3 size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ 
              position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
              background: 'var(--neon-cyan)', color: '#000', padding: '12px 24px',
              borderRadius: '12px', fontWeight: '900', fontSize: '13px', zIndex: 2000,
              boxShadow: '0 10px 30px rgba(0, 255, 242, 0.3)'
            }}
          >
            LINK COPIED TO CLIPBOARD
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container detail-grid-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px' }}>
        <main>
          <section style={{ marginBottom: '50px' }}>
            <h3 className="section-title">INGREDIENTS</h3>
            <div className="ingredients-grid">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="glass" style={{ padding: '15px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={16} color="var(--neon-cyan)" />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{ing}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="section-title">METHOD / PROCESS</h3>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {recipe.method}
            </div>
          </section>
        </main>

        <aside>
          <div className="glass" style={{ padding: '30px', borderRadius: '24px', position: 'sticky', top: '120px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '2px', color: 'var(--neon-blue)', marginBottom: '25px' }}>HEALTH VITALS</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="vital-item">
                <User size={20} color="var(--neon-blue)" />
                <div>
                  <div className="vital-label">CREATOR</div>
                  <div className="vital-value">{recipe.authorName || 'System'}</div>
                </div>
              </div>

              <div className="vital-item">
                <Leaf size={20} color={recipe.isVeg ? 'var(--neon-cyan)' : '#ff4444'} />
                <div>
                  <div className="vital-label">DIETARY</div>
                  <div className="vital-value">{recipe.isVeg ? '100% VEGETARIAN' : 'NON-VEGETARIAN'}</div>
                </div>
              </div>

              <div className="vital-item">
                <Clock size={20} color="var(--neon-purple)" />
                <div>
                  <div className="vital-label">DURATION</div>
                  <div className="vital-value">{recipe.timing || '15-20 MINS'}</div>
                </div>
              </div>

              <div className="vital-item">
                <Calendar size={20} color="var(--neon-blue)" />
                <div>
                  <div className="vital-label">BEST TIME</div>
                  <div className="vital-value">{recipe.bestTime || 'MORNING / EMPTY STOMACH'}</div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '30px 0' }} />
            
            <h4 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '2px', color: 'var(--neon-pink)', marginBottom: '20px' }}>BENEFITS</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {recipe.benefits?.map((b, i) => (
                <div key={i} className="benefit-tag">{b}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .btn-back {
          width: 50px; height: 50px; border-radius: 12px; display: flex; justify-content: center; align-items: center; cursor: pointer; color: #fff;
        }
        .btn-icon-round {
          width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; color: #fff;
        }
        .badge {
          padding: 6px 14px; border-radius: 8px; font-size: 10px; font-weight: 900; letter-spacing: 1px;
        }
        .section-title {
          font-size: 14px; font-weight: 900; letter-spacing: 2px; color: var(--text-primary); margin-bottom: 25px;
        }
        .vital-item {
          display: flex; gap: 15px; align-items: center;
        }
        .vital-label {
          font-size: 10px; font-weight: 800; color: var(--text-muted); letter-spacing: 1px;
        }
        .vital-value {
          font-size: 13px; font-weight: 700; color: var(--text-primary); margin-top: 2px;
        }
        .benefit-tag {
          background: rgba(255, 0, 255, 0.05); color: var(--neon-pink); padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; border: 1px solid rgba(255, 0, 255, 0.1);
        }
        .recipe-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          width: 100%;
        }
        .recipe-title {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.1;
        }
        .detail-grid-container {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 50px;
        }
        .ingredients-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        @media (max-width: 868px) {
          .detail-grid-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
        @media (max-width: 768px) {
          .recipe-header-flex {
            flex-direction: column;
            align-items: flex-start;
          }
          .recipe-title {
            font-size: 32px;
          }
        }
        @media (max-width: 580px) {
          .ingredients-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
}
