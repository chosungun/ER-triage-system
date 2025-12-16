// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  HelpCircle,
  Globe,
  Settings,
  User,
  ChevronDown,
  ArrowLeft,
  LayoutDashboard
} from "lucide-react";
import "./Navbar.css";

// 로고 이미지 import
import remLogo from "../../assets/rem_logo.png";

function Navbar() {
  const [language, setLanguage] = useState("KO");
  const location = useLocation();
  const navigate = useNavigate();
  
  // 대시보드(/) 페이지인지 확인
  const isDashboard = location.pathname === "/";

  const toggleLanguage = () => {
    setLanguage(prev => prev === "KO" ? "EN" : "KO");
  };

  return (
    <header className="navbar">
      {/* 왼쪽: 아이콘 + 로고 + 서브텍스트 */}
      <div className="navbar__left">
        {isDashboard ? (
          <div className="navbar__home-btn">
            <LayoutDashboard size={18} />
          </div>
        ) : (
          <button
            type="button"
            className="navbar__back-btn"
            title="Back"
            onClick={() => {
              // Go back in browser history; if there's no history entry, fallback to dashboard
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
          >
            <ArrowLeft size={18} />
          </button>
        )}
        
        <div className="navbar__brand">
          <img src={remLogo} alt="REM Logo" className="navbar__logo-image" />
          <div className="navbar__brand-info">
            <span className="navbar__brand-name">REM</span>
            <span className="navbar__brand-sub">X-ray Triage Assist</span>
          </div>
        </div>
      </div>

      {/* 오른쪽: 언어 | 도움말 | 설정 | 프로필 */}
      <div className="navbar__right">
        {/* 언어 토글 */}
        <button className="navbar__lang-btn" onClick={toggleLanguage}>
          <Globe size={16} />
          <span>{language}</span>
        </button>

        <div className="navbar__divider" />

        {/* Product Tour 도움말 버튼 */}
        <NavLink to="/tour" className="navbar__icon-btn" title="Product Tour">
          <HelpCircle size={18} />
        </NavLink>

        <div className="navbar__divider" />

        {/* 설정 */}
        <NavLink to="/setting" className="navbar__icon-btn" title="Settings">
          <Settings size={18} />
        </NavLink>

        <div className="navbar__divider" />

        {/* 프로필 */}
        <NavLink to="/profile" className="navbar__profile-btn">
          <div className="navbar__avatar">
            <User size={16} />
          </div>
          <span className="navbar__profile-name">Demo Profile</span>
          <ChevronDown size={14} />
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;