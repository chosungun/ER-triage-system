// src/pages/Setting.jsx
import React, { useState } from "react";
import {
  Settings,
  Globe,
  Sliders,
  Eye,
  Monitor,
  RotateCcw,
  Check,
  ChevronDown
} from "lucide-react";
import "./Setting.css";

function Setting() {
  // 설정 상태 관리
  const [language, setLanguage] = useState("ko");
  const [aiThreshold, setAiThreshold] = useState(50);
  const [heatmapOpacity, setHeatmapOpacity] = useState(70);
  const [viewerMode, setViewerMode] = useState("original");

  // 기본값으로 리셋
  const resetToDefault = () => {
    setLanguage("ko");
    setAiThreshold(50);
    setHeatmapOpacity(70);
    setViewerMode("original");
  };

  // Viewer 모드 옵션
  const viewerModes = [
    { value: "original", label: "Original" },
    { value: "heatmap", label: "Heatmap" },
    { value: "multi-overlay", label: "Multi-overlay" }
  ];

  return (
    <main className="setting-page">
      <div className="setting-container">
        {/* 헤더 */}
        <div className="setting-header">
          <div className="setting-header-icon">
            <Settings size={24} />
          </div>
          <div className="setting-header-text">
            <h1>Settings</h1>
            <p>시스템 설정을 조절하세요</p>
          </div>
        </div>

        {/* 설정 그리드 */}
        <div className="setting-grid">
          {/* Language 설정 */}
          <div className="setting-card">
            <div className="setting-card-header">
              <Globe size={20} />
              <span>Language</span>
            </div>
            <div className="setting-card-body">
              <p className="setting-description">인터페이스 언어를 선택하세요</p>
              <div className="language-toggle">
                <button
                  className={`lang-btn ${language === "en" ? "active" : ""}`}
                  onClick={() => setLanguage("en")}
                >
                  {language === "en" && <Check size={14} />}
                  English
                </button>
                <button
                  className={`lang-btn ${language === "ko" ? "active" : ""}`}
                  onClick={() => setLanguage("ko")}
                >
                  {language === "ko" && <Check size={14} />}
                  한국어
                </button>
              </div>
            </div>
          </div>

          {/* AI Threshold 설정 */}
          <div className="setting-card">
            <div className="setting-card-header">
              <Sliders size={20} />
              <span>AI Threshold</span>
            </div>
            <div className="setting-card-body">
              <p className="setting-description">AI 탐지 민감도를 조절하세요</p>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiThreshold}
                  onChange={(e) => setAiThreshold(Number(e.target.value))}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>Low</span>
                  <span className="slider-value">{aiThreshold}%</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Heatmap Opacity 설정 */}
          <div className="setting-card">
            <div className="setting-card-header">
              <Eye size={20} />
              <span>Default Heatmap Opacity</span>
            </div>
            <div className="setting-card-body">
              <p className="setting-description">히트맵 기본 투명도를 설정하세요</p>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>0%</span>
                  <span className="slider-value">{heatmapOpacity}%</span>
                  <span>100%</span>
                </div>
              </div>
              {/* 히트맵 프리뷰 */}
              <div className="opacity-preview">
                <div
                  className="opacity-preview-bar"
                  style={{ opacity: heatmapOpacity / 100 }}
                />
              </div>
            </div>
          </div>

          {/* Default Viewer Mode 설정 */}
          <div className="setting-card">
            <div className="setting-card-header">
              <Monitor size={20} />
              <span>Default Viewer Mode</span>
            </div>
            <div className="setting-card-body">
              <p className="setting-description">기본 뷰어 표시 모드를 선택하세요</p>
              <div className="mode-selector">
                {viewerModes.map((mode) => (
                  <button
                    key={mode.value}
                    className={`mode-btn ${viewerMode === mode.value ? "active" : ""}`}
                    onClick={() => setViewerMode(mode.value)}
                  >
                    {viewerMode === mode.value && <Check size={14} />}
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 액션 영역 */}
        <div className="setting-footer">
          <div className="current-settings">
            <span className="settings-summary">
              현재 설정: {language === "ko" ? "한국어" : "English"} / 
              Threshold {aiThreshold}% / 
              Opacity {heatmapOpacity}% / 
              {viewerModes.find(m => m.value === viewerMode)?.label}
            </span>
          </div>
          <button className="reset-btn" onClick={resetToDefault}>
            <RotateCcw size={16} />
            Reset to Default
          </button>
        </div>
      </div>
    </main>
  );
}

export default Setting;