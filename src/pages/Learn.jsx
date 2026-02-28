import { useState, useEffect } from 'react';
import '../styles/learn.css';

export default function Learn() {
  const [activeSubject, setActiveSubject] = useState('Computer Science');
  const [activeModule, setActiveModule] = useState('Binary Search');
  
  // Visual Engine State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // AI Doubt Bot State
  const [aiInput, setAiInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'AI', text: 'Ask me anything. Need me to explain why left <= right instead of left < right?' }
  ]);

  const array = [1, 3, 5, 8, 12, 15, 22];
  const target = 15;

  // The actual code to display
  const codeLines = [
    "def binary_search(arr, target):",
    "    left, right = 0, len(arr) - 1",
    "    while left <= right:",
    "        mid = (left + right) // 2",
    "        if arr[mid] == target:",
    "            return mid",
    "        elif arr[mid] < target:",
    "            left = mid + 1",
    "        else:",
    "            right = mid - 1",
    "    return -1"
  ];

  // Steps mapped directly to code lines!
  const steps = [
    { line: 1, desc: "INITIALIZE: Set Left pointer to 0 and Right to 6.", left: 0, right: 6, mid: '-', found: false },
    { line: 2, desc: "LOOP: left (0) <= right (6). True, so we enter the loop.", left: 0, right: 6, mid: '-', found: false },
    { line: 3, desc: "CALCULATE MID: (0 + 6) // 2 = 3.", left: 0, right: 6, mid: 3, found: false },
    { line: 4, desc: "CHECK MATCH: Is array[3] (8) == 15? False.", left: 0, right: 6, mid: 3, found: false },
    { line: 6, desc: "COMPARE: Is array[3] (8) < 15? True.", left: 0, right: 6, mid: 3, found: false },
    { line: 7, desc: "UPDATE LEFT: Target is greater, move Left pointer to mid + 1 (4).", left: 4, right: 6, mid: 3, found: false },
    { line: 2, desc: "LOOP: left (4) <= right (6). True, so we continue.", left: 4, right: 6, mid: '-', found: false },
    { line: 3, desc: "CALCULATE MID: (4 + 6) // 2 = 5.", left: 4, right: 6, mid: 5, found: false },
    { line: 4, desc: "CHECK MATCH: Is array[5] (15) == 15? True! MATCH FOUND!", left: 4, right: 6, mid: 5, found: true },
    { line: 5, desc: "RETURN: Return the index 5.", left: 4, right: 6, mid: 5, found: true }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
          return prev + 1;
        });
      }, 1800); // Slightly slower to read line-by-line
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const currentData = steps[currentStep];

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setChatLog(prev => [...prev, { sender: 'USER', text: aiInput }]);
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'AI', text: `Processing query regarding: "${aiInput}". In O(log n) time, we halve the search space...` }]);
    }, 800);
    setAiInput('');
  };

  return (
    <div className="page-wrap" style={{ display: 'flex', gap: '24px', maxWidth: '1600px', margin: '0 auto', padding: '100px 48px 60px', minHeight: '100vh' }}>
      
      {/* ─── SIDEBAR: DOMAINS ─── */}
      <div style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="g-panel" style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'var(--border)' }}>
          <div className="g-panel-head" style={{ color: 'var(--yellow)' }}>📚 DOMAINS</div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Computer Science', 'Physics', 'Mathematics'].map(sub => (
              <button key={sub} onClick={() => setActiveSubject(sub)} className="px-btn" style={{ background: activeSubject === sub ? 'rgba(61,255,154,0.1)' : 'transparent', color: activeSubject === sub ? 'var(--green)' : 'var(--muted)', border: `2px solid ${activeSubject === sub ? 'var(--green)' : 'transparent'}`, justifyContent: 'flex-start' }}>
                {activeSubject === sub ? '▶ ' : ''}{sub}
              </button>
            ))}
          </div>
        </div>
        <div className="g-panel" style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'var(--border)', flex: 1 }}>
          <div className="g-panel-head" style={{ color: 'var(--blue)' }}>🗂️ MODULES</div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeSubject === 'Computer Science' && ['Binary Search', 'Recursion', 'Sorting'].map(mod => (
              <button key={mod} onClick={() => setActiveModule(mod)} className="px-btn" style={{ background: activeModule === mod ? 'rgba(60,172,255,0.1)' : 'transparent', color: activeModule === mod ? 'var(--blue)' : 'var(--muted)', border: `2px solid ${activeModule === mod ? 'var(--blue)' : 'transparent'}`, justifyContent: 'flex-start', fontSize: '8px' }}>{mod}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="page-header" style={{ marginBottom: '0' }}>
          <div className="chip chip-b">🎬 VISUAL ENGINE</div>
          <h1 style={{ color: 'var(--blue)', textShadow: '3px 3px 0 var(--bd)', margin: '10px 0' }}>{activeModule.toUpperCase()}</h1>
        </div>

        {/* ─── SPLIT LAYOUT ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', flex: 1 }}>
          
          {/* LEFT COL: VISUALIZER & EXPLANATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* STAGE */}
            <div className="g-panel" style={{ borderColor: 'var(--blue)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '2px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>TARGET: <span style={{ color: 'var(--yellow)' }}>{target}</span></span>
                <span className="chip chip-g" style={{ padding: '4px 8px', fontSize: '8px' }}>LIVE TRACE</span>
              </div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', padding: '40px 20px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {array.map((num, i) => {
                    let bg = 'rgba(255,255,255,0.05)', border = '2px solid var(--border)', color = 'var(--white)', shadow = 'none';
                    if (i < currentData.left || i > currentData.right) color = 'var(--muted)';
                    if (i === currentData.mid) { border = '2px solid var(--blue)'; bg = 'rgba(60,172,255,0.2)'; }
                    if (currentData.found && i === currentData.mid) { border = '2px solid var(--green)'; bg = 'var(--green)'; color = '#000'; shadow = '0 0 20px rgba(61,255,154,0.5)'; }
                    return <div key={i} style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Press Start 2P", monospace', fontSize: '14px', background: bg, border: border, color: color, boxShadow: shadow }}>{num}</div>;
                  })}
                </div>
              </div>

              {/* CONTROLS */}
              <div style={{ padding: '16px', borderTop: '2px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(0,0,0,0.6)' }}>
                <button className="px-btn px-btn-g" onClick={() => setIsPlaying(!isPlaying)} style={{ width: '120px', justifyContent: 'center' }}>
                  {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                </button>
                <button className="px-btn px-btn-o" onClick={() => { setIsPlaying(false); setCurrentStep(0); }}>↺ RESET</button>
                <div style={{ flex: 1, textAlign: 'right', fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'var(--muted)' }}>
                  STEP {currentStep + 1} OF {steps.length}
                </div>
              </div>
            </div>

            {/* LINE-BY-LINE EXPLANATION & MEMORY STATE */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
              <div className="expl-panel">
                <div className="ep-head">
                  <span>▶ EXECUTION LOG</span>
                  <span className="ep-step-badge">LINE {currentData.line}</span>
                </div>
                <div className="ep-body" style={{ minHeight: '120px' }}>
                  <div className="ep-text" style={{ fontFamily: '"VT323", monospace', fontSize: '22px' }}>
                    {currentData.desc}
                  </div>
                </div>
              </div>

              <div className="mem-panel">
                <div className="mp-head">💽 MEMORY STATE</div>
                <div className="mp-body">
                  <div className="var-row"><span className="var-name">LEFT</span><span className="var-eq">=</span><span className="var-val">{currentData.left}</span></div>
                  <div className="var-row"><span className="var-name">RIGHT</span><span className="var-eq">=</span><span className="var-val">{currentData.right}</span></div>
                  <div className="var-row"><span className="var-name">MID</span><span className="var-eq">=</span><span className="var-val">{currentData.mid}</span></div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COL: CODE DISPLAY & AI BOT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* LIVE CODE VIEWER */}
            <div className="code-display" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="cd-head">
                <span className="cd-title">solution.py</span>
                <div className="cd-meta"><span className="cd-lang">PYTHON</span></div>
              </div>
              <div className="code-lines" style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.6)' }}>
                {codeLines.map((codeStr, idx) => {
                  const isActive = idx === currentData.line;
                  return (
                    <div key={idx} className={`cl ${isActive ? 'hl' : ''}`}>
                      <div className="cl-num">{idx}</div>
                      <div className="cl-code" style={{ whiteSpace: 'pre' }}>{codeStr}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI DOUBT BOT TERMINAL */}
            <div className="ai-panel" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
              <div className="aip-head">
                <div style={{ fontSize: '16px' }}>🤖</div>
                <div>AI DOUBT BOT</div>
                <span style={{ marginLeft: 'auto', fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'var(--muted)' }}>ONLINE</span>
              </div>
              
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"VT323", monospace', fontSize: '20px' }}>
                {chatLog.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'USER' ? 'flex-end' : 'flex-start' }}>
                    <span style={{ fontSize: '14px', color: msg.sender === 'USER' ? 'var(--blue)' : 'var(--purple)', marginBottom: '4px' }}>{msg.sender}</span>
                    <div style={{ background: msg.sender === 'USER' ? 'rgba(60,172,255,0.1)' : 'rgba(162,89,255,0.1)', border: `2px solid ${msg.sender === 'USER' ? 'var(--blue)' : 'var(--purple)'}`, padding: '12px', maxWidth: '90%', lineHeight: '1.4' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAiSubmit} style={{ padding: '12px', borderTop: '2px solid var(--border)', display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)' }}>
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask about this algorithm..." 
                  style={{ flex: 1, background: 'transparent', border: '2px solid var(--border)', color: 'var(--white)', padding: '8px 12px', fontFamily: '"VT323", monospace', fontSize: '18px', outline: 'none' }} 
                />
                <button type="submit" className="px-btn px-btn-p">SEND</button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}