export default function HeroSection() {
  const scrollToApply = () => {
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container animate-fade-in-up">
        <span className="hero-subtitle">나를 위한 즐거운 변화</span>
        <h1 className="hero-title">
          옆집선생과<br className="mobile-only" /> 함께하는<br /> 배움의 길목
        </h1>
        <p className="hero-desc">
          혼자가 아닌 함께라서<br className="mobile-only" /> 더 행복한 공간.<br />
          이웃의 재능이 모여<br className="mobile-only" /> 우리의 일상을 바꿉니다.
        </p>
        <button className="btn-primary delay-200" onClick={scrollToApply}>
          지금 바로 참여하기
        </button>
      </div>
    </section>
  );
}
