// src/pages/Profile.jsx
import React from "react";
import { 
  User, 
  Shield, 
  AlertTriangle, 
  Info, 
  Mail, 
  Building2,
  FileText,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import "./Profile.css";

function Profile() {
  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* 왼쪽: 사용자 정보 카드 */}
        <section className="profile-card user-card">
          <div className="card-header">
            <User size={20} />
            <h2>Demo Account</h2>
          </div>
          
          <div className="user-info">
            <div className="avatar-section">
              <div className="avatar-large">
                <User size={40} />
              </div>
              <span className="demo-badge">DEMO</span>
            </div>
            
            <div className="user-details">
              <div className="detail-row">
                <span className="detail-label">
                  <User size={16} />
                  Name
                </span>
                <span className="detail-value">Demo User</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <Mail size={16} />
                  Email
                </span>
                <span className="detail-value">demo@rem-xta.ai</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <Building2 size={16} />
                  Institution
                </span>
                <span className="detail-value">REM Demo Hospital</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <FileText size={16} />
                  Role
                </span>
                <span className="detail-value">Radiologist (Demo)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <Clock size={16} />
                  Session
                </span>
                <span className="detail-value session-active">Active</span>
              </div>
            </div>
          </div>

          <div className="access-info">
            <h3>Access Permissions</h3>
            <ul className="permission-list">
              <li className="permitted">
                <CheckCircle size={16} />
                View Demo Patient Data
              </li>
              <li className="permitted">
                <CheckCircle size={16} />
                AI Analysis Results
              </li>
              <li className="permitted">
                <CheckCircle size={16} />
                Heatmap Visualization
              </li>
              <li className="restricted">
                <XCircle size={16} />
                Export Clinical Reports
              </li>
              <li className="restricted">
                <XCircle size={16} />
                Modify Patient Records
              </li>
            </ul>
          </div>
        </section>

        {/* 오른쪽: AI 사용 안내 */}
        <section className="profile-card guidance-card">
          <div className="card-header">
            <Shield size={20} />
            <h2>AI Usage Guidelines</h2>
          </div>

          {/* 중요 경고 */}
          <div className="warning-banner">
            <AlertTriangle size={24} />
            <div className="warning-content">
              <strong>Important Disclaimer</strong>
              <p>REM XTA is a demonstration prototype for educational and research purposes only. It must NOT be used for actual clinical diagnosis or treatment decisions.</p>
            </div>
          </div>

          {/* AI 정보 섹션들 */}
          <div className="guidance-sections">
            <div className="guidance-item">
              <div className="guidance-icon">
                <Info size={20} />
              </div>
              <div className="guidance-content">
                <h4>What is XTA?</h4>
                <p>X-ray Triage Assist (XTA) is an AI-powered system designed to assist in prioritizing chest X-ray reviews in emergency settings by identifying potential abnormalities.</p>
              </div>
            </div>

            <div className="guidance-item">
              <div className="guidance-icon intended">
                <CheckCircle size={20} />
              </div>
              <div className="guidance-content">
                <h4>Intended Use</h4>
                <ul>
                  <li>Educational demonstration of AI capabilities</li>
                  <li>Research and development purposes</li>
                  <li>Workflow optimization studies</li>
                  <li>UI/UX evaluation for medical AI</li>
                </ul>
              </div>
            </div>

            <div className="guidance-item">
              <div className="guidance-icon warning">
                <XCircle size={20} />
              </div>
              <div className="guidance-content">
                <h4>Limitations</h4>
                <ul>
                  <li>Not FDA/CE approved for clinical use</li>
                  <li>Demo data only - not real patient information</li>
                  <li>AI predictions require professional verification</li>
                  <li>Should not replace radiologist judgment</li>
                </ul>
              </div>
            </div>

            <div className="guidance-item">
              <div className="guidance-icon">
                <Shield size={20} />
              </div>
              <div className="guidance-content">
                <h4>Data Privacy</h4>
                <p>All demonstration data is synthetic and does not contain any real patient information. No data is stored or transmitted externally during demo sessions.</p>
              </div>
            </div>
          </div>

          {/* 버전 정보 */}
          <div className="version-info">
            <div className="version-row">
              <span>Version</span>
              <span>0.1.0 (Prototype)</span>
            </div>
            <div className="version-row">
              <span>AI Model</span>
              <span>XTA-DenseNet v0.1</span>
            </div>
            <div className="version-row">
              <span>Last Updated</span>
              <span>2024.11</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;