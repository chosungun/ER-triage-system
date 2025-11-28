// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  ClipboardList, 
  HelpCircle,
  Globe,
  Settings,
  User,
  ChevronDown
} from "lucide-react";
import "./Navbar.css";

// 로고 이미지 import
import remLogo from "../../assets/rem_logo.png";

function Navbar() {
  const [language, setLanguage] = useState("KO");
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(prev => prev === "KO" ? "EN" : "KO");
  };

  const navItems = [
    { path: "/", label: "Triage Board" },
    { path: "/followup", label: "Follow-up" },
    { path: "/viewer", label: "Viewer" },
    { path: "/tour", label: "Product Tour" },
  ];

  return (
    <header className="navbar">
      {/* 왼쪽: 로고 + 서브텍스트 */}
      <div className="navbar__left">
        <NavLink to="/" className="navbar__brand">
          <img src={remLogo} alt="REM Logo" className="navbar__logo-image" />
          <div className="navbar__brand-info">
            <span className="navbar__brand-name">REM</span>
            <span className="navbar__brand-sub">X-ray Triage Assist</span>
          </div>
        </NavLink>
      </div>

      {/* 가운데: 네비게이션 메뉴 */}
      <nav className="navbar__center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`navbar__nav-item ${isActive ? "active" : ""}`}
            >
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* 오른쪽: 언어 | 설정 | 프로필 */}
      <div className="navbar__right">
        {/* 언어 토글 */}
        <button className="navbar__lang-btn" onClick={toggleLanguage}>
          <Globe size={16} />
          <span>{language}</span>
        </button>

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