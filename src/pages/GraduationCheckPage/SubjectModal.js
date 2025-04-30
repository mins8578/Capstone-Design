import React from 'react';
import '../../components/graduationcheckpage/subjectmodal.css';

const subjectsByCategory = {
    전공공통: [
      "자바프로그래밍1", "자바프로그래밍2", "자료구조", "컴퓨터프로그래밍", "객체지향프로그래밍",
      "운영체제", "데이터베이스", "네트워크", "웹프로그래밍", "알고리즘", "컴퓨터구조", "소프트웨어공학"
    ],
    빅데이터: [
      "빅데이터프로그래밍", "데이터마이닝", "기계학습", "딥러닝", "통계분석", "파이썬분석프로그래밍",
      "AI모델링", "데이터시각화", "클라우드기초", "데이터엔지니어링", "AI서비스기획", "빅데이터캡스톤"
    ],
    콘텐츠IT: [
      "UX/UI기획", "모바일앱기초", "게임엔진기초", "디지털콘텐츠제작", "디자인사고", "콘텐츠코딩",
      "미디어융합설계", "가상현실기초", "웹콘텐츠기획", "콘텐츠창의설계", "3D콘텐츠", "콘텐츠캡스톤"
    ],
    스마트IoT: [
      "IoT프로그래밍", "임베디드시스템", "센서네트워크", "임베디드하드웨어", "라즈베리파이활용",
      "파이썬IoT", "아두이노실습", "IoT보안", "로봇제어", "스마트센서", "무선통신", "스마트IoT캡스톤"
    ]
  };
  

const SubjectModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content large-modal">
        <button className="close-button" onClick={onClose}>×</button> {/* X 버튼 */}

        {Object.entries(subjectsByCategory).map(([category, subjects], index) => (
          <div key={index} className="category-block">
            <h3>{category} 전공</h3>
            <div className="subject-grid">
              {subjects.map((name, idx) => (
                <label key={idx}>
                  <input type="checkbox" />
                  {name}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className="save-button">저장</button>
      </div>
    </div>
  );
};

export default SubjectModal;

