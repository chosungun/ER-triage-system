// src/pages/About.jsx
import React from "react";
import "./Viewer.css";

function Viewer() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>About REM & XTA</h1>
        <p className="about-subtitle">
          응급 의료 현장을 위한 AI 기반 흉부 X-ray 분석 시스템
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <div className="about-card-icon">🎯</div>
          <h2>프로젝트 목표</h2>
          <p>
            REM(Real-time Emergency Monitor)은 응급실에서의 흉부 X-ray 판독을
            보조하기 위한 의료 AI 프로젝트입니다. XTA(X-ray Triage Assist)는
            흉부 X-ray 이미지 기반으로 위험 환자를 우선 분류하는 기능을 목표로 합니다.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">⚙️</div>
          <h2>핵심 기술</h2>
          <ul className="tech-list">
            <li>
              <span className="tech-badge">AI</span>
              딥러닝 기반 흉부 X-ray 분석
            </li>
            <li>
              <span className="tech-badge">React</span>
              모던 프론트엔드 인터페이스
            </li>
            <li>
              <span className="tech-badge">UI/UX</span>
              의료 전문가를 위한 Flat Clinical UI
            </li>
          </ul>
        </div>

        <div className="about-card">
          <div className="about-card-icon">📋</div>
          <h2>주요 기능</h2>
          <ul className="feature-list">
            <li>실시간 X-ray 이미지 분석</li>
            <li>AI 기반 위험도 자동 분류</li>
            <li>환자 우선순위 자동 정렬</li>
            <li>직관적인 대시보드 인터페이스</li>
            <li>상세 분석 결과 및 권장 조치 제공</li>
          </ul>
        </div>

        <div className="about-card disclaimer">
          <div className="about-card-icon">⚠️</div>
          <h2>면책 조항</h2>
          <p>
            본 프로젝트는 <strong>교육 및 연구 목적의 프로토타입</strong>입니다.
            실제 의료 진단이나 치료 결정에 사용해서는 안 됩니다.
            모든 의료적 판단은 반드시 자격을 갖춘 의료 전문가가 수행해야 합니다.
          </p>
        </div>
      </section>

      <section className="about-footer">
        <p>REM XTA Prototype © 2024</p>
        <p className="about-version">Version 0.1.0 - Development Build</p>
      </section>
    </main>
  );
}

export default Viewer;