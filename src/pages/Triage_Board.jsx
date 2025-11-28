// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Triage_Board.css";

function Triage_Board() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🏥 Medical AI Prototype</div>
          <h1 className="hero-title">
            <span className="hero-title-main">REM</span>
            <span className="hero-title-sub">Real-time Emergency Monitor</span>
          </h1>
          <p className="hero-description">
            XTA (X-ray Triage Assist)로 응급 현장의 흉부 X-ray를 
            빠르고 직관적으로 분석하는 의료 AI 프로토타입입니다.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="hero-button primary">
              Dashboard 시작하기
            </Link>
            <Link to="/about" className="hero-button secondary">
              자세히 알아보기
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-icon">🩻</span>
              <span className="hero-card-title">AI Analysis</span>
            </div>
            <div className="hero-card-body">
              <div className="analysis-preview">
                <div className="analysis-bar">
                  <div className="analysis-fill" style={{ width: "85%" }} />
                </div>
                <span className="analysis-label">Pneumonia Detection</span>
              </div>
              <div className="analysis-preview">
                <div className="analysis-bar">
                  <div className="analysis-fill warning" style={{ width: "62%" }} />
                </div>
                <span className="analysis-label">Cardiomegaly Check</span>
              </div>
              <div className="analysis-preview">
                <div className="analysis-bar">
                  <div className="analysis-fill success" style={{ width: "95%" }} />
                </div>
                <span className="analysis-label">Image Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">주요 기능</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>실시간 분석</h3>
            <p>X-ray 업로드 즉시 AI가 분석을 시작하여 빠른 결과를 제공합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>위험도 분류</h3>
            <p>환자의 상태를 자동으로 분류하여 응급 환자를 우선 식별합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>대시보드</h3>
            <p>직관적인 인터페이스로 환자 현황을 한눈에 파악할 수 있습니다.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Triage_Board;