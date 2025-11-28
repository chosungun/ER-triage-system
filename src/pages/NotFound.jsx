// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Cpu, 
  Radio,
  Zap,
  Terminal
} from "lucide-react";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="notfound-page">
      {/* 배경 그리드 패턴 */}
      <div className="cyber-grid" />
      
      {/* 메인 컨테이너 */}
      <div className="notfound-container">
        {/* 상단 스캔라인 장식 */}
        <div className="scanline-top">
          <div className="scan-dot" />
          <div className="scan-line" />
          <div className="scan-dot" />
        </div>

        {/* 에러 코드 디스플레이 */}
        <div className="error-display">
          <div className="error-bracket">[</div>
          <div className="error-code">
            <span className="error-prefix">ERR</span>
            <span className="error-number">404</span>
          </div>
          <div className="error-bracket">]</div>
        </div>

        {/* 귀여운 로봇 아이콘 */}
        <div className="robot-container">
          <div className="robot-head">
            <div className="robot-antenna">
              <Radio size={16} />
            </div>
            <div className="robot-face">
              <div className="robot-eye left">
                <Zap size={14} />
              </div>
              <div className="robot-eye right">
                <Zap size={14} />
              </div>
            </div>
            <div className="robot-mouth">
              <Terminal size={18} />
            </div>
          </div>
          <div className="robot-body">
            <Cpu size={24} />
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="message-block">
          <div className="message-header">
            <AlertTriangle size={16} />
            <span>SIGNAL_LOST</span>
          </div>
          <h1 className="message-title">페이지를 찾을 수 없습니다</h1>
          <p className="message-desc">
            요청하신 경로가 REM 시스템에 등록되지 않았습니다.
            <br />
            올바른 주소인지 확인해주세요.
          </p>
        </div>

        {/* 시스템 상태 표시 */}
        <div className="status-panel">
          <div className="status-row">
            <span className="status-label">SYSTEM</span>
            <span className="status-value online">ONLINE</span>
          </div>
          <div className="status-row">
            <span className="status-label">REQUEST</span>
            <span className="status-value error">FAILED</span>
          </div>
          <div className="status-row">
            <span className="status-label">REDIRECT</span>
            <span className="status-value ready">READY</span>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="action-buttons">
          <Link to="/" className="cyber-btn primary">
            <Home size={18} />
            <span>홈으로 이동</span>
          </Link>
          <button onClick={() => window.history.back()} className="cyber-btn secondary">
            <ArrowLeft size={18} />
            <span>이전 페이지</span>
          </button>
        </div>

        {/* 하단 스캔라인 장식 */}
        <div className="scanline-bottom">
          <div className="scan-dot" />
          <div className="scan-line" />
          <div className="scan-dot" />
        </div>
      </div>

      {/* 코너 장식 */}
      <div className="corner-decor top-left" />
      <div className="corner-decor top-right" />
      <div className="corner-decor bottom-left" />
      <div className="corner-decor bottom-right" />
    </main>
  );
}

export default NotFound;