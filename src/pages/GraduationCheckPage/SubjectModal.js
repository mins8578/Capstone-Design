import React from 'react';
import '../../components/graduationcheckpage/subjectmodal.css';

const subjectsByCategory = {
    전공공통: [
      "이산구조론", "소프트웨어공학", "머신러닝응용", "시스템프로그래밍", "C++프로그래밍", "C프로그래밍", "데이터베이스시스템",
      "자바프로그래밍Ⅰ", "자바프로그래밍Ⅱ", "임베디드시스템", "디지털신호처리", "데이터통신", "선형대수", "자료구조",
      "소프트웨어특강II", "파이썬과학프로그래밍기초", "알고리즘", "데이터베이스기초", "오픈소스SW의이해", "오픈소스리눅스실무",
      "소프트웨어개론", "신호및시스템", "블록체인", "데이터사이언스기초", "소프트웨어특강I", "계산이론", "4차산업혁명과창업", 
      "인공지능수학", "웹서버구축", "SW창업전략과펀딩", "인공지능기초", "보안솔루션운영", "초음파진단기신호처리", "강화학습",
      "머신러닝및딥러닝기초", "인공지능생체시스템개론", "3차원모델링", "현대암호"
    ],
    빅데이터: [
      "머신러닝", "데이터마이닝", "텍스트정보처리", "클라우드컴퓨팅", "딥러닝기초", "빅데이터개론",
      "데이터시각화", "네트워크보안", "소프트웨어캡스톤디자인", "시스템보안"
    ],
    콘텐츠IT: [
      "컴퓨터그래픽스", "영상처리프로그래밍", "게임프로그래밍", "HCI", "VR/AR/게임제작기초", "멀티미디어개론",
      "가상현실과증강현실", "영상처리와딥러닝"
    ],
    스마트IoT: [
      "모바일프로그래밍", "디지털통신", "IOT플랫폼설계", "IOT네트워크", "모바일센서공학",
      "통신네트워크시스템"
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