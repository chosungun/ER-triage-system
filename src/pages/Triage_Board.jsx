// src/pages/Triage_Board.jsx
// REM XTA - Triage Board (KTAS 5-Level System)
// 하단 카드: 얇은 가로 레이아웃 최적화

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
// X-ray thumbnail assets
import XRAY_191 from "../assets/HQ_Original_Image_Pneumonia_191.jpg";
import XRAY_352 from "../assets/HQ_Original_Image_Pneumonia_352.jpg";
import XRAY_531 from "../assets/HQ_Original_Image_Pneumonia_531.jpg";
import XRAY_1323 from "../assets/HQ_Original_Image_Pneumonia_1323.jpg";
import XRAY_1585 from "../assets/HQ_Original_Image_Pneumonia_1585.jpg";
import XRAY_1892 from "../assets/HQ_Original_Image_Pneumonia_1892.jpg";
import XRAY_2801 from "../assets/HQ_Original_Image_Pneumonia_2801.jpg";
import XRAY_2965 from "../assets/HQ_Original_Image_Pneumonia_2965.jpg";
import XRAY_3083 from "../assets/HQ_Original_Image_Pneumonia_3083.jpg";
import "./Triage_Board.css";

// =============================================
// 샘플 환자 데이터 (KTAS 5단계 적용)
// =============================================
const samplePatientsBase = [
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
    bp: "85/50",
    hr: "128",
    temp: "36.8",
    spo2: "82",
    rr: "32",
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
    bp: "100/65",
    hr: "110",
    temp: "39.2",
    spo2: "89",
    rr: "28",
    gcs: "15",
    aiConfidence: 94,
    findings: ["우하엽 경화", "양측 침윤"]
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
    bp: "145/95",
    hr: "88",
    temp: "36.5",
    spo2: "94",
    rr: "20",
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
    bp: "118/75",
    hr: "78",
    temp: "37.4",
    spo2: "97",
    rr: "18",
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
    bp: "135/85",
    hr: "92",
    temp: "37.8",
    spo2: "90",
    rr: "24",
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
    bp: "115/72",
    hr: "78",
    temp: "37.2",
    spo2: "95",
    rr: "18",
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
    bp: "120/80",
    hr: "72",
    temp: "36.5",
    spo2: "99",
    rr: "16",
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
    bp: "125/78",
    hr: "80",
    temp: "36.6",
    spo2: "98",
    rr: "16",
    gcs: "15",
    aiConfidence: 75,
    findings: ["폐실질 이상 없음", "늑연골 부위 압통"]
  }
];

// 썸네일로 쓸 X-ray 이미지 풀 (요청한 이미지들)
const XRAY_POOL = [
  XRAY_191,
  XRAY_352,
  XRAY_531,
  XRAY_1323,
  XRAY_1585,
  XRAY_1892,
  XRAY_2801,
  XRAY_2965,
  XRAY_3083
];

// 환자 데이터에 xraySrc 자동 주입 (환자 수가 늘어나도 순환 배정)
const samplePatients = samplePatientsBase.map((p, idx) => ({
  ...p,
  xraySrc: XRAY_POOL[idx % XRAY_POOL.length]
}));

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

  // Viewer로 이동하기 전에 선택된 X-ray 정보를 "전역"(sessionStorage)으로 저장
  // (다른 파일(Viewer)에서 그대로 읽어 같은 이미지로 렌더링 가능)
  const handleOpenViewer = () => {
    if (!selectedPatient?.xraySrc) return;

    try {
      sessionStorage.setItem(
        "REM_SELECTED_XRAY",
        JSON.stringify({
          patientId: selectedPatient.id,
          name: selectedPatient.name,
          captureTime: selectedPatient.captureTime,
          xraySrc: selectedPatient.xraySrc
        })
      );
    } catch (e) {
      // storage가 막혀있거나 용량 이슈가 있어도 화면은 계속 진행되게 둠
      console.warn("Failed to persist selected xray to sessionStorage", e);
    }
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
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="ktas">Sort by KTAS</option>
                <option value="time">Sort by Time</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
        </div>

        {/* 테이블 */}
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

      {/* ========== 하단: 환자 상세 정보 (1/3) - 흰색 카드 ========== */}
      <section className="detail-section">
        {selectedPatient ? (
          <div className="detail-card">
            {/* 좌측: X-ray 썸네일 */}
            <div className="card-xray">
              <div className="xray-thumb">
                {selectedPatient?.xraySrc ? (
                  <img
                    className="xray-img"
                    src={selectedPatient.xraySrc}
                    alt={`X-ray thumbnail for ${selectedPatient.id}`}
                    loading="lazy"
                  />
                ) : (
                  <Activity size={32} />
                )}
              </div>
              <span className="xray-time">
                <Clock size={10} />
                {selectedPatient.captureTime}
              </span>
            </div>

            {/* 중앙: 고정 그리드 */}
            <div className="card-grid">
              {/* Row 1: 환자정보 | 진단 | Findings */}
              <div className="grid-cell cell-patient">
                <div className="cell-label">Patient</div>
                <div className="cell-content">
                  <span className="patient-name-lg">{selectedPatient.name}</span>
                  <span className="patient-meta">
                    {selectedPatient.age}세 · {selectedPatient.gender === "M" ? "남" : "여"} · {selectedPatient.id}
                  </span>
                  <span
                    className="ktas-chip"
                    style={{
                      backgroundColor: ktasConfig[selectedPatient.ktas].bgColor,
                      color: ktasConfig[selectedPatient.ktas].color
                    }}
                  >
                    KTAS {selectedPatient.ktas} · {ktasConfig[selectedPatient.ktas].labelKo}
                  </span>
                </div>
              </div>

              <div className="grid-cell cell-diagnosis">
                <div className="cell-label">Diagnosis</div>
                <div className="cell-content">
                  <span className="dx-main">{selectedPatient.diagnosis}</span>
                  <span className="dx-sub">{selectedPatient.diagnosisKo}</span>
                  <span className="dx-confidence">AI {selectedPatient.aiConfidence}%</span>
                </div>
              </div>

              <div className="grid-cell cell-findings">
                <div className="cell-label">AI Findings</div>
                <div className="cell-content">
                  {selectedPatient.findings.map((f, i) => (
                    <span key={i} className="finding-item">{f}</span>
                  ))}
                </div>
              </div>

              {/* Row 2: 6대 바이탈 */}
              <div className="grid-cell cell-vital">
                <div className="cell-label">BP</div>
                <div className="vital-value">{selectedPatient.bp}</div>
              </div>
              <div className="grid-cell cell-vital">
                <div className="cell-label">HR</div>
                <div className="vital-value">{selectedPatient.hr} <span className="vital-unit">bpm</span></div>
              </div>
              <div className="grid-cell cell-vital">
                <div className="cell-label">Temp</div>
                <div className="vital-value">{selectedPatient.temp}<span className="vital-unit">°C</span></div>
              </div>
              <div className="grid-cell cell-vital">
                <div className="cell-label">SpO₂</div>
                <div className="vital-value">{selectedPatient.spo2}<span className="vital-unit">%</span></div>
              </div>
              <div className="grid-cell cell-vital">
                <div className="cell-label">RR</div>
                <div className="vital-value">{selectedPatient.rr} <span className="vital-unit">/min</span></div>
              </div>
              <div className="grid-cell cell-vital">
                <div className="cell-label">GCS</div>
                <div className="vital-value">{selectedPatient.gcs}</div>
              </div>
            </div>

            {/* 우측: 액션 버튼 */}
            <div className="card-actions">
              <Link to="/followup" className="btn-action secondary">
                <Eye size={14} />
                Follow-up
              </Link>
              <Link
                to="/viewer"
                state={
                  selectedPatient
                    ? {
                        patientId: selectedPatient.id,
                        xraySrc: selectedPatient.xraySrc,
                        captureTime: selectedPatient.captureTime,
                        name: selectedPatient.name
                      }
                    : undefined
                }
                onClick={handleOpenViewer}
                className="btn-action primary"
              >
                <ArrowRight size={14} />
                Viewer
              </Link>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <User size={36} />
            <div className="empty-text">
              <span className="empty-title">Select a Patient</span>
              <span className="empty-desc">Click on a patient row to view details</span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Triage_Board;