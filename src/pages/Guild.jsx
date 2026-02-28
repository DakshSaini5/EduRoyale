import { useState } from 'react';
import '../styles/guild.css';
import '../styles/rank.css'; // Reusing the high-quality tables we made for the Ranks page

export default function Guild() {
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  // MOCK ACADEMIC HOUSE DATA
  const myHouse = {
    name: "THE_LOGIC_GATES",
    level: 42,
    members: "128/150",
    rank: "#4",
    globalElo: "45,210",
    warRecord: "142W - 12L",
    strengths: [
      { sub: "Computer Science", val: 85 },
      { sub: "Physics", val: 60 },
      { sub: "Mathematics", val: 40 }
    ]
  };

  // Internal Guild Member Rankings
  const houseMembers = [
    { rank: 1, name: "GRACE_HOPPER", role: "GUILD MASTER", elo: "3,310", solved: "2,980", acc: "94%" },
    { rank: 2, name: "0xALAN_TURING", role: "OFFICER", elo: "2,450", solved: "842", acc: "87%" },
    { rank: 3, name: "CODE_NINJA", role: "MEMBER", elo: "2,100", solved: "420", acc: "81%" },
    { rank: 4, name: "SYS_ADMIN", role: "MEMBER", elo: "1,950", solved: "310", acc: "79%" },
  ];

  // Global House Rankings
  const globalHouses = [
    { rank: 1, name: "NEWTONS_APPLES", level: 50, members: "150/150", winRate: "68%", elo: "58,900" },
    { rank: 2, name: "SEGFAULT_KINGS", level: 48, members: "142/150", winRate: "64%", elo: "52,440" },
    { rank: 3, name: "LOGIC_GATES", level: 42, members: "128/150", winRate: "59%", elo: "45,210" },
    { rank: 4, name: "QUANTUM_CATS", level: 39, members: "110/150", winRate: "55%", elo: "41,100" },
  ];

  return (
    <div className="page-wrap" style={{ maxWidth: '1400px' }}>
      
      {/* HEADER */}
      <div className="page-header" style={{ marginBottom: '40px' }}>
        <div className="page-header-left">
          <div className="chip chip-p">🛡️ FACTION HUB</div>
          <h1 style={{ color: 'var(--purple)', textShadow: '3px 3px 0 var(--pud)' }}>ACADEMIC HOUSES</h1>
          <p>Coordinate with your faction, donate ELO, and climb the global leaderboards.</p>
        </div>
        <div className="page-header-right">
          <button className="px-btn px-btn-p">⚔ DECLARE WAR</button>
          <button className="px-btn px-btn-o">🔍 BROWSE HOUSES</button>
        </div>
      </div>

      <div className="guild-layout">
        
        {/* LEFT COLUMN: MY HOUSE STATS & WARS */}
        <div className="g-col-left" style={{ flex: '0 0 400px' }}>
          
          <div className="g-panel g-my-guild">
            <div className="g-panel-head">▶ YOUR FACTION</div>
            <div className="mg-header">
              <div className="mg-icon">⚡</div>
              <div className="mg-info">
                <div className="mg-name">{myHouse.name}</div>
                <div className="mg-tags">
                  <span className="ptag pt-y">LVL {myHouse.level}</span>
                  <span className="ptag pt-b">{myHouse.members}</span>
                </div>
              </div>
            </div>
            
            <div className="mg-stats" style={{ gridTemplateColumns: '1fr 1fr', padding: '16px' }}>
              <div className="mg-stat-box">
                <div className="ms-lbl">GLOBAL ELO</div>
                <div className="ms-val" style={{ color: 'var(--yellow)', fontSize: '14px' }}>{myHouse.globalElo}</div>
              </div>
              <div className="mg-stat-box">
                <div className="ms-lbl">WAR RECORD</div>
                <div className="ms-val" style={{ color: 'var(--green)', fontSize: '14px' }}>{myHouse.warRecord}</div>
              </div>
            </div>
            
            <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="ms-lbl" style={{ marginBottom: '16px' }}>FACTION DOMAIN MASTERY</div>
              {myHouse.strengths.map(s => (
                <div key={s.sub} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: '"Press Start 2P", monospace', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--white)' }}>{s.sub}</span>
                    <span style={{ color: 'var(--blue)' }}>{s.val}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)' }}>
                    <div style={{ height: '100%', width: `${s.val}%`, background: 'var(--blue)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVE HOUSE WARS */}
          <div className="g-panel g-wars">
            <div className="g-panel-head" style={{ color: 'var(--pink)', borderBottomColor: 'rgba(255,60,172,.3)' }}>
              ⚔ ACTIVE HOUSE WARS
            </div>
            <div className="gw-list">
              <div className="gw-item active-war">
                <div className="gw-badge blink">🔴 LIVE WAR</div>
                <div className="gw-matchup" style={{ fontSize: '12px' }}>
                  <span className="gw-t1">LOGIC_GATES</span> <br/><span className="gw-vs">VS</span><br/> <span className="gw-t2">NEWTONS_APPLES</span>
                </div>
                <div className="gw-meta" style={{ marginTop: '10px' }}>ALGORITHM BATTLES • ROUND 3</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button className="px-btn px-btn-r" style={{ flex: 1, justifyContent: 'center', fontSize: '10px' }}>SPECTATE ▶</button>
                  <button className="px-btn px-btn-g" style={{ flex: 1, justifyContent: 'center', fontSize: '10px' }}>JOIN FRAY</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TABLES (Members & Global) */}
        <div className="g-col-right" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* TABS */}
          <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid var(--border)', paddingBottom: '12px' }}>
            {['DASHBOARD', 'MEMBER ROSTER', 'GLOBAL STANDINGS'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-btn px-btn-o ${activeTab === tab ? 'active' : ''}`}
                style={{ 
                  background: activeTab === tab ? 'rgba(162,89,255,0.15)' : 'transparent', 
                  color: activeTab === tab ? 'var(--purple)' : 'var(--muted)',
                  borderColor: activeTab === tab ? 'var(--purple)' : 'var(--border)'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TABLE 1: MEMBER ROSTER */}
          {(activeTab === 'DASHBOARD' || activeTab === 'MEMBER ROSTER') && (
            <div className="table-section" style={{ borderColor: 'var(--purple)', margin: 0 }}>
              <div className="table-header" style={{ color: 'var(--purple)' }}>
                <span>👥 FACTION ROSTER (YOUR HOUSE)</span>
                <span style={{ color: 'var(--muted)' }}>SORT: ELO</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="rank-table">
                  <thead>
                    <tr>
                      <th>RANK</th>
                      <th>MEMBER NAME</th>
                      <th>ROLE</th>
                      <th>SOLVED</th>
                      <th>ACCURACY</th>
                      <th style={{ textAlign: 'right' }}>ELO CONTRIBUTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {houseMembers.map((m) => (
                      <tr key={m.rank} className={m.name === "0xALAN_TURING" ? "is-me" : ""}>
                        <td className={m.rank === 1 ? "t-rank gold" : "t-rank"}>#{m.rank}</td>
                        <td className="t-name" style={{ fontSize: '12px' }}>{m.name} {m.name === "0xALAN_TURING" && "(YOU)"}</td>
                        <td>
                          <span className="t-lang" style={{ 
                            background: m.role === 'GUILD MASTER' ? 'rgba(255,214,10,0.1)' : 'rgba(162,89,255,0.1)', 
                            color: m.role === 'GUILD MASTER' ? 'var(--yellow)' : 'var(--purple)',
                            borderColor: m.role === 'GUILD MASTER' ? 'var(--yellow)' : 'var(--purple)'
                          }}>
                            {m.role}
                          </span>
                        </td>
                        <td className="t-val">{m.solved}</td>
                        <td className="t-val t-green">{m.acc}</td>
                        <td className="t-elo" style={{ color: 'var(--yellow)' }}>{m.elo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TABLE 2: GLOBAL STANDINGS */}
          {(activeTab === 'DASHBOARD' || activeTab === 'GLOBAL STANDINGS') && (
            <div className="table-section" style={{ borderColor: 'var(--border)', margin: 0 }}>
              <div className="table-header">
                <span>🏆 GLOBAL FACTION STANDINGS</span>
                <span style={{ color: 'var(--green)' }}>SEASON 4</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="rank-table">
                  <thead>
                    <tr>
                      <th>RANK</th>
                      <th>HOUSE NAME</th>
                      <th>LEVEL</th>
                      <th>MEMBERS</th>
                      <th>WAR WIN %</th>
                      <th style={{ textAlign: 'right' }}>TOTAL ELO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalHouses.map((h) => (
                      <tr key={h.rank} className={h.name === "LOGIC_GATES" ? "is-me" : ""}>
                        <td className={h.rank === 1 ? "t-rank gold" : h.rank === 2 ? "t-rank silver" : h.rank === 3 ? "t-rank bronze" : "t-rank"}>#{h.rank}</td>
                        <td className="t-name" style={{ fontSize: '13px', color: h.name === "LOGIC_GATES" ? 'var(--green)' : 'var(--white)' }}>{h.name}</td>
                        <td className="t-val">{h.level}</td>
                        <td className="t-val">{h.members}</td>
                        <td className="t-val t-green">{h.winRate}</td>
                        <td className="t-elo" style={{ color: 'var(--yellow)' }}>{h.elo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}