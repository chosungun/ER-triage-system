// src/pages/ProductTour.jsx
import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft,
  LayoutGrid,
  Eye,
  Brain,
  Shield,
  Zap,
  CheckCircle
} from "lucide-react";
import "./ProductTour.css";

const tourSteps = [
  {
    id: 1,
    title: "Triage Board",
    icon: LayoutGrid,
    description: "AI가 분석한 환자들을 위험도 순으로 정렬하여 보여줍니다. 긴급한 환자를 빠르게 식별할 수 있습니다.",
    features: [
      "위험도 자동 분류",
      "실시간 환자 목록 업데이트",
      "원클릭 상세 정보 확인"
    ]
  },
  {
    id: 2,
    title: "X-ray Viewer",
    icon: Eye,
    description: "고해상도 X-ray 이미지를 확인하고, AI 분석 결과를 히트맵으로 시각화합니다.",
    features: [
      "확대/축소 및 회전",
      "밝기/대비 조절",
      "AI 히트맵 오버레이"
    ]
  },
  {
    id: 3,
    title: "AI Analysis",
    icon: Brain,
    description: "딥러닝 모델이 흉부 X-ray를 분석하여 14가지 이상 소견을 자동으로 탐지합니다.",
    features: [
      "14가지 병변 탐지",
      "신뢰도 점수 제공",
      "GradCAM 시각화"
    ]
  },
  {
    id: 4,
    title: "Safety & Privacy",
    icon: Shield,
    description: "환자 데이터는 로컬에서만 처리되며, 외부로 전송되지 않습니다.",
    features: [
      "로컬 데이터 처리",
      "HIPAA 준수 설계",
      "암호화된 저장"
    ]
  }
];

function ProductTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tourSteps[currentStep];
  const Icon = step.icon;

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % tourSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + tourSteps.length) % tourSteps.length);
  };

  return (
    <main className="tour-page">
      <div className="tour-container">
        {/* 헤더 */}
        <div className="tour-header">
          <HelpCircle size={24} />
          <h1>Product Tour</h1>
          <p>REM XTA의 주요 기능을 알아보세요</p>
        </div>

        {/* 진행 표시 */}
        <div className="tour-progress">
          {tourSteps.map((s, index) => (
            <button
              key={s.id}
              className={`progress-dot ${index === currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""}`}
              onClick={() => setCurrentStep(index)}
            >
              {index < currentStep ? <CheckCircle size={16} /> : index + 1}
            </button>
          ))}
        </div>

        {/* 콘텐츠 */}
        <div className="tour-content">
          <div className="tour-icon-wrapper">
            <Icon size={48} strokeWidth={1.5} />
          </div>
          
          <h2>{step.title}</h2>
          <p className="tour-description">{step.description}</p>

          <div className="tour-features">
            <h3>주요 기능</h3>
            <ul>
              {step.features.map((feature, index) => (
                <li key={index}>
                  <Zap size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="tour-navigation">
          <button className="nav-btn" onClick={prevStep}>
            <ChevronLeft size={20} />
            이전
          </button>
          <span className="step-indicator">
            {currentStep + 1} / {tourSteps.length}
          </span>
          <button className="nav-btn primary" onClick={nextStep}>
            다음
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductTour;