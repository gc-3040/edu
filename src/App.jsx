import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabaseClient'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import StorySection from './components/StorySection'
import ClubsSection from './components/ClubsSection'
import MissionSection from './components/MissionSection'
import ApplySection from './components/ApplySection'
import CommunitySection from './components/CommunitySection'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'

function App() {
  useScrollReveal();
  const [selectedClass, setSelectedClass] = useState('');
  const [view, setView] = useState('landing'); // 'landing' | 'community'
  const [user, setUser] = useState(null);

  // Supabase 인증 상태 모니터링
  useEffect(() => {
    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 상태 변화 리스너 등록
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setView('landing');
    } catch (err) {
      console.error('Error logging out:', err.message);
    }
  };

  return (
    <div className="app">
      <Header view={view} setView={setView} user={user} onLogout={handleLogout} />
      <main style={{ paddingTop: '80px' }}> {/* 헤더 높이만큼 여백 확보 */}
        {view === 'landing' ? (
          <>
            <HeroSection />
            <StatsSection />
            <div className="reveal-on-scroll">
              <StorySection />
            </div>
            <div className="reveal-on-scroll">
              <ClubsSection onSelectClass={setSelectedClass} />
            </div>
            <div className="reveal-on-scroll">
              <MissionSection />
            </div>
            <div className="reveal-on-scroll">
              <ApplySection selectedClass={selectedClass} setSelectedClass={setSelectedClass} />
            </div>
          </>
        ) : (
          <CommunitySection user={user} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
