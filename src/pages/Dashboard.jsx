// src/pages/Dashboard.jsx
import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [patients] = useState([
    {
      id: "ER-2025-001",
      name: "김민수",
      age: 67,
      arrivalTime: "2025-11-28 08:15",
      triageLevel: "Critical",
      findings: "Pneumothorax suspected, immediate intervention required",
      priority: 1
    },
    {
      id: "ER-2025-002",
      name: "이영희",
      age: 34,
      arrivalTime: "2025-11-28 08:42",
      triageLevel: "Urgent",
      findings: "Pleural effusion detected, further evaluation needed",
      priority: 2
    },
    {
      id: "ER-2025-003",
      name: "박철수",
      age: 52,
      arrivalTime: "2025-11-28 09:05",
      triageLevel: "Moderate",
      findings: "Mild pulmonary edema, monitor closely",
      priority: 3
    },
    {
      id: "ER-2025-004",
      name: "최서연",
      age: 28,
      arrivalTime: "2025-11-28 09:23",
      triageLevel: "Low",
      findings: "No significant abnormalities detected",
      priority: 4
    },
    {
      id: "ER-2025-005",
      name: "정대현",
      age: 45,
      arrivalTime: "2025-11-28 09:35",
      triageLevel: "Urgent",
      findings: "Possible rib fracture with lung contusion",
      priority: 2
    }
  ]);

  const getTriageClass = (level) => {
    switch (level) {
      case "Critical":
        return "triage-critical";
      case "Urgent":
        return "triage-urgent";
      case "Moderate":
        return "triage-moderate";
      case "Low":
        return "triage-low";
      default:
        return "";
    }
  };

  return (
    <main className="page dashboard">
      <div className="dashboard-header">
        <h2>Patient Dashboard</h2>
        <p className="dashboard-subtitle">
          Real-time X-ray Triage Monitoring
        </p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card critical">
          <span className="stat-number">
            {patients.filter(p => p.triageLevel === "Critical").length}
          </span>
          <span className="stat-label">Critical</span>
        </div>
        <div className="stat-card urgent">
          <span className="stat-number">
            {patients.filter(p => p.triageLevel === "Urgent").length}
          </span>
          <span className="stat-label">Urgent</span>
        </div>
        <div className="stat-card moderate">
          <span className="stat-number">
            {patients.filter(p => p.triageLevel === "Moderate").length}
          </span>
          <span className="stat-label">Moderate</span>
        </div>
        <div className="stat-card low">
          <span className="stat-number">
            {patients.filter(p => p.triageLevel === "Low").length}
          </span>
          <span className="stat-label">Low</span>
        </div>
      </div>

      <div className="patient-table-container">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Arrival Time</th>
              <th>Triage Level</th>
              <th>AI Findings</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="patient-row">
                <td className="patient-id">{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.arrivalTime}</td>
                <td>
                  <span className={`triage-badge ${getTriageClass(patient.triageLevel)}`}>
                    {patient.triageLevel}
                  </span>
                </td>
                <td className="findings">{patient.findings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;