export default function Header() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="옆집선생 길목 커뮤니티" />
        </a>
        <nav className="nav-links">
          <button className="nav-link" onClick={() => scrollTo('story')}>소개</button>
          <button className="nav-link" onClick={() => scrollTo('clubs')}>동아리</button>
          <button className="nav-link" onClick={() => scrollTo('mission')}>우리의 미션</button>
          <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '1rem', borderRadius: '4px' }} onClick={() => scrollTo('apply')}>참여하기</button>
        </nav>
      </div>
    </header>
  );
}
