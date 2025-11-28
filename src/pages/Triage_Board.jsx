// src/pages/Triage_Board.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ChevronDown,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Activity,
  Thermometer,
  Heart,
  Wind,
  FileText,
  Eye,
  ArrowRight
} from "lucide-react";
import "./Triage_Board.css";

// 샘플 환자 데이터
const samplePatients = [
  {
    id: "P-2024-001",
    name: "김영수",
    age: 67,
    gender: "M",
    captureTime: "09:15",
    status: "critical",
    score: 92,
    diagnosis: "Pneumonia",
    diagnosisKo: "폐렴 의심",
    chiefComplaint: "호흡곤란, 발열",
    bloodPressure: "140/90",
    heartRate: "98",
    temperature: "38.5°C",
    oxygenSat: "94%",
    aiConfidence: 89,
    findings: ["폐렴 의심 병변", "양측 폐 침윤"],
    recommendations: [
      "즉시 흉부 CT 촬영 권장",
      "항생제 투여 고려",
      "산소 포화도 모니터링"
    ]
  },
  {
    id: "P-2024-002",
    name: "이미영",
    age: 45,
    gender: "F",
    captureTime: "09:32",
    status: "warning",
    score: 78,
    diagnosis: "Cardiomegaly",
    diagnosisKo: "심비대",
    chiefComplaint: "흉통, 호흡곤란",
    bloodPressure: "150/95",
    heartRate: "88",
    temperature: "36.8°C",
    oxygenSat: "97%",
    aiConfidence: 85,
    findings: ["심장 비대 소견", "CTR 증가"],
    recommendations: [
      "심장 초음파 검사 권장",
      "심전도 모니터링",
      "순환기내과 협진 요청"
    ]
  },
  {
    id: "P-2024-003",
    name: "박철호",
    age: 52,
    gender: "M",
    captureTime: "10:05",
    status: "normal",
    score: 45,
    diagnosis: "Nodule",
    diagnosisKo: "결절 발견",
    chiefComplaint: "건강검진",
    bloodPressure: "125/80",
    heartRate: "72",
    temperature: "36.5°C",
    oxygenSat: "99%",
    aiConfidence: 76,
    findings: ["우측 폐 상엽 결절", "크기 약 8mm"],
    recommendations: [
      "추가 CT 검사 권장",
      "3개월 후 추적 검사",
      "흡연력 확인 필요"
    ]
  },
  {
    id: "P-2024-004",
    name: "최수진",
    age: 34,
    gender: "F",
    captureTime: "10:28",
    status: "normal",
    score: 22,
    diagnosis: "Normal",
    diagnosisKo: "정상 소견",
    chiefComplaint: "건강검진",
    bloodPressure: "118/75",
    heartRate: "68",
    temperature: "36.4°C",
    oxygenSat: "99%",
    aiConfidence: 95,
    findings: ["특이 소견 없음"],
    recommendations: [
      "특이 소견 없음",
      "정기 검진 권장"
    ]
  },
  {
    id: "P-2024-005",
    name: "정민준",
    age: 71,
    gender: "M",
    captureTime: "10:45",
    status: "critical",
    score: 88,
    diagnosis: "Pleural Effusion",
    diagnosisKo: "흉수",
    chiefComplaint: "호흡곤란, 기침",
    bloodPressure: "135/85",
    heartRate: "92",
    temperature: "37.8°C",
    oxygenSat: "92%",
    aiConfidence: 91,
    findings: ["좌측 흉수", "폐 하엽 무기폐"],
    recommendations: [
      "흉수 천자 고려",
      "원인 감별 위한 추가 검사",
      "호흡기내과 협진"
    ]
  },
  {
    id: "P-2024-006",
    name: "한소희",
    age: 28,
    gender: "F",
    captureTime: "11:02",
    status: "warning",
    score: 65,
    diagnosis: "Atelectasis",
    diagnosisKo: "무기폐",
    chiefComplaint: "수술 후 경과관찰",
    bloodPressure: "115/72",
    heartRate: "78",
    temperature: "37.2°C",
    oxygenSat: "96%",
    aiConfidence: 82,
    findings: ["좌측 하엽 무기폐", "수술 후 변화"],
    recommendations: [
      "호흡 재활 치료",
      "체위 변경 권장",
      "추적 촬영 필요"
    ]
  }
];

// 통계 계산
const getStats = (patients) => {
  return {
    total: patients.length,
    critical: patients.filter(p => p.status === "critical").length,
    warning: patients.filter(p => p.status === "warning").length,
    normal: patients.filter(p => p.status === "normal").length
  };
};

// 상태 라벨
const statusConfig = {
  critical: { label: "Critical", icon: AlertCircle },
  warning: { label: "Warning", icon: AlertTriangle },
  normal: { label: "Normal", icon: CheckCircle }
};

function Triage_Board() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("score");
  
  const stats = getStats(samplePatients);

  // 필터링 및 정렬
  const filteredPatients = samplePatients
    .filter(patient => {
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === "all" || patient.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "time") return a.captureTime.localeCompare(b.captureTime);
      return 0;
    });

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const getStatusIcon = (status) => {
    const Icon = statusConfig[status].icon;
    return <Icon size={14} />;
  };

  return (
    <main className="triage-board">
      {/* 상단: 환자 테이블 섹션 (2/3) */}
      <section className="patients-section">
        <div className="section-header">
          <div className="header-left">
            <h2>Patients</h2>
            <div className="stats-badges">
              <span className="stat-badge total">
                <User size={14} />
                {stats.total}
              </span>
              <span className="stat-badge critical">
                <AlertCircle size={14} />
                {stats.critical}
              </span>
              <span className="stat-badge warning">
                <AlertTriangle size={14} />
                {stats.warning}
              </span>
              <span className="stat-badge normal">
                <CheckCircle size={14} />
                {stats.normal}
              </span>
            </div>
          </div>
          
          <div className="header-right">
            {/* 검색창 */}
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by ID or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* 필터 */}
            <div className="filter-group">
              <Filter size={16} />
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="normal">Normal</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
            
            {/* 정렬 */}
            <div className="filter-group">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="score">Sort by Risk</option>
                <option value="time">Sort by Time</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age/Sex</th>
                <th>Capture Time</th>
                <th>AI Risk Score</th>
                <th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className={`${selectedPatient?.id === patient.id ? "selected" : ""} ${patient.status}`}
                  onClick={() => handlePatientClick(patient)}
                >
                  <td>
                    <span className={`status-badge ${patient.status}`}>
                      {getStatusIcon(patient.status)}
                      {statusConfig[patient.status].label}
                    </span>
                  </td>
                  <td className="patient-id">{patient.id}</td>
                  <td className="patient-name">{patient.name}</td>
                  <td>{patient.age} / {patient.gender}</td>
                  <td>
                    <span className="time-cell">
                      <Clock size={14} />
                      {patient.captureTime}
                    </span>
                  </td>
                  <td>
                    <div className="score-cell">
                      <div className="score-bar">
                        <div 
                          className={`score-fill ${patient.status}`}
                          style={{ width: `${patient.score}%` }}
                        />
                      </div>
                      <span className="score-value">{patient.score}%</span>
                    </div>
                  </td>
                  <td className="diagnosis-cell">{patient.diagnosis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 하단: 환자 상세 정보 섹션 (1/3) */}
      <section className="detail-section">
        {selectedPatient ? (
          <div className="detail-content">
            {/* X-ray 섬네일 */}
            <div className="xray-preview">
              <div className="xray-label">
                <FileText size={14} />
                Chest X-ray
              </div>
              <div className="xray-image">
                <div className="xray-placeholder">
                  <Activity size={32} />
                  <span>X-ray Image</span>
                </div>
              </div>
              <div className="xray-meta">
                <span><Calendar size={12} /> {selectedPatient.captureTime}</span>
              </div>
            </div>

            {/* 환자 정보 */}
            <div className="patient-info">
              <div className="info-header">
                <h3>{selectedPatient.name}</h3>
                <span className="patient-id-tag">{selectedPatient.id}</span>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <User size={14} />
                  <span className="info-label">Age/Sex</span>
                  <span className="info-value">{selectedPatient.age}세 / {selectedPatient.gender === "M" ? "남" : "여"}</span>
                </div>
                <div className="info-item">
                  <Activity size={14} />
                  <span className="info-label">Blood Pressure</span>
                  <span className="info-value">{selectedPatient.bloodPressure}</span>
                </div>
                <div className="info-item">
                  <Heart size={14} />
                  <span className="info-label">Heart Rate</span>
                  <span className="info-value">{selectedPatient.heartRate} bpm</span>
                </div>
                <div className="info-item">
                  <Thermometer size={14} />
                  <span className="info-label">Temperature</span>
                  <span className="info-value">{selectedPatient.temperature}</span>
                </div>
                <div className="info-item">
                  <Wind size={14} />
                  <span className="info-label">SpO2</span>
                  <span className="info-value">{selectedPatient.oxygenSat}</span>
                </div>
                <div className="info-item full">
                  <FileText size={14} />
                  <span className="info-label">Chief Complaint</span>
                  <span className="info-value">{selectedPatient.chiefComplaint}</span>
                </div>
              </div>
            </div>

            {/* AI 분석 요약 */}
            <div className="ai-summary">
              <div className="ai-header">
                <span className="ai-label">AI Analysis</span>
                <span className={`ai-confidence ${selectedPatient.status}`}>
                  Confidence: {selectedPatient.aiConfidence}%
                </span>
              </div>
              
              <div className="ai-score-display">
                <div className={`score-circle ${selectedPatient.status}`}>
                  <span className="score-number">{selectedPatient.score}</span>
                  <span className="score-unit">%</span>
                </div>
                <div className="diagnosis-info">
                  <span className="diagnosis-main">{selectedPatient.diagnosis}</span>
                  <span className="diagnosis-sub">{selectedPatient.diagnosisKo}</span>
                </div>
              </div>

              <div className="ai-findings">
                <span className="findings-label">Findings</span>
                <ul>
                  {selectedPatient.findings.map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="action-buttons">
              <Link to="/followup" className="action-btn secondary">
                <Eye size={16} />
                View in Follow-up
              </Link>
              <Link to="/viewer" className="action-btn primary">
                <ArrowRight size={16} />
                Open in Viewer
              </Link>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <User size={48} />
            <h3>Select a Patient</h3>
            <p>Click on a patient row above to view detailed information</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Triage_Board;