export default function StatsSection() {
  const stats = [
    { number: "1,000+", label: "누적 수강생" },
    { number: "50+", label: "재능기부 강사" },
    { number: "5개", label: "운영 동아리" },
    { number: "2026", label: "설립 연도" }
  ];

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item reveal-on-scroll">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
