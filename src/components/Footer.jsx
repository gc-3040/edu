import { MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); }}>
              <img src={`${import.meta.env.BASE_URL}logo_footer.png`} alt="옆집선생 길목 커뮤니티" style={{ height: '90px', width: 'auto' }} />
            </a>
            <p className="footer-desc">
              혼자가 아닌 함께라서 더 행복한 배움의 공간.<br/>
              누구나 가르치고 배울 수 있는 마을 커뮤니티입니다.
            </p>
          </div>
          
          <div className="footer-info">
            <h4>연락처 및 오시는 길</h4>
            <div className="info-item">
              <MapPin size={20} className="info-icon" />
              <div>
                <strong>위치</strong><br/>
                사당역 부근
              </div>
            </div>
            <div className="info-item">
              <Phone size={20} className="info-icon" />
              <div>
                <strong>문의</strong><br/>
                010-4460-3529 (홍보팀장)
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} 옆집선생 길목 커뮤니티. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
