import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- IMPORT CONTEXT

export default function Navbar({ onOpenAuth }) {
  const location = useLocation();
  const { user, signOut } = useAuth(); // <-- USE CONTEXT

  return (
    <nav id="nav">
      <Link to="/" className="nav-logo">▶ EduRoyal</Link>
      <ul className="nav-links">
        {/* ... keep your existing Links here ... */}
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>[HOME]</Link></li>
        <li><Link to="/battle" className={location.pathname === '/battle' ? 'active' : ''}>[⚔ BATTLE]</Link></li>
        <li><Link to="/learn" className={location.pathname === '/learn' ? 'active' : ''}>[📖 LEARN]</Link></li>
        <li><Link to="/ranks" className={location.pathname === '/ranks' ? 'active' : ''}>[🏆 RANKS]</Link></li>
        <li><Link to="/guild" className={location.pathname === '/guild' ? 'active' : ''}>[🛡️ GUILD]</Link></li>
      </ul>
      <div className="nav-cta">
        {user ? (
          <>
            <Link to="/profile" className="px-btn px-btn-o" style={{ color: 'var(--green)', borderColor: 'var(--green)' }}>
              {/* Show the part of their email before the @ */}
              [ {user.email.split('@')[0].toUpperCase()} ]
            </Link>
            <button onClick={signOut} className="px-btn px-btn-r">LOGOUT</button>
          </>
        ) : (
          <button onClick={onOpenAuth} className="px-btn px-btn-o">LOGIN / SIGNUP</button>
        )}
        <Link to="/battle" className="px-btn px-btn-g">⚔ FIND MATCH</Link>
      </div>
    </nav>
  );
}