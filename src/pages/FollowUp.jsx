import React, { useState } from "react";
import "./FollowUp.css";

// 샘플 환자 데이터
const samplePatients = [
  {
    id: "P-2024-001",
    name: "김영수",
    age: 67,
    gender: "남",
    priority: "critical",
    score: 92,
    diagnosis: "Pneumonia (폐렴) 의심",
    status: "pending",
    time: "09:15",
    chiefComplaint: "호흡곤란, 발열",
    bloodPressure: "140/90",
    heartRate: "98",
    temperature: "38.5°C",
    oxygenSat: "94%",
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
    gender: "여",
    priority: "high",
    score: 78,
    diagnosis: "Cardiomegaly (심비대)",
    status: "analyzed",
    time: "09:32",
    chiefComplaint: "흉통, 호흡곤란",
    bloodPressure: "150/95",
    heartRate: "88",
    temperature: "36.8°C",
    oxygenSat: "97%",
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
    gender: "남",
    priority: "normal",
    score: 45,
    diagnosis: "Nodule (결절) 발견",
    status: "reviewing",
    time: "10:05",
    chiefComplaint: "건강검진",
    bloodPressure: "125/80",
    heartRate: "72",
    temperature: "36.5°C",
    oxygenSat: "99%",
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
    gender: "여",
    priority: "low",
    score: 22,
    diagnosis: "정상 소견",
    status: "analyzed",
    time: "10:28",
    chiefComplaint: "건강검진",
    bloodPressure: "118/75",
    heartRate: "68",
    temperature: "36.4°C",
    oxygenSat: "99%",
    recommendations: [
      "특이 소견 없음",
      "정기 검진 권장"
    ]
  },
  {
    id: "P-2024-005",
    name: "정민준",
    age: 71,
    gender: "남",
    priority: "critical",
    score: 88,
    diagnosis: "Pleural Effusion (흉수)",
    status: "pending",
    time: "10:45",
    chiefComplaint: "호흡곤란, 기침",
    bloodPressure: "135/85",
    heartRate: "92",
    temperature: "37.8°C",
    oxygenSat: "92%",
    recommendations: [
      "흉수 천자 고려",
      "원인 감별 위한 추가 검사",
      "호흡기내과 협진"
    ]
  }
];

// 우선순위별 통계 계산
const getStats = (patients) => {
  return {
    total: patients.length,
    critical: patients.filter(p => p.priority === "critical").length,
    high: patients.filter(p => p.priority === "high").length,
    pending: patients.filter(p => p.status === "pending").length
  };
};

// 우선순위 라벨
const priorityLabels = {
  critical: "긴급",
  high: "높음",
  normal: "보통",
  low: "낮음"
};

// 상태 라벨
const statusLabels = {
  pending: "대기중",
  analyzed: "분석완료",
  reviewing: "검토중"
};

function FollowUp() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const stats = getStats(samplePatients);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const getPriorityClass = (score) => {
    if (score >= 80) return "critical";
    if (score >= 60) return "high";
    if (score >= 40) return "normal";
    return "low";
  };

  return (
    <main className="dashboard">
      {/* 환자 테이블 섹션 */}
      <section className="patient-table-section">
        <div className="section-header">
          <h2>🏥 환자 대기 목록</h2>
          <div className="stats-row">
            <span>전체<strong>{stats.total}</strong>명</span>
            <span className="stat-divider">|</span>
            <span>긴급<strong style={{ color: "#E85468" }}>{stats.critical}</strong></span>
            <span className="stat-divider">|</span>
            <span>높음<strong style={{ color: "#F7B84B" }}>{stats.high}</strong></span>
            <span className="stat-divider">|</span>
            <span>대기<strong style={{ color: "#3D6BFF" }}>{stats.pending}</strong></span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                <th>우선순위</th>
                <th>환자명</th>
                <th>나이/성별</th>
                <th>AI 위험도</th>
                <th>AI 진단</th>
                <th>상태</th>
                <th>등록시간</th>
              </tr>
            </thead>
            <tbody>
              {samplePatients.map((patient) => (
                <tr
                  key={patient.id}
                  className={selectedPatient?.id === patient.id ? "selected" : ""}
                  onClick={() => handlePatientClick(patient)}
                >
                  <td>
                    <span className={`priority-badge ${patient.priority}`}>
                      {priorityLabels[patient.priority]}
                    </span>
                  </td>
                  <td className="patient-name">{patient.name}</td>
                  <td>{patient.age}세 / {patient.gender}</td>
                  <td>
                    <div className="score-cell">
                      <div className="score-bar-mini">
                        <div
                          className={`score-fill-mini ${getPriorityClass(patient.score)}`}
                          style={{ width: `${patient.score}%` }}
                        />
                      </div>
                      <span className="score-text">{patient.score}%</span>
                    </div>
                  </td>
                  <td className="diagnosis-cell">{patient.diagnosis}</td>
                  <td>
                    <span className={`status-badge ${patient.status}`}>
                      <span className="status-dot" />
                      {statusLabels[patient.status]}
                    </span>
                  </td>
                  <td className="time-cell">{patient.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 환자 상세 섹션 */}
      <section className="patient-detail-section">
        {selectedPatient ? (
          <div className="detail-compact">
            {/* X-ray 이미지 */}
            <div className="xray-compact">
              <span className="xray-label">Chest X-ray</span>
              <div className="xray-viewer-compact">
                <div className="xray-placeholder-compact">
                  <div className="xray-icon-compact">🩻</div>
                  <p>X-ray 이미지</p>
                </div>
              </div>
            </div>

            {/* 환자 정보 */}
            <div className="info-compact">
              <h3>
                {selectedPatient.name}
                <span className="patient-id-badge">{selectedPatient.id}</span>
              </h3>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">나이</span>
                  <span className="info-value">{selectedPatient.age}세</span>
                </div>
                <div className="info-row">
                  <span className="info-label">성별</span>
                  <span className="info-value">{selectedPatient.gender}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">혈압</span>
                  <span className="info-value">{selectedPatient.bloodPressure}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">맥박</span>
                  <span className="info-value">{selectedPatient.heartRate} bpm</span>
                </div>
                <div className="info-row">
                  <span className="info-label">체온</span>
                  <span className="info-value">{selectedPatient.temperature}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">산소포화도</span>
                  <span className="info-value">{selectedPatient.oxygenSat}</span>
                </div>
                <div className="info-row full-width">
                  <span className="info-label">주호소</span>
                  <span className="info-value">{selectedPatient.chiefComplaint}</span>
                </div>
              </div>
            </div>

            {/* AI 분석 결과 */}
            <div className="analysis-compact">
              <span className="analysis-label">AI Analysis</span>
              <div className={`score-circle-compact ${getPriorityClass(selectedPatient.score)}`}>
                <span className="score-big">{selectedPatient.score}</span>
                <span className="score-unit">%</span>
              </div>
              <p className="diagnosis-text">{selectedPatient.diagnosis}</p>
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${selectedPatient.score}%` }}
                />
              </div>
              <span className="confidence-text">AI 신뢰도: {Math.min(95, selectedPatient.score + 5)}%</span>
            </div>

            {/* 권장 조치 */}
            <div className="actions-compact">
              <h4>권장 조치</h4>
              <ul>
                {selectedPatient.recommendations.map((rec, index) => (
                  <li key={index}>
                    <span className="action-icon">→</span>
                    {rec}
                  </li>
                ))}
              </ul>
              <button className="action-button">상세 분석 보기</button>
            </div>
          </div>
        ) : (
          <div className="empty-compact">
            <div className="empty-icon">👆</div>
            <p>환자를 선택하면 상세 정보가 표시됩니다</p>
            <span className="empty-hint">위 테이블에서 환자를 클릭하세요</span>
          </div>
        )}
      </section>
    </main>
  );
}

export default FollowUp;
