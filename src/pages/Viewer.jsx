// src/pages/Viewer.jsx
import React, { useState, useRef, useCallback } from "react";
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
  Maximize2,
  RotateCcw,
  User,
  Calendar,
  Activity,
  Scan
} from "lucide-react";
import "./Viewer.css";

// X-ray 이미지 임포트 (경로는 필요에 따라 수정하세요)
import xrayImage from "../assets/HQ_Original_Image_Pneumonia_191.jpg";
import heatmapImage from "../assets/HQ_Fusion_Result_Pneumonia_191.jpg";

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
  const [rotation, setRotation] = useState(0);

  // 드래그 (Pan) 상태
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

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

  // 회전 기능
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // 초기화 기능
  const handleReset = () => {
    setZoom(100);
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  // ===== 드래그 (Pan) 기능 =====
  // 마우스 다운 시 드래그 시작
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  }, [position]);

  // 마우스 이동 시 이미지 위치 업데이트
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    
    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  // 마우스 업 또는 영역 벗어날 시 드래그 종료
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <main className="viewer-page">
      {/* 좌측: 메인 X-ray 뷰어 */}
      <section className="viewer-main">
        {/* 뷰어 툴바 */}
        <div className="viewer-toolbar">
          <div className="toolbar-group">
            <button 
              className="toolbar-btn" 
              title="Zoom In" 
              onClick={() => setZoom(prev => Math.min(prev + 10, 200))}
            >
              <ZoomIn size={18} />
            </button>
            <button 
              className="toolbar-btn" 
              title="Zoom Out" 
              onClick={() => setZoom(prev => Math.max(prev - 10, 50))}
            >
              <ZoomOut size={18} />
            </button>
            <span className="toolbar-value">{zoom}%</span>
          </div>

          <div className="toolbar-divider" />

          <div className="toolbar-group">
            <button className="toolbar-btn" title="Pan (Drag to move)">
              <Move size={18} />
            </button>
            <button className="toolbar-btn" title="Rotate" onClick={handleRotate}>
              <RotateCw size={18} />
            </button>
            <button className="toolbar-btn" title="Reset" onClick={handleReset}>
              <RotateCcw size={18} />
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
              <Layers size={14} />
              Heatmap
            </button>
          </div>
        </div>

        {/* X-ray 디스플레이 영역 (드래그 가능) */}
        <div 
          className={`viewer-canvas ${isDragging ? 'is-dragging' : ''}`}
          ref={imageContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="xray-image-wrapper"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
              filter: `brightness(${brightness}%) contrast(${contrast}%)`
            }}
          >
            {/* X-ray 이미지 */}
            <div className="xray-image">
              <img src={xrayImage} alt="Chest X-ray" className="xray-img" />
            </div>

            {/* AI 히트맵 오버레이 */}
            {displayMode === 'heatmap' && showHeatmap && (
              <div 
                className="heatmap-overlay"
                style={{ opacity: heatmapOpacity / 100 }}
              >
                <img src={heatmapImage} alt="AI Heatmap" className="heatmap-img" />
              </div>
            )}
          </div>

          {/* 드래그 힌트 */}
          <div className="drag-hint">
            <Move size={14} />
            <span>Drag to pan</span>
          </div>
        </div>

        {/* 하단 메타 정보 - 한 줄 스타일 */}
        <div className="viewer-meta">
          <div className="meta-item">
            <User size={14} />
            <span className="meta-value">P-2024-0847</span>
            <span className="meta-divider">|</span>
            <span className="meta-sub">김영수 (M/67)</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span className="meta-value">2024-11-20</span>
            <span className="meta-sub">14:45</span>
          </div>
          <div className="meta-item">
            <Scan size={14} />
            <span className="meta-value">Chest PA</span>
          </div>
          <div className="meta-item highlight">
            <Activity size={14} />
            <span className="meta-label">AI Confidence</span>
            <span className="meta-value confidence">87%</span>
          </div>
        </div>
      </section>

      {/* 우측: AI Assist 사이드바 */}
      <aside className="viewer-sidebar">
        {/* Heatmap Controls 섹션 */}
        <div className="sidebar-section">
          <div className="section-header">
            <Layers size={16} />
            <span>Heatmap Controls</span>
          </div>
          <div className="section-content">
            {/* 히트맵 ON/OFF */}
            <div className="control-row">
              <span className="control-label">Show Heatmap</span>
              <button
                className={`toggle-btn ${showHeatmap ? 'active' : ''}`}
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                {showHeatmap ? <Eye size={16} /> : <EyeOff size={16} />}
                {showHeatmap ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* 투명도 슬라이더 */}
            <div className="control-row column">
              <span className="control-label">Opacity</span>
              <div className="slider-row">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(e.target.value)}
                  className="control-slider"
                />
                <span className="slider-value">{heatmapOpacity}%</span>
              </div>
            </div>

            {/* 병변 필터 체크박스 */}
            <div className="control-row column">
              <span className="control-label">Lesion Filters</span>
              <div className="checkbox-group">
                {Object.entries(lesionFilters).map(([key, value]) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => toggleLesionFilter(key)}
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

        {/* Feedback on AI 섹션 */}
        <div className="sidebar-section">
          <div className="section-header">
            <MessageSquare size={16} />
            <span>Feedback on AI</span>
          </div>
          <div className="section-content">
            {/* Helpfulness Rating */}
            <div className="control-row column">
              <span className="control-label">Was this helpful?</span>
              <div className="rating-row">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`rating-btn ${helpfulness >= num ? 'active' : ''}`}
                    onClick={() => setHelpfulness(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Issue Checkboxes */}
            <div className="control-row column">
              <span className="control-label">Issues (Optional)</span>
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

      </aside>
    </main>
  );
}

export default Viewer;