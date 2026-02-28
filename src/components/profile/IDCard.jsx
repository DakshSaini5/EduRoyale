import React from 'react';

export default function IDCard({ user }) {
  return (
    <div className="id-card">
      <div className="id-avatar">🤖</div>
      
      <div className="id-name">{user.username}</div>
      <div className="id-title" style={{ color: 'var(--blue)' }}>{user.archetype}</div>
      
      <div className="id-tags">
        <span className="ptag pt-y">LVL 42</span>
        <span className="ptag pt-p" style={{ color: 'var(--purple)', borderColor: 'var(--purple)', background: 'rgba(162,89,255,0.1)' }}>
          STEM SLAYER
        </span>
      </div>

      <div className="id-guild">
        <div className="idg-lbl">ACADEMIC HOUSE</div>
        <div className="idg-val">🛡️ {user.guildName}</div>
      </div>
    </div>
  );
}