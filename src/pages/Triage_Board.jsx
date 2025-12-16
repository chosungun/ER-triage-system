// src/pages/Triage_Board.jsx
// REM XTA - Triage Board (응급실 환자 리스트)

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
  Activity,
  Eye,
  ArrowRight
} from "lucide-react";
import "./Triage_Board.css";

// =============================================
// 샘플 환자 데이터 (KTAS 5단계 적용)
// =============================================
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
    respiratoryRate: "32",
    gcs: "14",
    aiConfidence: 96,
    findings: ["좌측 긴장성 기흉", "종격동 편위"]
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
    respiratoryRate: "28",
    gcs: "15",
    aiConfidence: 94,
    findings: ["우하엽 경화", "양측 침윤"]
  },
  {
    id: "P-2024-003",
    name: "박준혁",
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
    respiratoryRate: "20",
    gcs: "15",
    aiConfidence: 87,
    findings: ["심장 비대 (CTR 0.58)", "경미한 폐울혈"]
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
    respiratoryRate: "18",
    gcs: "15",
    aiConfidence: 82,
    findings: ["기관지 벽 비후"]
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
    respiratoryRate: "24",
    gcs: "15",
    aiConfidence: 91,
    findings: ["좌측 대량 흉수", "폐 하엽 무기폐"]
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
    respiratoryRate: "18",
    gcs: "15",
    aiConfidence: 82,
    findings: ["좌측 하엽 무기폐", "수술 후 변화"]
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
    respiratoryRate: "16",
    gcs: "15",
    aiConfidence: 98,
    findings: ["특이 소견 없음"]
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
    respiratoryRate: "16",
    gcs: "15",
    aiConfidence: 75,
    findings: ["폐실질 이상 없음", "늑연골 부위 압통"]
  }
];

// =============================================
// KTAS 설정 (한국형 응급환자 분류체계)
// =============================================
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

// =============================================
// 통계 계산 함수
// =============================================
const getStats = (patients) => ({
  total: patients.length,
  level1: patients.filter((p) => p.ktas === 1).length,
  level2: patients.filter((p) => p.ktas === 2).length,
  level3: patients.filter((p) => p.ktas === 3).length,
  level4: patients.filter((p) => p.ktas === 4).length,
  level5: patients.filter((p) => p.ktas === 5).length
});

// =============================================
// Triage_Board 컴포넌트
// =============================================
function Triage_Board() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKtas, setFilterKtas] = useState("all");
  const [sortBy, setSortBy] = useState("ktas");

  const stats = getStats(samplePatients);

  // 필터링 및 정렬 로직
  const filteredPatients = samplePatients
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterKtas === "all" || patient.ktas === parseInt(filterKtas);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "ktas") return a.ktas - b.ktas;
      if (sortBy === "time") return a.captureTime.localeCompare(b.captureTime);
      return 0;
    });

  // 환자 선택 핸들러
  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  // KTAS 아이콘 렌더링
  const getKtasIcon = (ktas) => {
    const Icon = ktasConfig[ktas].icon;
    return <Icon size={14} />;
  };

  return (
    <main className="triage-board">
      {/* ========== 상단: 환자 테이블 (2/3) ========== */}
      <section className="patients-section">
        <div className="section-header">
          <div className="header-left">
            <h2>Patients</h2>
            <div className="stats-badges">
              <span className="stat-badge total">
                <User size={14} />
                {stats.total}
              </span>
              <span className="stat-badge ktas-1">{stats.level1}</span>
              <span className="stat-badge ktas-2">{stats.level2}</span>
              <span className="stat-badge ktas-3">{stats.level3}</span>
              <span className="stat-badge ktas-4">{stats.level4}</span>
              <span className="stat-badge ktas-5">{stats.level5}</span>
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

            {/* KTAS 필터 */}
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

        {/* 환자 테이블 */}
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
                      <span className="ktas-label">
                        {ktasConfig[patient.ktas].labelKo}
                      </span>
                    </span>
                  </td>
                  <td className="patient-id">{patient.id}</td>
                  <td className="patient-name">{patient.name}</td>
                  <td>
                    {patient.age} / {patient.gender}
                  </td>
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

      {/* ========== 하단: 환자 상세 정보 (1/3) ========== */}
      <section className="detail-section">
        {selectedPatient ? (
          <div className="detail-content">
            {/* X-ray 썸네일 */}
            <div className="xray-thumbnail">
              <div className="xray-image">
                <Activity size={24} />
              </div>
              <span className="xray-time">
                <Clock size={10} />
                {selectedPatient.captureTime}
              </span>
            </div>

            {/* 환자 정보 */}
            <div className="patient-info-group">
              {/* 이름/나이/ID/KTAS */}
              <div className="info-header-line">
                <span className="patient-name-large">
                  {selectedPatient.name}
                </span>
                <span className="patient-meta">
                  {selectedPatient.age}세 ·{" "}
                  {selectedPatient.gender === "M" ? "남" : "여"}
                </span>
                <span className="patient-id-small">{selectedPatient.id}</span>
                <span
                  className="ktas-chip"
                  style={{
                    backgroundColor:
                      ktasConfig[selectedPatient.ktas].bgColor,
                    color: ktasConfig[selectedPatient.ktas].color
                  }}
                >
                  KTAS {selectedPatient.ktas}
                </span>
              </div>

              {/* 진단/주호소/AI */}
              <div className="diagnosis-line">
                <div className="diagnosis-item">
                  <span className="item-label">Dx</span>
                  <span className="item-value">
                    {selectedPatient.diagnosis}
                  </span>
                  <span className="item-sub">
                    ({selectedPatient.diagnosisKo})
                  </span>
                </div>
                <div className="diagnosis-item">
                  <span className="item-label">C/C</span>
                  <span className="item-value">
                    {selectedPatient.chiefComplaint}
                  </span>
                </div>
                <div className="diagnosis-item confidence">
                  <span className="item-label">AI</span>
                  <span className="confidence-value">
                    {selectedPatient.aiConfidence}%
                  </span>
                </div>
              </div>

              {/* 바이탈 사인 */}
              <div className="vitals-line">
                <div className="vital-chip">
                  <span className="vital-label">BP</span>
                  <span className="vital-value">
                    {selectedPatient.bloodPressure}
                  </span>
                </div>
                <div className="vital-chip">
                  <span className="vital-label">HR</span>
                  <span className="vital-value">
                    {selectedPatient.heartRate}
                  </span>
                </div>
                <div className="vital-chip">
                  <span className="vital-label">T</span>
                  <span className="vital-value">
                    {selectedPatient.temperature}
                  </span>
                </div>
                <div className="vital-chip">
                  <span className="vital-label">SpO2</span>
                  <span className="vital-value">
                    {selectedPatient.oxygenSat}
                  </span>
                </div>
                <div className="vital-chip">
                  <span className="vital-label">RR</span>
                  <span className="vital-value">
                    {selectedPatient.respiratoryRate}
                  </span>
                </div>
                <div className="vital-chip">
                  <span className="vital-label">GCS</span>
                  <span className="vital-value">{selectedPatient.gcs}</span>
                </div>
              </div>
            </div>

            {/* AI Findings + 버튼 */}
            <div className="detail-right">
              <div className="findings-box">
                <span className="findings-title">AI Findings</span>
                <div className="findings-list">
                  {selectedPatient.findings.map((finding, idx) => (
                    <span key={idx} className="finding-tag">
                      {finding}
                    </span>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <Link to="/followup" className="action-btn secondary">
                  <Eye size={16} />
                  Follow-up
                </Link>
                <Link to="/viewer" className="action-btn primary">
                  <ArrowRight size={16} />
                  Viewer
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <User size={40} />
            <div className="empty-text">
              <h3>Select a Patient</h3>
              <p>Click on a patient row above to view details</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Triage_Board;