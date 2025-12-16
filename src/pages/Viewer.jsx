// src/pages/Viewer.jsx
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  ZoomIn,
  ZoomOut,
  Move,
  RotateCw,
  Layers,
  Eye,
  EyeOff,
  MessageSquare,
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

// Vite: assets 폴더의 Fusion(Heatmap) 결과들을 미리 로드해 매칭
// 파일명 예: HQ_Fusion_Result_Pneumonia_000.jpg
const FUSION_IMAGES = import.meta.glob("../assets/HQ_Fusion_Result_Pneumonia_*.jpg", {
  eager: true,
  import: "default",
});

function Viewer() {
  // 라우트 state / sessionStorage에서 X-ray 정보를 받아서 표준 형태로 정규화
  const location = useLocation();

  const normalized = useMemo(() => {
    const st = location.state;

    // 1) FollowUp -> { selectedXray: { originalImage, heatmapImage, date, time, diagnosis, ... } }
    if (st?.selectedXray) {
      const sx = st.selectedXray;
      return {
        patientId: sx.patientId ?? st.patientId ?? null,
        name: sx.name ?? st.name ?? null,
        captureTime: sx.captureTime ?? null,
        originalImage: sx.originalImage ?? null,
        heatmapImage: sx.heatmapImage ?? null,
        date: sx.date ?? '-',
        time: sx.time ?? '-',
        diagnosis: sx.diagnosis ?? '-'
      };
    }

    // 2) Triage_Board -> { patientId, name, captureTime, xraySrc }
    if (st?.xraySrc) {
      const ct = st.captureTime ?? '';
      // captureTime이 "YYYY-MM-DD HH:mm" 같은 형태면 분리, 아니면 그대로 표시
      const [d, t] = typeof ct === 'string' ? ct.split(' ') : ['-', '-'];
      return {
        patientId: st.patientId ?? null,
        name: st.name ?? null,
        captureTime: st.captureTime ?? null,
        originalImage: st.xraySrc ?? null,
        heatmapImage: null,
        date: d || '-',
        time: t || '-',
        diagnosis: '-'
      };
    }

    // 3) sessionStorage fallback (Triage_Board에서 저장)
    try {
      const raw = sessionStorage.getItem('REM_SELECTED_XRAY');
      if (raw) {
        const parsed = JSON.parse(raw);
        const ct = parsed.captureTime ?? '';
        const [d, t] = typeof ct === 'string' ? ct.split(' ') : ['-', '-'];
        return {
          patientId: parsed.patientId ?? null,
          name: parsed.name ?? null,
          captureTime: parsed.captureTime ?? null,
          originalImage: parsed.xraySrc ?? null,
          heatmapImage: null,
          date: d || '-',
          time: t || '-',
          diagnosis: '-'
        };
      }
    } catch (e) {
      console.warn('Failed to read REM_SELECTED_XRAY from sessionStorage', e);
    }

    return null;
  }, [location.state]);

  // 디버깅용 로그
  console.log('Viewer received state:', location.state);
  console.log('Viewer normalized payload:', normalized);

  // 이미지 소스
  // 이미지 소스
const originalImage = normalized?.originalImage || null;

// heatmap(=fusion) 이미지가 FollowUp에서 넘어오지 않으면,
// 원본 파일명에서 id를 뽑아 HQ_Fusion_Result_Pneumonia_{id}.jpg로 자동 매칭
const derivedFusionImage = useMemo(() => {
  if (!originalImage) return null;

  // 예: ../assets/HQ_Original_Image_Pneumonia_191.jpg -> 191 추출
  const m = String(originalImage).match(/_(\d+)\.jpg$/i);
  if (!m) return null;

  const id = m[1];
  const padded = String(id).padStart(3, "0");

  const key = `../assets/HQ_Fusion_Result_Pneumonia_${padded}.jpg`;
  return FUSION_IMAGES[key] || null;
}, [originalImage]);

const heatmapImage = normalized?.heatmapImage || derivedFusionImage || null;
  // 환자/촬영 정보 (없으면 기존 더미값 유지)
  const patientId = normalized?.patientId || 'P-2024-0847';
  const patientName = normalized?.name || '김영수';
  const patientInfo = 'M/67';
  const shootDate = normalized?.date || '-';
  const shootTime = normalized?.time || '-';
  const diagnosis = normalized?.diagnosis || '-';

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
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    
    setPosition({ x: newX, y: newY });
  }, [isDragging]);

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
          {originalImage ? (
            <div 
              className="xray-image-wrapper"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`
              }}
            >
              {/* X-ray 이미지 */}
              <div className="xray-image">
                <img src={originalImage} alt="Chest X-ray" className="xray-img" />
              </div>

              {/* AI 히트맵 오버레이 */}
              {displayMode === 'heatmap' && showHeatmap && heatmapImage && (
                <div 
                  className="heatmap-overlay"
                  style={{ opacity: heatmapOpacity / 100 }}
                >
                  <img src={heatmapImage} alt="AI Heatmap" className="heatmap-img" />
                </div>
              )}
            </div>
          ) : (
            <div className="viewer-placeholder">
              <Activity size={64} strokeWidth={1} />
              <span>트리아지/Follow-up에서 X-ray를 선택해주세요</span>
            </div>
          )}

          {/* 드래그 힌트 */}
          <div className="drag-hint">
            <Move size={14} />
            <span>Drag to pan</span>
          </div>
        </div>

        {/* 하단 메타 정보 */}
        <div className="viewer-meta">
          <div className="meta-item">
            <User size={14} />
            <span className="meta-value">{patientId}</span>
            <span className="meta-divider">|</span>
            <span className="meta-sub">{patientName} ({patientInfo})</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span className="meta-value">{shootDate}</span>
            <span className="meta-sub">{shootTime}</span>
          </div>
          <div className="meta-item">
            <Scan size={14} />
            <span className="meta-value">Chest PA</span>
          </div>
          <div className="meta-item diagnosis-item">
            <Activity size={14} />
            <span className="meta-label">Diagnosis</span>
            <span className="meta-value diagnosis">{diagnosis}</span>
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
              <span className="control-label">Any issues?</span>
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