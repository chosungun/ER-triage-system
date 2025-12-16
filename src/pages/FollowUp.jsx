// src/pages/FollowUpPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  Check, 
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  Activity,
  Layers,
  Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FollowUp.css';

// X-ray 이미지 import
import OriginalImage352 from '../assets/HQ_Original_Image_Pneumonia_352.jpg';
import OriginalImage531 from '../assets/HQ_Original_Image_Pneumonia_531.jpg';
import OriginalImage1892 from '../assets/HQ_Original_Image_Pneumonia_1892.jpg';
import OriginalImage1323 from '../assets/HQ_Original_Image_Pneumonia_1323.jpg';
import OriginalImage1585 from '../assets/HQ_Original_Image_Pneumonia_1585.jpg';

import FusionImage352 from '../assets/HQ_Fusion_Result_Pneumonia_352.jpg';
import FusionImage531 from '../assets/HQ_Fusion_Result_Pneumonia_531.jpg';
import FusionImage1892 from '../assets/HQ_Fusion_Result_Pneumonia_1892.jpg';
import FusionImage1323 from '../assets/HQ_Fusion_Result_Pneumonia_1323.jpg';
import FusionImage1585 from '../assets/HQ_Fusion_Result_Pneumonia_1585.jpg';

// 샘플 환자 데이터
const patientData = {
  id: 'P-2024-0847',
  name: '김영수',
  age: 67,
  gender: '남',
};

// X-ray 촬영 이력 데이터 (최신순 정렬) - 각 날짜마다 다른 이미지 할당
const xrayHistory = [
  {
    id: 'xr-001',
    date: '2024-11-20',
    time: '14:45',
    location: '응급실',
    facility: '본관 X-ray실 2',
    technician: '방사선사 이지은',
    diagnosis: 'Pneumonia',
    findings: ['양측 폐야 침윤 증가', '우하엽 경화 소견', '늑막삼출 의심'],
    severity: 'critical',
    originalImage: OriginalImage352,
    heatmapImage: FusionImage352,
    report: 'Bilateral infiltrates with RLL consolidation. Pleural effusion suspected. Urgent CT recommended.'
  },
  {
    id: 'xr-002',
    date: '2024-11-18',
    time: '09:30',
    location: '응급실',
    facility: '본관 X-ray실 1',
    technician: '방사선사 박민수',
    diagnosis: 'Pneumonia',
    findings: ['양측 폐야 침윤', '우하엽 경화 소견'],
    severity: 'high',
    originalImage: OriginalImage531,
    heatmapImage: FusionImage531,
    report: 'Bilateral airspace opacities. RLL consolidation persists. F/U in 48-72hrs recommended.'
  },
  {
    id: 'xr-003',
    date: '2024-11-15',
    time: '16:20',
    location: '외래',
    facility: '외래동 X-ray실',
    technician: '방사선사 최수진',
    diagnosis: 'Suspected Pneumonia',
    findings: ['경미한 폐침윤', '우하엽 음영 증가'],
    severity: 'normal',
    originalImage: OriginalImage1892,
    heatmapImage: FusionImage1892,
    report: 'Mild RLL infiltrates. Early pneumonia cannot be excluded. Clinical correlation advised.'
  },
  {
    id: 'xr-004',
    date: '2024-11-12',
    time: '11:15',
    location: '외래',
    facility: '외래동 X-ray실',
    technician: '방사선사 김태호',
    diagnosis: 'Normal',
    findings: ['특이 소견 없음'],
    severity: 'low',
    originalImage: OriginalImage1323,
    heatmapImage: FusionImage1323,
    report: 'Clear lungs bilaterally. No consolidation or effusion. Normal cardiac silhouette.'
  },
  {
    id: 'xr-005',
    date: '2024-11-05',
    time: '10:00',
    location: '건강검진센터',
    facility: '검진센터 1층',
    technician: '방사선사 정유나',
    diagnosis: 'Normal',
    findings: ['정상 소견'],
    severity: 'low',
    originalImage: OriginalImage1585,
    heatmapImage: FusionImage1585,
    report: 'Routine screening. No active pulmonary disease. Normal chest X-ray.'
  }
];

// 시계열 분석 결과 생성 함수
const generateTimeSeriesAnalysis = (pastXray, currentXray) => {
  if (!pastXray || !currentXray) return null;
  
  const pastIdx = xrayHistory.findIndex(x => x.id === pastXray.id);
  const currentIdx = xrayHistory.findIndex(x => x.id === currentXray.id);
  
  // severity 레벨 비교
  const severityLevel = { 'low': 0, 'normal': 1, 'high': 2, 'critical': 3 };
  const pastLevel = severityLevel[pastXray.severity];
  const currentLevel = severityLevel[currentXray.severity];
  
  const daysDiff = Math.abs(
    (new Date(currentXray.date) - new Date(pastXray.date)) / (1000 * 60 * 60 * 24)
  );
  
  // 분석 결과 생성
  const analysis = {
    trend: currentLevel > pastLevel ? 'worsening' : currentLevel < pastLevel ? 'improving' : 'stable',
    daysDiff: Math.round(daysDiff),
    summaryTitle: '',
    summaryText: '',
    details: [],
    recommendations: []
  };
  
  // 악화된 경우
  if (currentLevel > pastLevel) {
    analysis.summaryTitle = '병변 악화';
    analysis.summaryText = `${analysis.daysDiff}일 사이 폐렴 소견이 진행되었습니다.`;
    
    // 새로 추가된 소견
    const newFindings = currentXray.findings.filter(f => !pastXray.findings.includes(f));
    if (newFindings.length > 0) {
      analysis.details.push({
        type: 'worsened',
        icon: 'alert',
        title: '새로 발견된 소견',
        items: newFindings
      });
    }
    
    // 악화된 소견
    analysis.details.push({
      type: 'worsened',
      icon: 'trending-up',
      title: '악화된 소견',
      items: ['폐 침윤 범위 확대', '음영 밀도 증가']
    });
    
    analysis.recommendations = [
      '즉시 담당의 상담 권장',
      '항생제 치료 검토',
      '48시간 내 추적 검사'
    ];
    
  // 호전된 경우
  } else if (currentLevel < pastLevel) {
    analysis.summaryTitle = '병변 호전';
    analysis.summaryText = `${analysis.daysDiff}일 사이 폐렴 소견이 완화되었습니다.`;
    
    // 호전된 소견
    const improvedFindings = pastXray.findings.filter(f => !currentXray.findings.includes(f));
    if (improvedFindings.length > 0) {
      analysis.details.push({
        type: 'improved',
        icon: 'check',
        title: '호전된 소견',
        items: improvedFindings
      });
    }
    
    analysis.details.push({
      type: 'improved',
      icon: 'trending-down',
      title: '개선 관찰',
      items: ['침윤 범위 감소', '음영 밀도 감소']
    });
    
    analysis.recommendations = [
      '현재 치료 유지',
      '7일 후 추적 검사 권장',
      '증상 모니터링 지속'
    ];
    
  // 유지된 경우
  } else {
    analysis.summaryTitle = '병변 유지';
    analysis.summaryText = `${analysis.daysDiff}일 간 유의미한 변화가 없습니다.`;
    
    analysis.details.push({
      type: 'stable',
      icon: 'minus',
      title: '유지 중인 소견',
      items: currentXray.findings
    });
    
    analysis.recommendations = [
      '현재 치료 계획 유지',
      '정기 추적 검사 지속'
    ];
  }
  
  return analysis;
};

function FollowUp() {
  const navigate = useNavigate();
  
  // 선택된 X-ray 두 개 (과거, 현재)
  const [selectedPast, setSelectedPast] = useState(null);
  const [selectedCurrent, setSelectedCurrent] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  
  // 시계열 분석 결과
  const [analysis, setAnalysis] = useState(null);
  
  // 선택 로직: 두 개를 선택하면 자동으로 위쪽(인덱스 큰 쪽)=과거, 아래쪽(인덱스 작은 쪽)=현재
  const handleSelectXray = (xray) => {
    const clickedIdx = xrayHistory.findIndex(x => x.id === xray.id);
    
    // 이미 선택된 것을 클릭하면 해제
    if (selectedPast?.id === xray.id) {
      setSelectedPast(null);
      return;
    }
    if (selectedCurrent?.id === xray.id) {
      setSelectedCurrent(null);
      return;
    }
    
    // 아무것도 선택 안 된 상태
    if (!selectedPast && !selectedCurrent) {
      setSelectedCurrent(xray);
      return;
    }
    
    // 하나만 선택된 상태에서 두 번째 선택
    if (selectedCurrent && !selectedPast) {
      const currentIdx = xrayHistory.findIndex(x => x.id === selectedCurrent.id);
      // 클릭한 게 더 오래된 것이면(인덱스가 크면) 과거로
      if (clickedIdx > currentIdx) {
        setSelectedPast(xray);
      } else {
        // 클릭한 게 더 최신이면 현재로 바꾸고 기존 걸 과거로
        setSelectedPast(selectedCurrent);
        setSelectedCurrent(xray);
      }
      return;
    }
    
    if (selectedPast && !selectedCurrent) {
      const pastIdx = xrayHistory.findIndex(x => x.id === selectedPast.id);
      // 클릭한 게 더 최신이면(인덱스가 작으면) 현재로
      if (clickedIdx < pastIdx) {
        setSelectedCurrent(xray);
      } else {
        // 클릭한 게 더 오래된 것이면 과거로 바꾸고 기존 걸 현재로
        setSelectedCurrent(selectedPast);
        setSelectedPast(xray);
      }
      return;
    }
    
    // 둘 다 선택된 상태에서 새로 클릭 - 날짜 기준으로 자동 배정
    const pastIdx = xrayHistory.findIndex(x => x.id === selectedPast.id);
    const currentIdx = xrayHistory.findIndex(x => x.id === selectedCurrent.id);
    
    if (clickedIdx > currentIdx) {
      // 현재보다 오래됐으면 과거 교체
      setSelectedPast(xray);
    } else if (clickedIdx < pastIdx) {
      // 과거보다 최신이면 현재 교체
      setSelectedCurrent(xray);
    } else {
      // 중간이면 현재 교체
      setSelectedCurrent(xray);
    }
  };
  
  // 선택이 바뀔 때마다 분석 업데이트
  useEffect(() => {
    if (selectedPast && selectedCurrent) {
      const result = generateTimeSeriesAnalysis(selectedPast, selectedCurrent);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [selectedPast, selectedCurrent]);
  
  // 선택 상태 확인
  const isSelected = (xray) => {
    return selectedPast?.id === xray.id || selectedCurrent?.id === xray.id;
  };
  
  const getSelectionType = (xray) => {
    if (selectedPast?.id === xray.id) return 'past';
    if (selectedCurrent?.id === xray.id) return 'current';
    return null;
  };
  
  // 장소 배지 색상
  const getLocationColor = (location) => {
    switch (location) {
      case '응급실': return { bg: '#FCE5E9', text: '#E85468' };
      case '외래': return { bg: '#EAEFFF', text: '#3D6BFF' };
      case 'ICU': return { bg: '#FFF6DE', text: '#F7B84B' };
      case '건강검진센터': return { bg: '#E6F5EF', text: '#52C39A' };
      default: return { bg: '#F5F7FA', text: '#8D9198' };
    }
  };
  
  // 트렌드 아이콘
  const getTrendIcon = () => {
    if (!analysis) return null;
    switch (analysis.trend) {
      case 'worsening': return <TrendingUp size={20} />;
      case 'improving': return <TrendingDown size={20} />;
      default: return <Minus size={20} />;
    }
  };
  
  const getTrendColor = () => {
    if (!analysis) return '#8D9198';
    switch (analysis.trend) {
      case 'worsening': return '#E85468';
      case 'improving': return '#52C39A';
      default: return '#8D9198';
    }
  };

  // 뷰어 페이지로 이동
  const handleOpenViewer = (xray) => {
    navigate('/viewer', { state: { selectedXray: xray } });
  };

  return (
    <main className="followup-page">
      {/* 상단 헤더 */}
      <header className="followup-header">
        <div className="patient-info-bar">
          <div className="patient-avatar">
            <User size={20} />
          </div>
          <div className="patient-details">
            <span className="patient-name">{patientData.name}</span>
            <span className="patient-meta">
              {patientData.id} · {patientData.age}세 · {patientData.gender}
            </span>
          </div>
        </div>
        <div className="header-controls">
          <button 
            className={`heatmap-toggle ${showHeatmap ? 'active' : ''}`}
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            <Layers size={16} />
            <span>Heatmap</span>
          </button>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <div className="followup-content">
        {/* 좌측: 타임라인 */}
        <aside className="timeline-panel">
          <div className="panel-header">
            <Calendar size={16} />
            <span>X-ray Timeline</span>
            <span className="selection-count">
              {(selectedPast ? 1 : 0) + (selectedCurrent ? 1 : 0)}/2 선택
            </span>
          </div>
          
          <div className="timeline-list">
            {xrayHistory.map((xray, index) => {
              const locationColor = getLocationColor(xray.location);
              const selectionType = getSelectionType(xray);
              
              return (
                <div
                  key={xray.id}
                  className={`timeline-item ${isSelected(xray) ? 'selected' : ''} ${selectionType || ''}`}
                  onClick={() => handleSelectXray(xray)}
                >
                  {/* 선택 체크 */}
                  <div className={`selection-check ${isSelected(xray) ? 'checked' : ''}`}>
                    {isSelected(xray) && <Check size={14} />}
                  </div>
                  
                  {/* 타임라인 마커 */}
                  <div className="timeline-marker">
                    <div className="marker-dot" />
                    {index < xrayHistory.length - 1 && <div className="marker-line" />}
                  </div>
                  
                  {/* 콘텐츠 */}
                  <div className="timeline-content">
                    <div className="timeline-date-row">
                      <span className="date">{xray.date}</span>
                      <span className="time">{xray.time}</span>
                    </div>
                    <div className="timeline-location">
                      <span 
                        className="location-badge"
                        style={{ 
                          backgroundColor: locationColor.bg, 
                          color: locationColor.text 
                        }}
                      >
                        {xray.location}
                      </span>
                      <span className="facility">{xray.facility}</span>
                    </div>
                    {selectionType && (
                      <div className="selection-label">
                        {selectionType === 'past' ? 'Previous' : 'Current'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
        
        {/* 중앙: X-ray 비교 뷰어 */}
        <section className="comparison-panel">
          <div className="comparison-viewers">
            {/* 과거 X-ray */}
            <div className="viewer-card">
              <div className="viewer-label">
                <span className="label-badge past">Previous</span>
              </div>
              
              {selectedPast ? (
                <>
                  <div className="viewer-image">
                    <img 
                      src={showHeatmap ? selectedPast.heatmapImage : selectedPast.originalImage}
                      alt="Past X-ray"
                      className="xray-image"
                    />
                    <button 
                      className="expand-btn"
                      onClick={() => handleOpenViewer(selectedPast)}
                      title="뷰어에서 열기"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  <div className="viewer-info">
                    <div className="info-row primary">
                      <Calendar size={14} />
                      <span>{selectedPast.date} {selectedPast.time}</span>
                    </div>
                    <div className="info-row">
                      <MapPin size={14} />
                      <span>{selectedPast.location} · {selectedPast.facility}</span>
                    </div>
                    <div className="diagnosis-tag">{selectedPast.diagnosis}</div>
                    <div className="report-section">
                      <div className="report-label">Radiologist Report</div>
                      <p className="report-text">{selectedPast.report}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="viewer-empty">
                  <div className="empty-icon">
                    <Activity size={32} strokeWidth={1} />
                  </div>
                  <span>과거 X-ray를 선택하세요</span>
                </div>
              )}
            </div>
            
            {/* 화살표 */}
            <div className={`comparison-arrow ${selectedPast && selectedCurrent ? 'active' : ''}`}>
              <ArrowRight size={24} />
            </div>
            
            {/* 현재 X-ray */}
            <div className="viewer-card">
              <div className="viewer-label">
                <span className="label-badge current">Current</span>
              </div>
              
              {selectedCurrent ? (
                <>
                  <div className="viewer-image">
                    <img 
                      src={showHeatmap ? selectedCurrent.heatmapImage : selectedCurrent.originalImage}
                      alt="Current X-ray"
                      className="xray-image"
                    />
                    <button 
                      className="expand-btn"
                      onClick={() => handleOpenViewer(selectedCurrent)}
                      title="뷰어에서 열기"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  <div className="viewer-info">
                    <div className="info-row primary">
                      <Calendar size={14} />
                      <span>{selectedCurrent.date} {selectedCurrent.time}</span>
                    </div>
                    <div className="info-row">
                      <MapPin size={14} />
                      <span>{selectedCurrent.location} · {selectedCurrent.facility}</span>
                    </div>
                    <div className="diagnosis-tag">{selectedCurrent.diagnosis}</div>
                    <div className="report-section">
                      <div className="report-label">Radiologist Report</div>
                      <p className="report-text">{selectedCurrent.report}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="viewer-empty">
                  <div className="empty-icon">
                    <Activity size={32} strokeWidth={1} />
                  </div>
                  <span>현재 X-ray를 선택하세요</span>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* 우측: 시계열 분석 보고 */}
        <aside className="analysis-panel">
          <div className="panel-header">
            <Activity size={16} />
            <span>시계열 분석</span>
          </div>
          
          {analysis ? (
            <div className="analysis-content">
              {/* 요약 카드 */}
              <div className={`analysis-summary ${analysis.trend}`}>
                <div className="summary-icon" style={{ color: getTrendColor() }}>
                  {getTrendIcon()}
                </div>
                <div className="summary-text">
                  <h4>{analysis.summaryTitle}</h4>
                  <p>{analysis.summaryText}</p>
                </div>
              </div>
              
              {/* 상세 분석 */}
              <div className="analysis-details">
                {analysis.details.map((detail, idx) => (
                  <div key={idx} className={`detail-section ${detail.type}`}>
                    <div className="detail-header">
                      {detail.icon === 'alert' && <AlertCircle size={14} />}
                      {detail.icon === 'trending-up' && <TrendingUp size={14} />}
                      {detail.icon === 'trending-down' && <TrendingDown size={14} />}
                      {detail.icon === 'check' && <CheckCircle size={14} />}
                      {detail.icon === 'minus' && <Minus size={14} />}
                      <span>{detail.title}</span>
                    </div>
                    <ul className="detail-items">
                      {detail.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* 권고사항 */}
              <div className="recommendations">
                <div className="recommendations-header">
                  <CheckCircle size={14} />
                  <span>권고사항</span>
                </div>
                <ul className="recommendations-list">
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              {/* 비교 기간 */}
              <div className="comparison-period">
                <span className="period-label">비교 기간</span>
                <span className="period-value">{analysis.daysDiff}일</span>
              </div>
            </div>
          ) : (
            <div className="analysis-empty">
              <div className="empty-illustration">
                <Activity size={40} strokeWidth={1} />
              </div>
              <h4>X-ray 2개를 선택하세요</h4>
              <p>왼쪽 타임라인에서 비교할 X-ray를<br />2개 선택하면 시계열 분석 결과가<br />여기에 표시됩니다.</p>
            </div>
          )}
        </aside>
      </div>
      
    </main>
  );
}

export default FollowUp;