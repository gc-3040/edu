import { BookOpen, Users, GraduationCap, Heart } from 'lucide-react';

export default function MissionSection() {
  const steps = [
    {
      number: "01",
      title: "재능기부 강사 참여",
      desc: "내가 가진 작은 지식도 누군가에겐 큰 도움이 됩니다",
      icon: <BookOpen size={24} />
    },
    {
      number: "02",
      title: "동아리 기획 및 활동",
      desc: "이웃의 니즈에 맞는 실용적인 클래스를 함께 엽니다",
      icon: <Users size={24} />
    },
    {
      number: "03",
      title: "즐거운 성장",
      desc: "혼자가 아닌 함께라서 즐거운 배움의 시간을 가집니다",
      icon: <Heart size={24} />
    },
    {
      number: "04",
      title: "선생님으로 전환",
      desc: "배움을 얻은 이웃이 다시 새로운 것을 가르칩니다",
      icon: <GraduationCap size={24} />
    }
  ];

  return (
    <section id="mission" className="section mission">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">재능기부 선순환 모델</h2>
          <p className="section-subtitle">배운 사람이 다시 가르치는 따뜻한 구조</p>
        </div>
        
        <div className="mission-steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">
                {step.icon}
              </div>
              <h4 style={{ color: 'var(--color-primary)', fontWeight: '800', marginBottom: '8px' }}>{step.number}</h4>
              <h3 className="step-title">{step.title}</h3>
              <p className="story-card-desc" style={{marginTop: '12px'}}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
