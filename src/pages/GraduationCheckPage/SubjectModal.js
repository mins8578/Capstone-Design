import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  // 기존 선택된 과목 데이터 불러오기
  useEffect(() => {
    const fetchUserSubjects = async () => {
      try {
        // 토큰 확인
        if (!token) {
          alert('로그인이 필요합니다.');
          onClose();
          return;
        }

        setIsLoading(true);

        // 사용자의 이수 과목 목록 가져오기
        const response = await axios.get('/api/subjects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.subjects) {
          // 응답 데이터를 상태로 설정
          const userSubjects = {};
          response.data.subjects.forEach(subject => {
            userSubjects[subject] = true;
          });
          setSelectedSubjects(userSubjects);
        }
      } catch (error) {
        console.error('과목 정보 로딩 실패:', error);
        // 에러가 발생해도 빈 모달을 보여주기 위해 에러 처리 간소화
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSubjects();
  }, [token, onClose]);

  // 과목 체크박스 변경 핸들러
  const handleSubjectChange = (subject) => {
    setSelectedSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    try {
      setIsLoading(true);

      // 선택된 과목 이름 배열로 변환
      const selectedSubjectsList = Object.keys(selectedSubjects).filter(subject => selectedSubjects[subject]);

      // 백엔드에 선택된 과목 목록 저장 요청
      await axios.post('/api/subjects', {
        subjects: selectedSubjectsList
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('이수 과목이 저장되었습니다.');
      onClose(); // 모달 닫기
      
      // 필요시 부모 컴포넌트에서 데이터 갱신 (이 부분은 GraduationCheckPage에서 refetch 함수를 props로 받아와 호출할 수 있음)
      // if (onSave) onSave();
    } catch (error) {
      console.error('과목 저장 실패:', error);
      alert('이수 과목 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="subject-modal-overlay">
      <div className="subject-modal-content large-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">수강 과목 선택</h2>

        {isLoading ? (
          <div className="loading-spinner">데이터를 불러오는 중...</div>
        ) : (
          <>
            {Object.entries(subjectsByCategory).map(([category, subjects], index) => (
              <div key={index} className="category-block">
                <h3>{category} 전공</h3>
                <div className="subject-grid">
                  {subjects.map((name, idx) => (
                    <label key={idx}>
                      <input 
                        type="checkbox" 
                        checked={!!selectedSubjects[name]} 
                        onChange={() => handleSubjectChange(name)}
                      />
                      {name}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button 
              className="save-button" 
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? '저장 중...' : '저장하기'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SubjectModal;