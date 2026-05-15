import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AddEditRecipe from './pages/AddEditRecipe';

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home type="recipe" />} />
            <Route path="/nutrition" element={<Home type="nutrition" />} />
            <Route path="/juices" element={<Home type="juice" />} />
            <Route path="/remedies" element={<Home type="remedy" />} />
            <Route path="/seeds" element={<Home type="seed" />} />
            <Route path="/schedule" element={<Home type="schedule" />} />
            <Route path="/vitals" element={<Home type="vitals" />} />
            <Route path="/detox" element={<Home type="detox" />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/add" element={<AddEditRecipe />} />
            <Route path="/edit/:id" element={<AddEditRecipe />} />
          </Routes>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
