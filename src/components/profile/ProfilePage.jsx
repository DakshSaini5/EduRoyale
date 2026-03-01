import React, { useState, useEffect } from 'react';
import IDCard from './IDCard';
import KnowledgeTree from './KnowledgeTree';
import '../../styles/profile.css'; 
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch real stats from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;

        // Combine real DB data with mock data for the Knowledge Tree (until you build that DB table!)
        if (data) {
          setProfileData({
            username: data.username || user.email.split('@')[0].toUpperCase(),
            guildName: data.guild_name || "UNASSIGNED",
            globalRating: data.elo || 1000,
            archetype: "The Speed Solver",
            battles: data.matches || 0,
            wins: data.wins || 0,
            subjects: {
              "Data Structures": { rating: 1450, topics: { "Arrays": { masteryPercent: 100 }, "Trees": { masteryPercent: 45 } } },
              "Algorithms": { rating: 1350, topics: { "Binary Search": { masteryPercent: 100 }, "Recursion": { masteryPercent: 10 } } }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        // Fallback if profile row isn't created yet
        setProfileData({
          username: user.email.split('@')[0].toUpperCase(),
          guildName: "UNASSIGNED",
          globalRating: 1000,
          archetype: "Rookie",
          battles: 0,
          wins: 0,
          subjects: {}
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, [user]);

  // Loading & Access States
  if (loading) return <div style={{ color: 'var(--white)', padding: '100px', textAlign: 'center', fontFamily: '"Press Start 2P", monospace' }}>LOADING DOSSIER...</div>;
  if (!user) return <div style={{ color: 'var(--pink)', padding: '100px', textAlign: 'center', fontFamily: '"Press Start 2P", monospace' }}>ACCESS DENIED. PLEASE LOGIN.</div>;
  if (!profileData) return <div style={{ color: 'var(--pink)', padding: '100px', textAlign: 'center', fontFamily: '"Press Start 2P", monospace' }}>PROFILE NOT FOUND.</div>;

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
          <IDCard user={profileData} />
        </div>

        {/* RIGHT COLUMN: Stats & Knowledge Tree */}
        <div className="p-col-right">
          
          {/* Top Stats Bar */}
          <div className="stats-grid" style={{ padding: 0, marginBottom: '8px' }}>
            <div className="stat-box">
              <div className="sb-lbl">GLOBAL RATING</div>
              <div className="sb-val" style={{ color: 'var(--yellow)' }}>{profileData.globalRating}</div>
            </div>
            <div className="stat-box">
              <div className="sb-lbl">BATTLES</div>
              <div className="sb-val" style={{ color: 'var(--white)' }}>{profileData.battles}</div>
            </div>
            <div className="stat-box">
              <div className="sb-lbl">VICTORIES</div>
              <div className="sb-val" style={{ color: 'var(--green)' }}>{profileData.wins}</div>
            </div>
          </div>

          {/* Knowledge Tree Module */}
          <KnowledgeTree subjects={profileData.subjects} />

        </div>
      </div>
    </div>
  );
}