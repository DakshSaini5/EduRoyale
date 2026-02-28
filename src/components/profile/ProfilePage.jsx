import React, { useState } from 'react';
import IDCard from './IDCard';
import KnowledgeTree from './KnowledgeTree';
import '../../styles/profile.css'; // Ensure the CSS is imported!

export default function ProfilePage() {
  const [mockUser] = useState({
    username: "RUNTIME_TERROR",
    guildName: "NEWTONS_APPLES",
    globalRating: 1450,
    archetype: "The Speed Solver",
    battles: 142,
    wins: 89,
    subjects: {
      "Physics": {
        rating: 1600,
        topics: {
          "Kinematics": { masteryPercent: 100 },
          "Thermodynamics": { masteryPercent: 45 }
        }
      },
      "Computer Science": {
        rating: 1350,
        topics: {
          "Binary Search": { masteryPercent: 100 },
          "Recursion": { masteryPercent: 10 }
        }
      }
    }
  });

  return (
    <div className="page-wrap">
      
      {/* HEADER */}
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <div className="page-header-left">
          <div className="chip chip-b">👤 PLAYER DOSSIER</div>
          <h1 style={{ color: 'var(--blue)', textShadow: '3px 3px 0 var(--bd)', marginTop: '8px' }}>COMBAT RECORD</h1>
        </div>
      </div>

      <div className="profile-layout">
        
        {/* LEFT COLUMN: The ID Card */}
        <div className="p-col-left">
          <IDCard user={mockUser} />
        </div>

        {/* RIGHT COLUMN: Stats & Knowledge Tree */}
        <div className="p-col-right">
          
          {/* Top Stats Bar */}
          <div className="stats-grid" style={{ padding: 0, marginBottom: '8px' }}>
            <div className="stat-box">
              <div className="sb-lbl">GLOBAL RATING</div>
              <div className="sb-val" style={{ color: 'var(--yellow)' }}>{mockUser.globalRating}</div>
            </div>
            <div className="stat-box">
              <div className="sb-lbl">BATTLES</div>
              <div className="sb-val" style={{ color: 'var(--white)' }}>{mockUser.battles}</div>
            </div>
            <div className="stat-box">
              <div className="sb-lbl">VICTORIES</div>
              <div className="sb-val" style={{ color: 'var(--green)' }}>{mockUser.wins}</div>
            </div>
          </div>

          {/* Knowledge Tree Module */}
          <KnowledgeTree subjects={mockUser.subjects} />

        </div>
      </div>
    </div>
  );
}