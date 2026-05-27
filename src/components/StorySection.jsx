import { Lightbulb, Users, Gift } from 'lucide-react';

export default function StorySection() {
  const stories = [
    {
      icon: <Lightbulb size={32} strokeWidth={1.5} />,
      title: "일상을 위한 배움",
      desc: "스마트폰, 금융, 법률 등 살면서 꼭 필요하지만 배울 기회가 없었던 것들을 쉽고 재미있게 가르칩니다."
    },
    {
      icon: <Users size={32} strokeWidth={1.5} />,
      title: "함께하는 가치",
      desc: "소외 계층부터 직장인, 중장년층까지 문턱 없는 배움으로 누구나 쉽게 접근할 수 있습니다."
    },
    {
      icon: <Gift size={32} strokeWidth={1.5} />,
      title: "나눔의 실천",
      desc: "받은 배움을 다시 이웃에게 나누며 세상에 돌려주는 따뜻한 문화를 만들어갑니다."
    }
  ];

  return (
    <section id="story" className="section story">
      <div className="container">
        <div className="story-grid">
          <div className="story-image reveal-on-scroll"></div>
          <div className="story-content reveal-on-scroll">
            <span className="story-badge">ABOUT GIL-MOK</span>
            <h2 className="story-title">
              아무도 가르쳐주지 않았던,<br/>
              <span className="story-highlight">우리 삶에 진짜 필요한 것들</span>
            </h2>
            <p className="story-text">
              우리는 성인이 된 이후에도 끊임없이 배웁니다. 하지만 정작 우리 삶을 풍요롭게 만드는 지혜와 기술은 어디서 배워야 할까요? 
              '옆집선생 길목 커뮤니티'는 바로 그 지점에서 시작되었습니다.
            </p>
            <div className="story-cards">
              {stories.map((story, index) => (
                <div key={index} className="story-card">
                  <div className="story-card-icon">{story.icon}</div>
                  <h3 className="story-card-title">{story.title}</h3>
                  <p className="story-card-desc">{story.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
