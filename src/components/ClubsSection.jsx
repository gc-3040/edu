import { Music, Palette, Sparkles, Heart, Bot } from 'lucide-react';

export default function ClubsSection({ onSelectClass }) {
  const clubs = [
    {
      icon: <Music size={48} strokeWidth={1} />,
      title: "노래교실",
      desc: "지친 일상에 활력을 불어넣는 즐거운 노래와 음악의 시간입니다."
    },
    {
      icon: <Palette size={48} strokeWidth={1} />,
      title: "손재주",
      desc: "함께 만들며 배우는 즐거움, 나만의 작품을 완성하는 성취감을 느낍니다."
    },
    {
      icon: <Sparkles size={48} strokeWidth={1} />,
      title: "색채힐링",
      desc: "다채로운 색깔을 통해 마음을 치유하고 정서적 안정을 찾는 힐링 시간입니다."
    },
    {
      icon: <Heart size={48} strokeWidth={1} />,
      title: "건강마스터",
      desc: "백세 시대를 위한 올바른 건강 지식과 생활 습관을 함께 배워나갑니다."
    },
    {
      icon: <Bot size={48} strokeWidth={1} />,
      title: "AI",
      desc: "인공지능과 디지털 기술을 쉽고 재미있게 배우며 미래를 준비합니다."
    }
  ];

  const handleCardClick = (title) => {
    if (onSelectClass) {
      onSelectClass(title);
    }
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="clubs" className="section clubs">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">길목 커뮤니티 프로그램</h2>
          <p className="section-subtitle">5가지 다양한 프로그램을 통해 일상의 활력을 찾아보세요</p>
        </div>
        
        <div className="clubs-grid">
          {clubs.map((club, index) => (
            <div key={index} className="club-card" onClick={() => handleCardClick(club.title)}>
              <div className="club-icon">{club.icon}</div>
              <h3 className="club-title">{club.title}</h3>
              <p className="club-desc">{club.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
