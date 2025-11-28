// src/pages/FollowUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Clock,
  Eye,
  Layers,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import "./FollowUp.css";

// 샘플 환자 데이터
const patientInfo = {
  id: "P-2024-001",
  name: "김영수",
  age: 67,
  gender: "남"
};

// 샘플 X-ray 기록 데이터
const xrayHistory = [
  {
    id: 1,
    date: "2024-11-28",
    time: "09:15",
    lesionScore: 92,
    diagnosis: "Pneumonia (폐렴)",
    status: "critical",
    findings: ["좌측 하엽 침윤", "흉수 소량"],
    aiConfidence: 94
  },
  {
    id: 2,
    date: "2024-11-21",
    time: "14:30",
    lesionScore: 78,
    diagnosis: "Pneumonia 진행",
    status: "high",
    findings: ["좌측 하엽 침윤 증가"],
    aiConfidence: 91
  },
  {
    id: 3,
    date: "2024-11-14",
    time: "10:45",
    lesionScore: 65,
    diagnosis: "Pneumonia 의심",
    status: "high",
    findings: ["좌측 하엽 경미한 음영"],
    aiConfidence: 87
  },
  {
    id: 4,
    date: "2024-11-07",
    time: "11:20",
    lesionScore: 45,
    diagnosis: "경미한 이상 소견",
    status: "normal",
    findings: ["경미한 기관지 확장"],
    aiConfidence: 82
  },
  {
    id: 5,
    date: "2024-10-28",
    time: "09:00",
    lesionScore: 22,
    diagnosis: "정상 소견",
    status: "low",
    findings: ["특이 소견 없음"],
    aiConfidence: 95
  }
];

// AI 판독 기록 로그
const reportHistory = [
  { date: "2024-11-28", action: "Critical 판정", detail: "즉시 치료 필요" },
  { date: "2024-11-21", action: "병변 진행 감지", detail: "침윤 범위 확대" },
  { date: "2024-11-14", action: "이상 소견 발견", detail: "추적 관찰 권장" },
  { date: "2024-11-07", action: "경미한 변화", detail: "정기 검진 권장" },
  { date: "2024-10-28", action: "정상 판정", detail: "특이 소견 없음" }
];

function FollowUp() {
  const navigate = useNavigate();
  const [selectedCurrent, setSelectedCurrent] = useState(xrayHistory[0]);
  const [selectedPast, setSelectedPast] = useState(xrayHistory[1]);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "critical": return "#E85468";
      case "high": return "#F7B84B";
      case "normal": return "#52C39A";
      case "low": return "#3D6BFF";
      default: return "#8D9198";
    }
  };

  const getScoreChange = () => {
    if (!selectedCurrent || !selectedPast) return null;
    return selectedCurrent.lesionScore - selectedPast.lesionScore;
  };

  const scoreChange = getScoreChange();

  const handleOpenViewer = () => {
    navigate("/viewer");
  };

  return (
    <main className="followup-page">
      {/* 상단 헤더 영역 */}
      <header className="followup-header">
        <div className="patient-info-bar">
          <div className="patient-avatar">
            <User size={20} />
          </div>
          <div className="patient-details">
            <span className="patient-name">{patientInfo.name}</span>
            <span className="patient-meta">
              {patientInfo.id} | {patientInfo.age}세 | {patientInfo.gender}
            </span>
          </div>
        </div>
        <button className="viewer-btn" onClick={handleOpenViewer}>
          <Maximize2 size={16} />
          <span>Open in Viewer</span>
        </button>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <div className="followup-content">
        {/* 좌측: 타임라인 */}
        <aside className="timeline-panel">
          <div className="panel-header">
            <Calendar size={16} />
            <span>X-ray Timeline</span>
          </div>
          <div className="timeline-list">
            {xrayHistory.map((record, index) => (
              <div
                key={record.id}
                className={`timeline-item ${selectedCurrent?.id === record.id ? "current" : ""} ${selectedPast?.id === record.id ? "past" : ""}`}
                onClick={() => {
                  if (selectedCurrent?.id !== record.id) {
                    setSelectedPast(selectedCurrent);
                    setSelectedCurrent(record);
                  }
                }}
              >
                <div className="timeline-marker" style={{ borderColor: getStatusColor(record.status) }}>
                  <div className="marker-dot" style={{ background: getStatusColor(record.status) }} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">
                    <span className="date">{record.date}</span>
                    <span className="time">{record.time}</span>
                  </div>
                  <div className="timeline-score">
                    <span className="score-value" style={{ color: getStatusColor(record.status) }}>
                      {record.lesionScore}%
                    </span>
                  </div>
                </div>
                {index < xrayHistory.length - 1 && <div className="timeline-line" />}
              </div>
            ))}
          </div>
        </aside>

        {/* 중앙: 비교 뷰어 */}
        <section className="comparison-panel">
          <div className="comparison-header">
            <span className="comparison-title">Side-by-Side Comparison</span>
            <div className="comparison-controls">
              <button
                className={`control-btn ${showHeatmap ? "active" : ""}`}
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                <Layers size={14} />
                <span>Heatmap</span>
              </button>
            </div>
          </div>

          <div className="comparison-viewers">
            {/* 과거 영상 (왼쪽) */}
            <div className="viewer-card past">
              <div className="viewer-label">
                <span className="label-badge past">Previous</span>
                <span className="label-date">{selectedPast?.date}</span>
              </div>
              <div className="viewer-image">
                <div className="xray-placeholder">
                  <Activity size={48} strokeWidth={1} />
                  <span>X-ray Image</span>
                  {showHeatmap && <div className="heatmap-overlay" />}
                </div>
              </div>
              <div className="viewer-footer">
                <span className="diagnosis">{selectedPast?.diagnosis}</span>
                <span className="score" style={{ color: getStatusColor(selectedPast?.status) }}>
                  {selectedPast?.lesionScore}%
                </span>
              </div>
            </div>

            {/* VS 구분선 */}
            <div className="comparison-divider">
              <div className="divider-circle">
                {scoreChange > 0 ? (
                  <TrendingUp size={16} color="#E85468" />
                ) : scoreChange < 0 ? (
                  <TrendingDown size={16} color="#52C39A" />
                ) : (
                  <Minus size={16} color="#8D9198" />
                )}
              </div>
              <span className="change-value" style={{
                color: scoreChange > 0 ? "#E85468" : scoreChange < 0 ? "#52C39A" : "#8D9198"
              }}>
                {scoreChange > 0 ? `+${scoreChange}` : scoreChange}%
              </span>
            </div>

            {/* 현재 영상 (오른쪽) */}
            <div className="viewer-card current">
              <div className="viewer-label">
                <span className="label-badge current">Current</span>
                <span className="label-date">{selectedCurrent?.date}</span>
              </div>
              <div className="viewer-image">
                <div className="xray-placeholder">
                  <Activity size={48} strokeWidth={1} />
                  <span>X-ray Image</span>
                  {showHeatmap && <div className="heatmap-overlay" />}
                </div>
              </div>
              <div className="viewer-footer">
                <span className="diagnosis">{selectedCurrent?.diagnosis}</span>
                <span className="score" style={{ color: getStatusColor(selectedCurrent?.status) }}>
                  {selectedCurrent?.lesionScore}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 우측: AI 분석 & 리포트 */}
        <aside className="analysis-panel">
          {/* Lesion Score 변화 그래프 */}
          <div className="chart-section">
            <div className="panel-header">
              <TrendingUp size={16} />
              <span>Score Trend</span>
            </div>
            <div className="score-chart">
              <div className="chart-area">
                {xrayHistory.slice().reverse().map((record, index) => (
                  <div key={record.id} className="chart-bar-wrapper">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${record.lesionScore}%`,
                        background: getStatusColor(record.status)
                      }}
                    />
                    <span className="chart-label">{record.date.slice(5)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report History */}
          <div className="report-section">
            <div className="panel-header">
              <FileText size={16} />
              <span>Report History</span>
            </div>
            <div className="report-list">
              {reportHistory.map((report, index) => (
                <div key={index} className="report-item">
                  <div className="report-icon">
                    {index === 0 ? (
                      <AlertCircle size={14} color="#E85468" />
                    ) : (
                      <CheckCircle size={14} color="#8D9198" />
                    )}
                  </div>
                  <div className="report-content">
                    <span className="report-action">{report.action}</span>
                    <span className="report-detail">{report.detail}</span>
                  </div>
                  <span className="report-date">{report.date.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default FollowUp;