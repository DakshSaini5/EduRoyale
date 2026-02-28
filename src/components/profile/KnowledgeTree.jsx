import React from 'react';

export default function KnowledgeTree({ subjects }) {
  const subjectList = Object.entries(subjects);

  return (
    <div className="p-panel" style={{ borderColor: 'var(--purple)' }}>
      <div className="p-panel-head" style={{ color: 'var(--purple)' }}>
        🌳 KNOWLEDGE TREE
      </div>
      
      <div style={{ padding: '24px', fontFamily: '"VT323", monospace', fontSize: '22px' }}>
        {subjectList.map(([subjectName, data]) => (
          <div key={subjectName} style={{ marginBottom: '24px' }}>
            
            {/* Subject Title */}
            <div style={{ color: 'var(--yellow)', fontFamily: '"Press Start 2P", monospace', fontSize: '10px', marginBottom: '12px' }}>
              ▶ {subjectName} (RATING: {data.rating})
            </div>
            
            {/* Subtopics Loop with Dashed Line */}
            <ul style={{ listStyle: 'none', paddingLeft: '16px', margin: '0 0 0 8px', borderLeft: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(data.topics).map(([topicName, topicData]) => (
                <li 
                  key={topicName} 
                  style={{ 
                    color: topicData.masteryPercent === 100 ? 'var(--green)' : 'var(--muted)',
                    textShadow: topicData.masteryPercent === 100 ? '0 0 8px rgba(61,255,154,0.4)' : 'none'
                  }}
                >
                  ↳ {topicName} ({topicData.masteryPercent}%)
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
}