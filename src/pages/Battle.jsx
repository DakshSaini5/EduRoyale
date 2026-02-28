import { useState, useEffect } from 'react';
import '../styles/battle.css';

export default function Battle() {
  const [battleState, setBattleState] = useState('idle'); // idle | search | vs | countdown | live | finished | results | review
  const [countdownText, setCountdownText] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); 
  const [p1Status, setP1Status] = useState('coding'); 
  const [p2Status, setP2Status] = useState('coding'); 
  const [hp, setHp] = useState({ p1: 100, p2: 100 });
  
  const [code, setCode] = useState('def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        # Your code here...');
  
  // The opponent's "simulated" winning/losing code
  const enemyCode = `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2  # Prevents overflow
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`;

  const currentUser = localStorage.getItem('vdsa_user') || 'GUEST_USER';

  const startMatchmaking = () => {
    setBattleState('search');
    setTimeout(() => {
      setBattleState('vs');
      setTimeout(() => setBattleState('countdown'), 3000); 
    }, 2500); 
  };

  useEffect(() => {
    if (battleState === 'countdown') {
      let count = 3;
      setCountdownText(count.toString());
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          setCountdownText(count.toString());
        } else if (count === 0) {
          setCountdownText('START!');
        } else {
          clearInterval(interval);
          setBattleState('live'); 
          setTimeLeft(30); 
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [battleState]);

  useEffect(() => {
    let timer;
    if (battleState === 'live' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && battleState === 'live') {
      triggerFinish();
    }
    return () => clearInterval(timer);
  }, [battleState, timeLeft]);

  useEffect(() => {
    let opponentTimer;
    if (battleState === 'live' && p2Status === 'coding') {
      const randomFinishTime = Math.floor(Math.random() * 15000) + 10000; // Opponent finishes between 10-25s
      opponentTimer = setTimeout(() => setP2Status('submitted'), randomFinishTime);
    }
    return () => clearTimeout(opponentTimer);
  }, [battleState]);

  useEffect(() => {
    if (battleState === 'live' && p1Status === 'submitted' && p2Status === 'submitted') {
      triggerFinish();
    }
  }, [p1Status, p2Status, battleState]);

  const triggerFinish = () => {
    setBattleState('finished');
    setTimeout(() => setBattleState('results'), 3000);
  };

  const handlePlayerSubmit = () => setP1Status('submitted');

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="page-wrap">
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <div className="chip chip-r">⚔ RANKED ARENA</div>
        <h1 style={{ color: 'var(--pink)', textShadow: '3px 3px 0 var(--pd)', marginTop: '12px' }}>GLOBAL MATCHMAKING</h1>
      </div>

      <div className="b-arena">
        
        {battleState === 'idle' && (
          <div className="b-state-idle" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '16px' }}>READY TO ENTER THE ARENA?</div>
            <p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '40px' }}>You will be matched against an opponent of similar ELO. First to solve wins.</p>
            <button onClick={startMatchmaking} className="px-btn px-btn-r" style={{ fontSize: '16px', padding: '16px 32px' }}>FIND MATCH ▶</button>
          </div>
        )}

        {battleState === 'search' && (
          <div className="b-state-search" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div className="radar" style={{ margin: '0 auto 30px' }}><div className="sweep"></div></div>
            <div className="srch-text blink" style={{ fontFamily: '"Press Start 2P", monospace', color: 'var(--pink)' }}>SEARCHING QUEUE...</div>
          </div>
        )}

        {battleState === 'vs' && (
          <div className="b-state-vs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', padding: '60px 0' }}>
            <div className="b-char p1-side" style={{ textAlign: 'center' }}>
              <div className="bc-av" style={{ fontSize: '64px', marginBottom: '16px', border: '4px solid var(--green)', padding: '20px', background: 'rgba(61,255,154,0.1)' }}>🤖</div>
              <div className="bc-name" style={{ fontFamily: '"Press Start 2P", monospace', color: 'var(--green)', fontSize: '14px', marginBottom: '8px' }}>{currentUser}</div>
            </div>
            <div className="vs-badge" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '32px', color: 'var(--yellow)', textShadow: '4px 4px 0 var(--yd)' }}>VS</div>
            <div className="b-char p2-side" style={{ textAlign: 'center' }}>
              <div className="bc-av" style={{ fontSize: '64px', marginBottom: '16px', border: '4px solid var(--pink)', padding: '20px', background: 'rgba(255,60,172,0.1)' }}>💀</div>
              <div className="bc-name" style={{ fontFamily: '"Press Start 2P", monospace', color: 'var(--pink)', fontSize: '14px', marginBottom: '8px' }}>NULL_POINTER</div>
            </div>
          </div>
        )}

        {battleState === 'countdown' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <div style={{ 
              fontFamily: '"Press Start 2P", monospace', 
              fontSize: countdownText === 'START!' ? '72px' : '120px', 
              color: countdownText === 'START!' ? 'var(--pink)' : 'var(--yellow)',
              textShadow: `8px 8px 0 ${countdownText === 'START!' ? 'var(--pd)' : 'var(--yd)'}`,
              animation: 'bounce 0.5s infinite alternate'
            }}>
              {countdownText}
            </div>
          </div>
        )}

        {battleState === 'live' && (
          <div className="b-state-live">
            <div className="live-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="chip chip-y">▶ BINARY SEARCH</span>
                <span style={{ color: 'var(--muted)', fontSize: '18px' }}>Find target in O(log n) time.</span>
              </div>
              <div style={{ color: timeLeft <= 10 ? 'var(--pink)' : 'var(--yellow)', fontFamily: '"Press Start 2P", monospace', fontSize: '14px', animation: timeLeft <= 10 ? 'blink 1s step-end infinite' : 'none' }}>
                ⏱ {formatTime(timeLeft)}
              </div>
            </div>

            <div className="live-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="live-col" style={{ position: 'relative' }}>
                <div className="lc-head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>
                  <span style={{ color: 'var(--green)' }}>{currentUser}</span>
                  <span style={{ color: 'var(--muted)' }}>{p1Status === 'submitted' ? 'SUBMITTED' : 'CODING...'}</span>
                </div>
                
                <div className="b-editor" style={{ background: 'var(--card)', border: '3px solid var(--border)', height: '420px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {p1Status === 'submitted' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ color: 'var(--green)', fontFamily: '"Press Start 2P", monospace', fontSize: '12px', marginBottom: '16px' }}>CODE SUBMITTED!</div>
                      <div className="blink" style={{ color: 'var(--muted)', fontFamily: '"Press Start 2P", monospace', fontSize: '8px' }}>WAITING FOR OPPONENT...</div>
                    </div>
                  )}

                  <div style={{ padding: '8px 12px', borderBottom: '2px solid var(--border)', color: 'var(--muted)', fontSize: '16px', background: 'rgba(255,255,255,0.02)' }}>solution.py</div>
                  <textarea 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    disabled={p1Status === 'submitted'}
                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--white)', padding: '16px', fontFamily: '"VT323", monospace', fontSize: '20px', resize: 'none', outline: 'none' }} 
                    spellCheck="false" 
                  />
                  <div style={{ padding: '12px', borderTop: '2px solid var(--border)', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
                    <button className="px-btn px-btn-o" disabled={p1Status === 'submitted'}>TEST CODE</button>
                    <button className="px-btn px-btn-g" onClick={handlePlayerSubmit} disabled={p1Status === 'submitted'}>
                      {p1Status === 'submitted' ? 'WAITING' : 'SUBMIT ▶'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="live-col">
                <div className="lc-head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>
                  <span style={{ color: 'var(--pink)' }}>NULL_POINTER</span>
                  <span style={{ color: p2Status === 'submitted' ? 'var(--pink)' : 'var(--muted)' }}>
                    {p2Status === 'submitted' ? 'SUBMITTED' : 'CODING...'}
                  </span>
                </div>
                
                <div className="b-trace" style={{ background: 'var(--card)', border: '3px solid var(--border)', height: '420px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '8px 12px', borderBottom: '2px solid var(--border)', color: 'var(--pink)', fontSize: '16px', background: 'rgba(255,60,172,0.05)' }}>▶ ENEMY TRACE</div>
                  <div style={{ flex: 1, padding: '16px', fontFamily: '"VT323", monospace', fontSize: '18px', color: 'var(--muted)', overflowY: 'auto' }}>
                    <div>&gt; Compiling solution.cpp...</div>
                    <div>&gt; Compilation successful.</div>
                    {p2Status === 'submitted' ? (
                      <div style={{ color: 'var(--pink)', marginTop: '16px', fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>[!] ENEMY HAS SUBMITTED THEIR CODE.</div>
                    ) : (
                      <><div style={{ color: 'var(--white)' }}>&gt; Test Case 1: <span style={{ color: 'var(--green)' }}>PASS</span> (0.01s)</div><div className="blink" style={{ marginTop: '16px', color: 'var(--pink)' }}>_</div></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {battleState === 'finished' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', flexDirection: 'column' }}>
            <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '64px', color: 'var(--white)', textShadow: '6px 6px 0 rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.5)', animation: 'fight-pop 0.5s steps(4) both' }}>
              FINISHED!
            </div>
            <div style={{ color: 'var(--muted)', marginTop: '20px', fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }} className="blink">
              CALCULATING RESULTS...
            </div>
          </div>
        )}

        {battleState === 'results' && (
          <div className="winner-summary show">
            <div className="ws-banner p1-wins">▶ VICTORY: {currentUser} ◀</div>
            <div className="ws-headline">
              <strong>BATTLE REPORT</strong><br/>Excellent execution. You outpaced the opponent in runtime efficiency.
            </div>

            <div className="comparison-matrix">
              <div className="cm-title">PERFORMANCE MATRIX</div>
              <table className="cm-table">
                <thead><tr><th>METRIC</th><th>{currentUser}</th><th>NULL_POINTER</th></tr></thead>
                <tbody>
                  <tr><td>TIME COMPLEXITY</td><td><span className="val-win">O(log n)</span></td><td><span className="val-tie">O(log n)</span></td></tr>
                  <tr><td>EXECUTION TIME</td><td><span className="val-win">24ms</span></td><td><span className="val-lose">48ms</span></td></tr>
                  <tr><td>MEMORY USAGE</td><td><span className="val-tie">14.2 MB</span></td><td><span className="val-tie">14.8 MB</span></td></tr>
                  <tr><td>TIME TAKEN</td><td><span className="val-win">{formatTime(30 - timeLeft)}</span></td><td><span className="val-lose">Time Limit</span></td></tr>
                </tbody>
              </table>
            </div>

            <div className="result-actions">
              <button className="px-btn px-btn-g" onClick={() => setBattleState('idle')}>PLAY AGAIN</button>
              {/* NEW: Button switches to Review mode */}
              <button className="px-btn px-btn-o" onClick={() => setBattleState('review')}>REVIEW CODE</button>
            </div>
          </div>
        )}

        {/* ─── NEW: POST-MATCH CODE REVIEW STATE ─── */}
        {battleState === 'review' && (
          <div className="review-state" style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ color: 'var(--blue)', fontFamily: '"Press Start 2P", monospace', fontSize: '16px', margin: '0 0 8px 0' }}>POST-MATCH CODE REVIEW</h2>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>Analyze and compare implementations.</p>
              </div>
              <button className="px-btn px-btn-o" onClick={() => setBattleState('results')}>◀ BACK TO RESULTS</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* YOUR CODE */}
              <div style={{ background: 'var(--card)', border: '3px solid var(--green)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px', borderBottom: '2px solid var(--green)', background: 'rgba(61,255,154,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--green)', fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}>{currentUser}</span>
                  <span className="chip chip-g" style={{ padding: '2px 8px', fontSize: '8px' }}>VICTORY (24ms)</span>
                </div>
                <textarea disabled value={code} style={{ flex: 1, minHeight: '400px', background: 'transparent', border: 'none', color: 'var(--white)', padding: '16px', fontFamily: '"VT323", monospace', fontSize: '20px', resize: 'none' }} />
              </div>

              {/* OPPONENT CODE */}
              <div style={{ background: 'var(--card)', border: '3px solid var(--pink)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px', borderBottom: '2px solid var(--pink)', background: 'rgba(255,60,172,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--pink)', fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}>NULL_POINTER</span>
                  <span className="chip chip-r" style={{ padding: '2px 8px', fontSize: '8px', color: 'var(--pink)', borderColor: 'var(--pink)' }}>DEFEAT (48ms)</span>
                </div>
                <textarea disabled value={enemyCode} style={{ flex: 1, minHeight: '400px', background: 'transparent', border: 'none', color: 'var(--muted)', padding: '16px', fontFamily: '"VT323", monospace', fontSize: '20px', resize: 'none' }} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}