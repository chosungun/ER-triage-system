// src/pages/ProductTour.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  Activity,
  AlertTriangle,
  Clock,
  LayoutGrid,
  History,
  Maximize2,
  Shield,
  Lock,
  Users,
  ArrowRight,
  Zap,
  Heart,
  Eye,
  Brain,
  CheckCircle
} from "lucide-react";
import "./ProductTour.css";

function ProductTour() {
  return (
    <main className="tour-page">
      {/* Hero Section */}
      <section className="tour-hero">
        <div className="hero-background">
          <div className="hero-grid-pattern" />
          <div className="hero-glow" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Activity size={14} />
            <span>Medical AI Prototype</span>
          </div>
          <h1 className="hero-title">
            <span className="title-main">REM XTA</span>
            <span className="title-sub">Real-time Emergency Monitor</span>
          </h1>
          <p className="hero-subtitle">X-ray Triage Assist for ER workflow</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="tour-content-grid">
        {/* Section 1: Why REM? */}
        <section className="tour-section why-section">
          <div className="section-header">
            <div className="section-icon">
              <AlertTriangle size={20} />
            </div>
            <h2>Why REM?</h2>
          </div>
          <div className="why-cards">
            <div className="why-card">
              <Clock size={24} />
              <h3>응급실 병목 문제</h3>
              <p>X-ray 판독 대기로 인한 진료 지연이 응급실 효율을 저하시킵니다.</p>
            </div>
            <div className="why-card">
              <AlertTriangle size={24} />
              <h3>지연된 판독의 위험</h3>
              <p>늦은 진단은 치료 골든타임을 놓치게 하여 환자 예후에 영향을 줍니다.</p>
            </div>
            <div className="why-card">
              <Zap size={24} />
              <h3>빠른 선별의 필요성</h3>
              <p>AI 기반 자동 분류로 위급 환자를 즉시 식별하여 우선 처치합니다.</p>
            </div>
          </div>
        </section>

        {/* Section 2: XTA Core Features */}
        <section className="tour-section features-section">
          <div className="section-header">
            <div className="section-icon">
              <Brain size={20} />
            </div>
            <h2>XTA Core Features</h2>
          </div>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <LayoutGrid size={20} />
              </div>
              <div className="feature-content">
                <h3>Real-time Triage Board</h3>
                <p>AI가 분석한 환자를 위험도순으로 자동 정렬</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <History size={20} />
              </div>
              <div className="feature-content">
                <h3>AI-driven Follow-up Timeline</h3>
                <p>과거 X-ray와 비교하여 병변 변화 추적</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Maximize2 size={20} />
              </div>
              <div className="feature-content">
                <h3>Full-screen Viewer + Heatmap</h3>
                <p>고해상도 이미지와 AI 히트맵 오버레이</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: AI Safety */}
        <section className="tour-section safety-section">
          <div className="section-header">
            <div className="section-icon">
              <Shield size={20} />
            </div>
            <h2>AI Safety</h2>
          </div>
          <div className="safety-grid">
            <div className="safety-item">
              <Eye size={18} />
              <span>Assistive Only</span>
              <p>진단 보조 목적으로만 사용</p>
            </div>
            <div className="safety-item">
              <Lock size={18} />
              <span>Data Privacy</span>
              <p>환자 데이터 익명화 처리</p>
            </div>
            <div className="safety-item">
              <Users size={18} />
              <span>Human-in-the-loop</span>
              <p>최종 판단은 의료진이 수행</p>
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action */}
        <section className="tour-section cta-section">
          <div className="cta-content">
            <div className="cta-text">
              <Heart size={20} />
              <h2>Start Demo</h2>
              <p>REM XTA의 기능을 직접 체험해보세요</p>
            </div>
            <div className="cta-buttons">
              <Link to="/" className="cta-btn primary">
                <LayoutGrid size={18} />
                <span>Open Triage Board</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/followup" className="cta-btn secondary">
                <span>Try Follow-up</span>
              </Link>
            </div>
          </div>
          <div className="cta-notice">
            <CheckCircle size={14} />
            <span>Demo 버전입니다. 실제 의료 진단에 사용하지 마세요.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductTour;