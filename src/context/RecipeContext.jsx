import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const RecipeContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const { token } = useAuth();

  const fetchRecipes = async (params = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        type: params.type || 'recipe',
        category: params.category || 'All',
        search: params.search || '',
        page: params.page || 1,
        limit: params.limit || 12,
        isVeg: params.isVeg !== undefined ? params.isVeg : ''
      }).toString();

      const res = await axios.get(`${API_URL}/recipes?${query}`);
      
      if (res.data.recipes) {
        setRecipes(res.data.recipes);
        setPagination({
          currentPage: res.data.currentPage,
          totalPages: res.data.pages, // Backend returns 'pages'
          totalItems: res.data.total
        });
      } else {
        setRecipes(res.data);
        setPagination({});
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (data) => {
    try {
      await axios.post(`${API_URL}/recipes`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRecipes({ type: data.type });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to add item' };
    }
  };

  const updateRecipe = async (id, data) => {
    try {
      await axios.put(`${API_URL}/recipes/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRecipes({ type: data.type });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Update failed' };
    }
  };

  const deleteRecipe = async (id, type) => {
    try {
      await axios.delete(`${API_URL}/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRecipes({ type });
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Delete failed' };
    }
  };

  const value = {
    recipes,
    loading,
    pagination,
    fetchRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
