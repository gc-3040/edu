import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import StorySection from './components/StorySection'
import ClubsSection from './components/ClubsSection'
import MissionSection from './components/MissionSection'
import ApplySection from './components/ApplySection'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'

function App() {
  useScrollReveal();
  const [selectedClass, setSelectedClass] = useState('');
  
  return (
    <div className="app">
      <Header />
      <main>
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
      </main>
      <Footer />
    </div>
  )
}

export default App
