import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';

// IMPORT YOUR ACTUAL PAGES HERE:
import Home from './pages/Home';
import Battle from './pages/Battle';
import Learn from './pages/Learn';
import Ranks from './pages/Rank'; // The Ranks page we made earlier

// 1. CHANGE THIS IMPORT: Point it to the pages folder!
import Guild from './pages/Guild';

import ProfilePage from './components/profile/ProfilePage';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Global UI */}
      <CustomCursor />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* 2. UPDATE THIS ROUTE to use the new <Guild /> component */}
        <Route path="/guild" element={<Guild />} />        
        
        <Route path="/battle" element={<Battle />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/ranks" element={<Ranks />} />
      </Routes>
    </BrowserRouter>
  );
}