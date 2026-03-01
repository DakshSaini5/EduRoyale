import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        // --- SUPABASE LOGIN ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        console.log("✅ Successfully logged in!");
        onClose(); // Close the modal
        
      } else {
        // --- SUPABASE SIGNUP ---
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        alert("Signup successful! Check your email to verify your account.");
        setIsLogin(true); // Switch to login view
      }
    } catch (error) {
      setErrorMsg(error.message);
      console.error("Auth error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>[X]</button>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(false)}
          >
            SIGNUP
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errorMsg && <div style={{ color: 'var(--pink)', fontSize: '12px' }}>{errorMsg}</div>}
          
          <input 
            type="email" 
            className="auth-input" 
            placeholder="EMAIL_ADDRESS" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            className="auth-input" 
            placeholder="PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          <button type="submit" className="px-btn px-btn-g mt-4" disabled={loading}>
            {loading ? 'PROCESSING...' : isLogin ? 'INITIATE_LINK' : 'CREATE_ENTITY'}
          </button>
        </form>
      </div>
    </div>
  );
}