// src/pages/Triage_Board.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  Clock,
  User,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  FileText,
  Activity,
  Calendar,
  Eye,
  ArrowRight
} from "lucide-react";
import "./Triage_Board.css";

// 샘플 환자 데이터 (KTAS 5단계 적용)
const samplePatients = [
  {
    id: "P-2024-001",
    name: "김영희",
    age: 45,
    gender: "F",
    captureTime: "09:23",
    ktas: 1,
    diagnosis: "Tension Pneumothorax",
    diagnosisKo: "긴장성 기흉",
    chiefComplaint: "호흡곤란, 흉통",
    bloodPressure: "85/50",
    heartRate: "128",
    temperature: "36.8°C",
    oxygenSat: "82%",
    aiConfidence: 96,
    findings: ["좌측 긴장성 기흉", "종격동 편위"],
    recommendations: [
      "즉시 흉관 삽입",
      "응급 중재 필요",
      "흉부외과 협진"
    ]
  },
  {
    id: "P-2024-002",
    name: "이철수",
    age: 62,
    gender: "M",
    captureTime: "09:45",
    ktas: 2,
    diagnosis: "Pneumonia",
    diagnosisKo: "폐렴",
    chiefComplaint: "고열, 기침, 호흡곤란",
    bloodPressure: "100/65",
    heartRate: "110",
    temperature: "39.2°C",
    oxygenSat: "89%",
    aiConfidence: 94,
    findings: ["우하엽 경화", "양측 침윤"],
    recommendations: [
      "신속 항생제 투여",
      "산소 치료",
      "중환자실 고려"
    ]
  },
  {
    id: "P-2024-003",
    name: "탕후루",
    age: 38,
    gender: "M",
    captureTime: "10:12",
    ktas: 3,
    diagnosis: "Cardiomegaly",
    diagnosisKo: "심비대",
    chiefComplaint: "흉통, 호흡곤란",
    bloodPressure: "145/95",
    heartRate: "88",
    temperature: "36.5°C",
    oxygenSat: "94%",
    aiConfidence: 87,
    findings: ["심장 비대 (CTR 0.58)", "경미한 폐울혈"],
    recommendations: [
      "심초음파 검사",
      "심장내과 협진",
      "혈압 조절"
    ]
  },
  {
    id: "P-2024-004",
    name: "최수진",
    age: 29,
    gender: "F",
    captureTime: "10:30",
    ktas: 4,
    diagnosis: "Bronchitis",
    diagnosisKo: "기관지염",
    chiefComplaint: "기침, 가래",
    bloodPressure: "118/75",
    heartRate: "78",
    temperature: "37.4°C",
    oxygenSat: "97%",
    aiConfidence: 82,
    findings: ["기관지 벽 비후"],
    recommendations: [
      "대증 치료",
      "외래 추적 관찰"
    ]
  },
  {
    id: "P-2024-005",
    name: "박민준",
    age: 71,
    gender: "M",
    captureTime: "10:45",
    ktas: 2,
    diagnosis: "Pleural Effusion",
    diagnosisKo: "흉수",
    chiefComplaint: "호흡곤란, 기침",
    bloodPressure: "135/85",
    heartRate: "92",
    temperature: "37.8°C",
    oxygenSat: "90%",
    aiConfidence: 91,
    findings: ["좌측 대량 흉수", "폐 하엽 무기폐"],
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
    ktas: 3,
    diagnosis: "Atelectasis",
    diagnosisKo: "무기폐",
    chiefComplaint: "수술 후 경과관찰",
    bloodPressure: "115/72",
    heartRate: "78",
    temperature: "37.2°C",
    oxygenSat: "95%",
    aiConfidence: 82,
    findings: ["좌측 하엽 무기폐", "수술 후 변화"],
    recommendations: [
      "호흡 재활 치료",
      "체위 변경 권장",
      "추적 촬영 필요"
    ]
  },
  {
    id: "P-2024-007",
    name: "강동원",
    age: 55,
    gender: "M",
    captureTime: "11:20",
    ktas: 5,
    diagnosis: "Normal",
    diagnosisKo: "정상 소견",
    chiefComplaint: "건강검진",
    bloodPressure: "120/80",
    heartRate: "72",
    temperature: "36.5°C",
    oxygenSat: "99%",
    aiConfidence: 98,
    findings: ["특이 소견 없음"],
    recommendations: [
      "정기 검진 권장"
    ]
  },
  {
    id: "P-2024-008",
    name: "윤서연",
    age: 42,
    gender: "F",
    captureTime: "11:35",
    ktas: 4,
    diagnosis: "Costochondritis",
    diagnosisKo: "늑연골염",
    chiefComplaint: "흉벽 통증",
    bloodPressure: "125/78",
    heartRate: "80",
    temperature: "36.6°C",
    oxygenSat: "98%",
    aiConfidence: 75,
    findings: ["폐실질 이상 없음", "늑연골 부위 압통"],
    recommendations: [
      "진통제 처방",
      "외래 추적"
    ]
  }
];

// KTAS 설정
const ktasConfig = {
  1: { 
    label: "Level 1", 
    labelKo: "소생",
    color: "#DC2626",
    bgColor: "#FEE2E2",
    icon: AlertCircle,
    description: "즉각적"
  },
  2: { 
    label: "Level 2", 
    labelKo: "긴급",
    color: "#EA580C",
    bgColor: "#FFEDD5",
    icon: AlertTriangle,
    description: "15분 이내"
  },
  3: { 
    label: "Level 3", 
    labelKo: "응급",
    color: "#CA8A04",
    bgColor: "#FEF9C3",
    icon: AlertTriangle,
    description: "30분 이내"
  },
  4: { 
    label: "Level 4", 
    labelKo: "준응급",
    color: "#16A34A",
    bgColor: "#DCFCE7",
    icon: CheckCircle,
    description: "1시간 이내"
  },
  5: { 
    label: "Level 5", 
    labelKo: "비응급",
    color: "#2563EB",
    bgColor: "#DBEAFE",
    icon: CheckCircle,
    description: "2시간 이내"
  }
};

// 통계 계산
const getStats = (patients) => {
  return {
    total: patients.length,
    level1: patients.filter(p => p.ktas === 1).length,
    level2: patients.filter(p => p.ktas === 2).length,
    level3: patients.filter(p => p.ktas === 3).length,
    level4: patients.filter(p => p.ktas === 4).length,
    level5: patients.filter(p => p.ktas === 5).length,
  };
};

function Triage_Board() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKtas, setFilterKtas] = useState("all");
  const [sortBy, setSortBy] = useState("ktas");
  
  const stats = getStats(samplePatients);

  // 필터링 및 정렬
  const filteredPatients = samplePatients
    .filter(patient => {
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterKtas === "all" || patient.ktas === parseInt(filterKtas);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "ktas") return a.ktas - b.ktas;
      if (sortBy === "time") return a.captureTime.localeCompare(b.captureTime);
      return 0;
    });

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const getKtasIcon = (ktas) => {
    const Icon = ktasConfig[ktas].icon;
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
              <span className="stat-badge ktas-1">
                {stats.level1}
              </span>
              <span className="stat-badge ktas-2">
                {stats.level2}
              </span>
              <span className="stat-badge ktas-3">
                {stats.level3}
              </span>
              <span className="stat-badge ktas-4">
                {stats.level4}
              </span>
              <span className="stat-badge ktas-5">
                {stats.level5}
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
                value={filterKtas} 
                onChange={(e) => setFilterKtas(e.target.value)}
              >
                <option value="all">All KTAS</option>
                <option value="1">Level 1 - 소생</option>
                <option value="2">Level 2 - 긴급</option>
                <option value="3">Level 3 - 응급</option>
                <option value="4">Level 4 - 준응급</option>
                <option value="5">Level 5 - 비응급</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
            
            {/* 정렬 */}
            <div className="filter-group">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ktas">Sort by KTAS</option>
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
                <th>KTAS</th>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age/Sex</th>
                <th>Capture Time</th>
                <th>Diagnosis</th>
                <th>Chief Complaint</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className={`${selectedPatient?.id === patient.id ? "selected" : ""} ktas-${patient.ktas}`}
                  onClick={() => handlePatientClick(patient)}
                >
                  <td>
                    <span 
                      className="ktas-badge"
                      style={{
                        backgroundColor: ktasConfig[patient.ktas].bgColor,
                        color: ktasConfig[patient.ktas].color
                      }}
                    >
                      {getKtasIcon(patient.ktas)}
                      <span className="ktas-level">{patient.ktas}</span>
                      <span className="ktas-label">{ktasConfig[patient.ktas].labelKo}</span>
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
                  <td className="diagnosis-cell">{patient.diagnosis}</td>
                  <td className="complaint-cell">{patient.chiefComplaint}</td>
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
                <span 
                  className="ktas-tag"
                  style={{
                    backgroundColor: ktasConfig[selectedPatient.ktas].bgColor,
                    color: ktasConfig[selectedPatient.ktas].color
                  }}
                >
                  KTAS {selectedPatient.ktas} - {ktasConfig[selectedPatient.ktas].labelKo}
                </span>
              </div>
              
              <div className="info-grid">
                <div className="info-item">
                  <User size={14} />
                  <span className="info-label">Age/Sex</span>
                  <span className="info-value">{selectedPatient.age}세 / {selectedPatient.gender === "M" ? "남" : "여"}</span>
                </div>
                <div className="info-item">
                  <Activity size={14} />
                  <span className="info-label">Chief Complaint</span>
                  <span className="info-value">{selectedPatient.chiefComplaint}</span>
                </div>
                <div className="info-item">
                  <FileText size={14} />
                  <span className="info-label">AI Diagnosis</span>
                  <span className="info-value">{selectedPatient.diagnosis} ({selectedPatient.diagnosisKo})</span>
                </div>
                <div className="info-item">
                  <AlertCircle size={14} />
                  <span className="info-label">AI Confidence</span>
                  <span className="info-value">{selectedPatient.aiConfidence}%</span>
                </div>
              </div>

              {/* 6대 바이탈 사인 */}
              <div className="vitals-grid">
                <div className="vital-item">
                  <span className="vital-label">BP</span>
                  <span className="vital-value">{selectedPatient.bloodPressure}</span>
                </div>
                <div className="vital-item">
                  <span className="vital-label">HR</span>
                  <span className="vital-value">{selectedPatient.heartRate} bpm</span>
                </div>
                <div className="vital-item">
                  <span className="vital-label">Temp</span>
                  <span className="vital-value">{selectedPatient.temperature}</span>
                </div>
                <div className="vital-item">
                  <span className="vital-label">SpO2</span>
                  <span className="vital-value">{selectedPatient.oxygenSat}</span>
                </div>
                <div className="vital-item">
                  <span className="vital-label">RR</span>
                  <span className="vital-value">{selectedPatient.respiratoryRate || "18"}/min</span>
                </div>
                <div className="vital-item">
                  <span className="vital-label">GCS</span>
                  <span className="vital-value">{selectedPatient.gcs || "15"}</span>
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