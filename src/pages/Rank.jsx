import React from 'react';
import '../styles/rank.css';

export default function Ranks() {
  // TABLE 1 DATA: Global Leaderboard
  const globalLeaderboard = [
    { rank: 1, name: "LINUS_TORVALDS", title: "Grandmaster", house: "NEWTONS_APPLES", solved: "3,402", matches: "1,240", winRate: "72%", acc: "98%", streak: 12, form: ['W','W','W','W','W'], lang: "C++", elo: "3,450", icon: "👑" },
    { rank: 2, name: "GRACE_HOPPER", title: "Grandmaster", house: "LOGIC_GATES", solved: "2,980", matches: "980", winRate: "69%", acc: "94%", streak: 2, form: ['L','W','L','W','W'], lang: "COBOL", elo: "3,310", icon: "⚡" },
    { rank: 3, name: "ADA_LOVELACE", title: "Master", house: "NEWTONS_APPLES", solved: "2,750", matches: "850", winRate: "65%", acc: "91%", streak: 0, form: ['W','W','L','L','L'], lang: "Python", elo: "3,125", icon: "🔥" },
    { rank: 4, name: "TURING_MACHINE", title: "Master", house: "SEGFAULT_KINGS", solved: "3,105", matches: "1,105", winRate: "61%", acc: "89%", streak: 5, form: ['L','W','W','W','W'], lang: "Java", elo: "2,980", icon: "💻" },
    { rank: 5, name: "CODE_NINJA", title: "Diamond", house: "-", solved: "1,420", matches: "420", winRate: "58%", acc: "85%", streak: 3, form: ['W','L','W','W','W'], lang: "JS", elo: "2,840", icon: "🥷" },
  ];

  // TABLE 2 DATA: Domain Leaders
  const domainLeaders = [
    { domain: "Data Structures", name: "0xALAN_TURING", winRate: "81%", elo: "2,450" },
    { domain: "Dynamic Prog.", name: "LINUS_TORVALDS", winRate: "76%", elo: "2,900" },
    { domain: "System Design", name: "GRACE_HOPPER", winRate: "71%", elo: "2,750" },
  ];

  // TABLE 3 DATA: Top Guilds/Houses
  const guildLeaders = [
    { rank: 1, name: "NEWTONS_APPLES", members: "150/150", winRate: "68%", elo: "58,900" },
    { rank: 2, name: "SEGFAULT_KINGS", members: "142/150", winRate: "64%", elo: "52,440" },
    { rank: 3, name: "LOGIC_GATES", members: "128/150", winRate: "59%", elo: "45,210" },
  ];

  // TABLE 4 DATA: Recent High-Elo Matches
  const recentMatches = [
    { p1: "ADA_LOVELACE", p2: "CODE_NINJA", domain: "Graphs", winner: "p1", time: "2m ago" },
    { p1: "GRACE_HOPPER", p2: "TURING_MACHINE", domain: "Sorting", winner: "p2", time: "15m ago" },
    { p1: "LINUS_TORVALDS", p2: "0xALAN", domain: "DP", winner: "p1", time: "1h ago" },
  ];

  const myRank = { rank: 14, name: "0xALAN_TURING", title: "Algorithm Master", house: "LOGIC_GATES", solved: "842", matches: "210", winRate: "68%", acc: "87%", streak: 4, form: ['L','W','W','W','W'], lang: "Python", elo: "2,450", icon: "👾" };

  const getRankClass = (rank) => {
    if (rank === 1) return "t-rank gold";
    if (rank === 2) return "t-rank silver";
    if (rank === 3) return "t-rank bronze";
    return "t-rank";
  };

  const renderForm = (formArray) => (
    <div className="t-form">
      {formArray.map((res, i) => (
        <span key={i} className={`form-box ${res === 'W' ? 'form-w' : 'form-l'}`}>{res}</span>
      ))}
    </div>
  );

  return (
    <div className="ranks-wrap">
      
      <div className="ranks-header">
        <h1>COMPETITIVE HUB</h1>
        <p>Global leaderboards, guild standings, and live match feeds.</p>
      </div>

      {/* ── TABLE 1: GLOBAL LEADERBOARD (FULL WIDTH) ── */}
      <div className="table-section">
        <div className="table-header">
          <span>🏆 GLOBAL TOP PLAYERS</span>
          <span style={{ color: 'var(--green)' }}>SEASON 4 ACTIVE</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="rank-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>PLAYER</th>
                <th>GUILD</th>
                <th>SOLVED</th>
                <th>MATCHES</th>
                <th>WIN %</th>
                <th>STREAK</th>
                <th>RECENT FORM</th>
                <th>MAIN LANG</th>
                <th style={{ textAlign: 'right' }}>ELO RATING</th>
              </tr>
            </thead>
            <tbody>
              {globalLeaderboard.map((p) => (
                <tr key={p.rank}>
                  <td className={getRankClass(p.rank)}>#{p.rank}</td>
                  <td>
                    <div className="t-player">
                      <span className="t-avatar">{p.icon}</span>
                      <div>
                        <div className="t-name">{p.name}</div>
                        <div className="t-title">{p.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.house !== "-" ? <span className="t-house">{p.house}</span> : <span className="t-title">-</span>}</td>
                  <td className="t-val">{p.solved}</td>
                  <td className="t-val">{p.matches}</td>
                  <td className="t-val t-green">{p.winRate}</td>
                  <td className="t-streak">{p.streak > 0 ? `🔥 ${p.streak}` : '-'}</td>
                  <td>{renderForm(p.form)}</td>
                  <td><span className="t-lang">{p.lang}</span></td>
                  <td className="t-elo">{p.elo}</td>
                </tr>
              ))}
              <tr><td colSpan="10" style={{ textAlign: 'center', padding: '10px', color: 'var(--muted)' }}>...</td></tr>
              {/* CURRENT USER */}
              <tr className="is-me">
                <td className="t-rank">#{myRank.rank}</td>
                <td>
                  <div className="t-player"><span className="t-avatar">{myRank.icon}</span><div><div className="t-name">{myRank.name} (YOU)</div><div className="t-title">{myRank.title}</div></div></div>
                </td>
                <td><span className="t-house">{myRank.house}</span></td>
                <td className="t-val">{myRank.solved}</td>
                <td className="t-val">{myRank.matches}</td>
                <td className="t-val t-green">{myRank.winRate}</td>
                <td className="t-streak">🔥 {myRank.streak}</td>
                <td>{renderForm(myRank.form)}</td>
                <td><span className="t-lang">{myRank.lang}</span></td>
                <td className="t-elo" style={{ color: 'var(--green)' }}>{myRank.elo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── GRID LAYOUT FOR SMALLER TABLES ── */}
      <div className="table-grid">
        
        {/* TABLE 2: TOP GUILDS */}
        <div className="table-section" style={{ borderColor: 'var(--purple)' }}>
          <div className="table-header" style={{ color: 'var(--purple)' }}>
            <span>🛡️ TOP ACADEMIC HOUSES</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="rank-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>HOUSE NAME</th>
                  <th>MEMBERS</th>
                  <th style={{ textAlign: 'right' }}>TOTAL ELO</th>
                </tr>
              </thead>
              <tbody>
                {guildLeaders.map((g) => (
                  <tr key={g.rank}>
                    <td className={getRankClass(g.rank)}>#{g.rank}</td>
                    <td><span className="t-house" style={{ fontSize: '10px' }}>{g.name}</span></td>
                    <td className="t-val">{g.members}</td>
                    <td className="t-elo" style={{ color: 'var(--yellow)' }}>{g.elo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLE 3: RECENT BATTLES */}
        <div className="table-section" style={{ borderColor: 'var(--pink)' }}>
          <div className="table-header" style={{ color: 'var(--pink)' }}>
            <span>⚔️ LIVE MATCH FEED</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="rank-table">
              <thead>
                <tr>
                  <th>MATCHUP</th>
                  <th>DOMAIN</th>
                  <th style={{ textAlign: 'right' }}>TIME</th>
                </tr>
              </thead>
              <tbody>
                {recentMatches.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: '10px', fontFamily: '"Press Start 2P", monospace' }}>
                      <span style={{ color: m.winner === 'p1' ? 'var(--green)' : 'var(--muted)' }}>{m.p1}</span>
                      <span style={{ color: 'var(--pink)', margin: '0 8px' }}>VS</span>
                      <span style={{ color: m.winner === 'p2' ? 'var(--green)' : 'var(--muted)' }}>{m.p2}</span>
                    </td>
                    <td style={{ color: 'var(--white)', fontSize: '12px' }}>{m.domain}</td>
                    <td className="t-rank" style={{ textAlign: 'right' }}>{m.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}