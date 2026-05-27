export default function Header({ view, setView, user, onLogout }) {
  const handleNavClick = (id) => {
    if (view !== 'landing') {
      setView('landing');
      // Wait for DOM to render the landing view before scrolling
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getProfileName = () => {
    if (!user) return '';
    return user.user_metadata?.user_name || user.user_metadata?.full_name || user.email?.split('@')[0] || '사용자';
  };

  const getAvatarUrl = () => {
    return user?.user_metadata?.avatar_url || '';
  };

  return (
    <header className="header">
      <div className="container header-content">
        <a href="#" className="logo" onClick={(e) => { 
          e.preventDefault(); 
          setView('landing');
          window.scrollTo({top:0, behavior:'smooth'}); 
        }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="옆집선생 길목 커뮤니티" />
        </a>
        <nav className="nav-links">
          <button className={`nav-link ${view === 'landing' ? 'active' : ''}`} onClick={() => setView('landing')}>홈</button>
          <button className="nav-link" onClick={() => handleNavClick('story')}>소개</button>
          <button className="nav-link" onClick={() => handleNavClick('clubs')}>동아리</button>
          <button className={`nav-link ${view === 'community' ? 'active' : ''}`} onClick={() => setView('community')}>커뮤니티</button>
          
          {user ? (
            <div className="user-profile-header">
              {getAvatarUrl() && (
                <img src={getAvatarUrl()} alt={getProfileName()} className="user-avatar-small" />
              )}
              <span className="user-name-small">{getProfileName()}님</span>
              <button className="btn-secondary-sm" onClick={onLogout}>로그아웃</button>
            </div>
          ) : (
            <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '1rem', borderRadius: '4px' }} onClick={() => setView('community')}>
              로그인
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
