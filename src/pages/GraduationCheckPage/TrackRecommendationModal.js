import React, { useState } from 'react';
import '../../components/graduationcheckpage/trackrecommendationmodal.css';

const TrackRecommendationModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(1);

  // 학년별 추천 트랙 데이터
  const trackData = {
    1: {
      title: '1학년 전공트랙 추천',
      tracks: [
        {
          name: '전공 공통 트랙',
          subjects: [
            { code: '506819', name: '자바프로그래밍I', credit: 3 },
            { code: '506820', name: '자바프로그래밍II', credit: 3 },
            { code: '511644', name: 'C프로그래밍', credit: 3 },
            { code: '506808', name: 'C++프로그래밍', credit: 3 },
            { code: '506214', name: '이산구조론', credit: 3 },
            { code: '603115', name: '소프트웨어세미나I', credit: 3 },
            { code: '603113', name: '소프트웨어세미나II', credit: 3 },
            { code: '511601', name: '선형대수', credit: 3 },
            { code: '603114', name: '오픈소스리눅스실무', credit: 3 },
            { code: '603109', name: '프로그래밍스튜디오', credit: 3 },
            { code: '603119', name: '소프트웨어개론', credit: 3 },
            { code: '603110', name: '알고리즘', credit: 3 },
            { code: '511643', name: '자료구조', credit: 3 },
            { code: '506204', name: '컴퓨터구조', credit: 3 },
            { code: '511215', name: '논리설계 및 실험', credit: 3 },
            { code: '506829', name: '임베디드 시스템', credit: 3 },
            { code: '514101', name: '회로이론 및 실험', credit: 3 },
            { code: '511502', name: '데이터통신', credit: 3 },
            { code: '603126', name: '데이터사이언스기초', credit: 3 },
            { code: '603111', name: '데이터베이스기초', credit: 3 },
            { code: '603121', name: '신호 및 시스템', credit: 3 },
            { code: '603112', name: '오픈소스SW의 이해', credit: 3 }
          ]
        }
      ],
      description: '1학년은 소프트웨어 학부 기초 과목을 중심으로 수강하는 것이 좋습니다. 컴퓨터 구조와 프로그래밍 기초를 통해 학문의 기초를 다지는 시기입니다.'
    },
    2: {
      title: '2학년 전공트랙 추천',
      tracks: [
        {
          name: '전공 공통 트랙',
          subjects: [
            { code: '506819', name: '자바프로그래밍I', credit: 3 },
            { code: '506820', name: '자바프로그래밍II', credit: 3 },
            { code: '511644', name: 'C프로그래밍', credit: 3 },
            { code: '506808', name: 'C++프로그래밍', credit: 3 },
            { code: '506214', name: '이산구조론', credit: 3 },
            { code: '603115', name: '소프트웨어세미나I', credit: 3 },
            { code: '603113', name: '소프트웨어세미나II', credit: 3 },
            { code: '511601', name: '선형대수', credit: 3 },
            { code: '603114', name: '오픈소스리눅스실무', credit: 3 },
            { code: '603109', name: '프로그래밍스튜디오', credit: 3 },
            { code: '603119', name: '소프트웨어개론', credit: 3 },
            { code: '603110', name: '알고리즘', credit: 3 },
            { code: '511643', name: '자료구조', credit: 3 },
            { code: '506204', name: '컴퓨터구조', credit: 3 },
            { code: '511215', name: '논리설계 및 실험', credit: 3 },
            { code: '506829', name: '임베디드 시스템', credit: 3 },
            { code: '514101', name: '회로이론 및 실험', credit: 3 },
            { code: '511502', name: '데이터통신', credit: 3 },
            { code: '603126', name: '데이터사이언스기초', credit: 3 },
            { code: '603111', name: '데이터베이스기초', credit: 3 },
            { code: '603121', name: '신호 및 시스템', credit: 3 },
            { code: '603112', name: '오픈소스SW의 이해', credit: 3 }
          ]
        },
        {
          name: '빅데이터 트랙(빅데이터 전공)',
          subjects: [
            { code: '603126', name: '데이터사이언스기초', credit: 3 },
            { code: '603111', name: '데이터베이스기초', credit: 3 }
          ]
        },
        {
          name: '인공지능 트랙(빅데이터 전공)',
          subjects: [
            { code: '603111', name: '데이터베이스기초', credit: 3 },
            { code: '603134', name: '인공지능수학', credit: 3 }
          ]
        },
        {
          name: '게임개발 트랙(콘텐츠IT 전공)',
          subjects: [
            { code: '601101', name: 'VR/AR/게임제작기초', credit: 3 }
          ]
        },
        {
          name: 'VR/AR 트랙(콘텐츠IT 전공)',
          subjects: [
            { code: '601101', name: 'VR/AR/게임제작기초', credit: 3 }
          ]
        },
        {
          name: '임베디드 트랙(스마트IoT 전공)',
          subjects: [
            { code: '511502', name: '데이터 통신', credit: 3 },
            { code: '603134', name: '인공지능수학', credit: 3 },
            { code: '506829', name: '임베디드시스템', credit: 3 },
            { code: '511321', name: '디지털신호처리', credit: 3 }
          ]
        },
        {
          name: '통신/보안 트랙(스마트IoT 전공)',
          subjects: [
            { code: '511502', name: '데이터 통신', credit: 3 }
          ]
        }
      ],
      description: '2학년부터는 웹/앱 개발 트랙과 인공지능 트랙 중 관심 분야를 선택하여 집중하는 것이 좋습니다. 데이터베이스와 알고리즘은 공통 필수 과목입니다.'
    },
    3: {
      title: '3학년 전공트랙 추천',
      tracks: [
        {
          name: '전공 공통 트랙',
          subjects: [
            { code: '506703', name: '윈도우프로그래밍', credit: 3 },
            { code: '506812', name: '모바일프로그래밍', credit: 3 },
            { code: '506702', name: '웹프로그래밍', credit: 3 },
            { code: '514126', name: '컴퓨터네트워크', credit: 3 },
            { code: '506314', name: '운영체제', credit: 3 },
            { code: '506319', name: '프로그래밍어론', credit: 3 },
            { code: '506415', name: '소프트웨어공학', credit: 3 },
            { code: '506419', name: '컴퓨터그래픽스', credit: 3 },
            { code: '506417', name: '인공지능', credit: 3 },
            { code: '603128', name: '계산이론', credit: 3 },
            { code: '515103', name: '정보보호론', credit: 3 },
            { code: '603127', name: '소프트웨어특강I', credit: 3 },
            { code: '603105', name: '소프트웨어특강II', credit: 3 },
            { code: '600007', name: '데이터베이스시스템', credit: 3 },
            { code: '601109', name: '영상처리와딥러닝', credit: 3 },
            { code: '602101', name: '디지털통신', credit: 3 },
            { code: '602103', name: '네트워크보안', credit: 3 },
            { code: '602106', name: 'IoT네트워크', credit: 3 },
            { code: '602107', name: '모바일센서공학', credit: 3 },
            { code: '603125', name: '블록체인', credit: 3 },
            { code: '603135', name: '웹서버구축', credit: 3 },
            { code: '603141', name: '보안솔루션운영', credit: 3 },
            { code: '603142', name: '초음파진단기신호처리', credit: 3 },
            { code: '506836', name: 'HCI', credit: 3 },
            { code: '603136', name: 'SW창업전략과펀딩', credit: 3 },
            { code: '603144', name: '강화학습', credit: 3 },
            { code: '603132', name: '통신네트워크시스템', credit: 3 },
            { code: '603103', name: '소프트웨어캡스톤디자인', credit: 3 }
          ]
        },
        {
          name: '빅데이터 트랙(빅데이터 전공)',
          subjects: [
            { code: '600008', name: '데이터시각화', credit: 3 },
            { code: '600001', name: '데이터마이닝', credit: 3 },
            { code: '506209', name: '머신러닝', credit: 3 },
            { code: '600003', name: '클라우드컴퓨팅', credit: 3 },
            { code: '600005', name: '빅데이터개론', credit: 3 }
          ]
        },
        {
          name: '인공지능 트랙(빅데이터 전공)',
          subjects: [
            { code: '506417', name: '머신러닝응용', credit: 3 },
            { code: '600001', name: '데이터마이닝', credit: 3 },
            { code: '506209', name: '머신러닝', credit: 3 },
            { code: '600002', name: '텍스트정보처리', credit: 3 },
            { code: '600004', name: '딥러닝이론 및 응용', credit: 3 }
          ]
        },
        {
          name: '게임개발 트랙(콘텐츠IT 전공)',
          subjects: [
            { code: '506419', name: '컴퓨터그래픽스', credit: 3 },
            { code: '601104', name: '게임프로그래밍', credit: 3 }
          ]
        },
        {
          name: 'VR/AR 트랙(콘텐츠IT 전공)',
          subjects: [
            { code: '601108', name: '가상현실과 증강현실', credit: 3 }
          ]
        },
        {
          name: '임베디드 트랙(스마트IoT 전공)',
          subjects: [
            { code: '602107', name: '모바일센서공학', credit: 3 },
            { code: '511307', name: '전자회로', credit: 3 },
            { code: '602104', name: 'IoT플랫폼설계', credit: 3 },
            { code: '506812', name: '모바일프로그래밍', credit: 3 },
            { code: '506209', name: '머신러닝', credit: 3 }
          ]
        },
        {
          name: '통신/보안 트랙(스마트IoT 전공)',
          subjects: [
            { code: '603132', name: '통신네트워크시스템', credit: 3 },
            { code: '603125', name: '블록체인', credit: 3 },
            { code: '603130', name: '시스템보안', credit: 3 },
            { code: '602106', name: 'IoT네트워크', credit: 3 },
            { code: '602104', name: 'IoT플랫폼설계', credit: 3 },
            { code: '602103', name: '네트워크보안', credit: 3 }
          ]
        }
      ],
      description: '3학년은 전공 심화 과정으로, 선택한 트랙에 맞는 심화 과목을 수강하는 것이 좋습니다. 이 시기에는 산학 협력 프로젝트나 인턴십 경험도 고려해보세요.'
    },
    4: {
      title: '4학년 전공트랙 추천',
      tracks: [
        {
          name: '전공 공통 트랙',
          subjects: [
            { code: '506703', name: '윈도우프로그래밍', credit: 3 },
            { code: '506812', name: '모바일프로그래밍', credit: 3 },
            { code: '506702', name: '웹프로그래밍', credit: 3 },
            { code: '514126', name: '컴퓨터네트워크', credit: 3 },
            { code: '506314', name: '운영체제', credit: 3 },
            { code: '506319', name: '프로그래밍어론', credit: 3 },
            { code: '506415', name: '소프트웨어공학', credit: 3 },
            { code: '506419', name: '컴퓨터그래픽스', credit: 3 },
            { code: '506417', name: '인공지능', credit: 3 },
            { code: '603128', name: '계산이론', credit: 3 },
            { code: '515103', name: '정보보호론', credit: 3 },
            { code: '603127', name: '소프트웨어특강I', credit: 3 },
            { code: '603105', name: '소프트웨어특강II', credit: 3 },
            { code: '600007', name: '데이터베이스시스템', credit: 3 },
            { code: '601109', name: '영상처리와딥러닝', credit: 3 },
            { code: '602101', name: '디지털통신', credit: 3 },
            { code: '602103', name: '네트워크보안', credit: 3 },
            { code: '602106', name: 'IoT네트워크', credit: 3 },
            { code: '602107', name: '모바일센서공학', credit: 3 },
            { code: '603125', name: '블록체인', credit: 3 },
            { code: '603135', name: '웹서버구축', credit: 3 },
            { code: '603141', name: '보안솔루션운영', credit: 3 },
            { code: '603142', name: '초음파진단기신호처리', credit: 3 },
            { code: '506836', name: 'HCI', credit: 3 },
            { code: '603136', name: 'SW창업전략과펀딩', credit: 3 },
            { code: '603144', name: '강화학습', credit: 3 },
            { code: '603132', name: '통신네트워크시스템', credit: 3 },
            { code: '603103', name: '소프트웨어캡스톤디자인', credit: 3 }
          ]
        }
      ],
      description: '4학년은 취업 또는 대학원 진학 준비를 위한 시기입니다. 실무 경험을 쌓을 수 있는 캡스톤 디자인과 현장 실습은 필수적으로 수강하는 것이 좋습니다.'
    }
  };

  return (
    <div className="track-modal-overlay">
      <div className="track-modal">
        <div className="track-modal-header">
          <h2>학년별 전공트랙 추천</h2>
          <button className="track-close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="track-modal-tabs">
          {[1, 2, 3, 4].map(year => (
            <button 
              key={year} 
              className={`track-tab ${activeTab === year ? 'active' : ''}`}
              onClick={() => setActiveTab(year)}
            >
              {year}학년
            </button>
          ))}
        </div>
        
        <div className="track-modal-content">
          <h3>{trackData[activeTab].title}</h3>
          
          <div className="track-description">
            {trackData[activeTab].description}
          </div>
          
          {trackData[activeTab].tracks.map((track, index) => (
            <div key={index} className="track-card">
              <h4>{track.name}</h4>
              <table className="track-table">
                <thead>
                  <tr className="gray-row">
                    <th>과목코드</th>
                    <th>과목명</th>
                    <th>학점</th>
                  </tr>
                </thead>
                <tbody>
                  {track.subjects.map((subject, idx) => (
                    <tr key={idx}>
                      <td>{subject.code}</td>
                      <td>{subject.name}</td>
                      <td>{subject.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackRecommendationModal;