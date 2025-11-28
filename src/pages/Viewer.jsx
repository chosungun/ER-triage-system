// src/pages/Viewer.jsx
import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Move,
  RotateCw,
  Layers,
  Eye,
  EyeOff,
  MessageSquare,
  AlertTriangle,
  Check,
  Sun,
  Contrast,
  Maximize2
} from "lucide-react";
import "./Viewer.css";

function Viewer() {
  // 히트맵 컨트롤 상태
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(50);
  const [lesionFilters, setLesionFilters] = useState({
    nodule: true,
    effusion: false,
    pneumonia: true,
    cardiomegaly: false,
    atelectasis: false
  });

  // 피드백 상태
  const [helpfulness, setHelpfulness] = useState(4);
  const [feedbackChecks, setFeedbackChecks] = useState({
    wrongLocation: false,
    missingLesion: false,
    tooSensitive: false,
    hardToRead: false,
    other: false
  });
  const [feedbackText, setFeedbackText] = useState("");

  // 뷰어 도구 상태
  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [displayMode, setDisplayMode] = useState("heatmap");

  const toggleLesionFilter = (filter) => {
    setLesionFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const toggleFeedbackCheck = (check) => {
    setFeedbackChecks(prev => ({
      ...prev,
      [check]: !prev[check]
    }));
  };

  return (
    <main className="viewer-page">
      {/* 좌측: 메인 X-ray 뷰어 */}
      <section className="viewer-main">
        {/* 뷰어 툴바 */}
        <div className="viewer-toolbar">
          <div className="toolbar-group">
            <button className="toolbar-btn" title="Zoom In" onClick={() => setZoom(prev => Math.min(prev + 10, 200))}>
              <ZoomIn size={18} />
            </button>
            <button className="toolbar-btn" title="Zoom Out" onClick={() => setZoom(prev => Math.max(prev - 10, 50))}>
              <ZoomOut size={18} />
            </button>
            <span className="toolbar-value">{zoom}%</span>
          </div>

          <div className="toolbar-divider" />

          <div className="toolbar-group">
            <button className="toolbar-btn" title="Pan">
              <Move size={18} />
            </button>
            <button className="toolbar-btn" title="Rotate">
              <RotateCw size={18} />
            </button>
            <button className="toolbar-btn" title="Fullscreen">
              <Maximize2 size={18} />
            </button>
          </div>

          <div className="toolbar-divider" />

          <div className="toolbar-group">
            <Sun size={16} className="toolbar-icon" />
            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="toolbar-slider"
              title="Brightness"
            />
            <span className="toolbar-value">{brightness}%</span>
          </div>

          <div className="toolbar-group">
            <Contrast size={16} className="toolbar-icon" />
            <input
              type="range"
              min="50"
              max="150"
              value={contrast}
              onChange={(e) => setContrast(e.target.value)}
              className="toolbar-slider"
              title="Contrast"
            />
            <span className="toolbar-value">{contrast}%</span>
          </div>

          <div className="toolbar-divider" />

          <div className="toolbar-group">
            <button
              className={`toolbar-btn mode-btn ${displayMode === 'original' ? 'active' : ''}`}
              onClick={() => setDisplayMode('original')}
            >
              Original
            </button>
            <button
              className={`toolbar-btn mode-btn ${displayMode === 'heatmap' ? 'active' : ''}`}
              onClick={() => setDisplayMode('heatmap')}
            >
              Heatmap
            </button>
            <button
              className={`toolbar-btn mode-btn ${displayMode === 'overlay' ? 'active' : ''}`}
              onClick={() => setDisplayMode('overlay')}
            >
              Multi-overlay
            </button>
          </div>
        </div>

        {/* X-ray 이미지 영역 */}
        <div className="viewer-canvas">
          <div
            className="xray-display"
            style={{
              transform: `scale(${zoom / 100})`,
              filter: `brightness(${brightness}%) contrast(${contrast}%)`
            }}
          >
            <div className="xray-placeholder">
              <Layers size={64} strokeWidth={1} />
              <p>X-ray Image</p>
              <span>Drop image or select from Triage Board</span>
            </div>

            {/* 히트맵 오버레이 (시뮬레이션) */}
            {showHeatmap && displayMode !== 'original' && (
              <div
                className="heatmap-overlay"
                style={{ opacity: heatmapOpacity / 100 }}
              >
                <div className="heatmap-spot spot-1" />
                <div className="heatmap-spot spot-2" />
              </div>
            )}
          </div>
        </div>

        {/* 메타 정보 바 */}
        <div className="viewer-meta">
          <div className="meta-item">
            <span className="meta-label">Patient ID</span>
            <span className="meta-value">P-2024-001</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Study Date</span>
            <span className="meta-value">2024-11-29 09:15</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Modality</span>
            <span className="meta-value">CR</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">View</span>
            <span className="meta-value">PA</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Image Size</span>
            <span className="meta-value">2048 x 2048</span>
          </div>
        </div>
      </section>

      {/* 우측: AI Assist Sidebar */}
      <aside className="viewer-sidebar">
        {/* 1) Heatmap Controls */}
        <div className="sidebar-section">
          <div className="section-header">
            <div className="section-title">
              <Layers size={18} />
              <span>Heatmap Controls</span>
            </div>
          </div>

          <div className="section-content">
            {/* Show Heatmap Toggle */}
            <div className="control-row">
              <span className="control-label">Show Heatmap</span>
              <button
                className={`toggle-btn ${showHeatmap ? 'active' : ''}`}
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                {showHeatmap ? <Eye size={16} /> : <EyeOff size={16} />}
                <span>{showHeatmap ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Opacity Slider */}
            <div className="control-row column">
              <div className="control-row-header">
                <span className="control-label">Opacity</span>
                <span className="control-value">{heatmapOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={heatmapOpacity}
                onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                className="slider"
                disabled={!showHeatmap}
              />
            </div>

            {/* Lesion Type Filters */}
            <div className="control-row column">
              <span className="control-label">Lesion Type Filters</span>
              <div className="checkbox-group">
                {Object.entries(lesionFilters).map(([key, value]) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => toggleLesionFilter(key)}
                      disabled={!showHeatmap}
                    />
                    <span className="checkbox-custom">
                      {value && <Check size={12} />}
                    </span>
                    <span className="checkbox-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2) Feedback on AI */}
        <div className="sidebar-section">
          <div className="section-header">
            <div className="section-title">
              <MessageSquare size={18} />
              <span>Feedback on AI</span>
            </div>
          </div>

          <div className="section-content">
            {/* Helpfulness Slider */}
            <div className="control-row column">
              <div className="control-row-header">
                <span className="control-label">Helpfulness</span>
                <span className="control-value">{helpfulness}/5</span>
              </div>
              <div className="rating-slider">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    className={`rating-btn ${helpfulness >= level ? 'active' : ''}`}
                    onClick={() => setHelpfulness(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Checkboxes */}
            <div className="control-row column">
              <span className="control-label">Issues</span>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={feedbackChecks.wrongLocation}
                    onChange={() => toggleFeedbackCheck('wrongLocation')}
                  />
                  <span className="checkbox-custom">
                    {feedbackChecks.wrongLocation && <Check size={12} />}
                  </span>
                  <span className="checkbox-label">Wrong location</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={feedbackChecks.missingLesion}
                    onChange={() => toggleFeedbackCheck('missingLesion')}
                  />
                  <span className="checkbox-custom">
                    {feedbackChecks.missingLesion && <Check size={12} />}
                  </span>
                  <span className="checkbox-label">Missing lesion</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={feedbackChecks.tooSensitive}
                    onChange={() => toggleFeedbackCheck('tooSensitive')}
                  />
                  <span className="checkbox-custom">
                    {feedbackChecks.tooSensitive && <Check size={12} />}
                  </span>
                  <span className="checkbox-label">Too sensitive</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={feedbackChecks.hardToRead}
                    onChange={() => toggleFeedbackCheck('hardToRead')}
                  />
                  <span className="checkbox-custom">
                    {feedbackChecks.hardToRead && <Check size={12} />}
                  </span>
                  <span className="checkbox-label">Hard to read</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={feedbackChecks.other}
                    onChange={() => toggleFeedbackCheck('other')}
                  />
                  <span className="checkbox-custom">
                    {feedbackChecks.other && <Check size={12} />}
                  </span>
                  <span className="checkbox-label">Other</span>
                </label>
              </div>
            </div>

            {/* Free Text Input */}
            <div className="control-row column">
              <span className="control-label">Additional Comments</span>
              <textarea
                className="feedback-textarea"
                placeholder="Enter your feedback..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={3}
              />
            </div>

            <button className="submit-feedback-btn">
              Submit Feedback
            </button>
          </div>
        </div>

        {/* 하단 주의 문구 */}
        <div className="sidebar-disclaimer">
          <AlertTriangle size={16} />
          <p>
            REM XTA is a demo and assistive-only AI. It must not be used for clinical diagnosis.
          </p>
        </div>
      </aside>
    </main>
  );
}

export default Viewer;