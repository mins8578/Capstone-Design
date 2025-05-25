import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/graduationcheckpage/subjectmodal.css';

const subjectsByCategory = {
  "공통전선": [
    "이산구조론", "소프트웨어공학", "머신러닝응용", "시스템프로그래밍", "C++프로그래밍", "C프로그래밍", "데이터베이스시스템",
    "자바프로그래밍Ⅰ", "자바프로그래밍Ⅱ", "임베디드시스템", "디지털신호처리", "데이터통신", "선형대수", "자료구조",
    "소프트웨어특강II", "파이썬과학프로그래밍기초", "알고리즘", "데이터베이스기초", "오픈소스SW의이해", "오픈소스리눅스실무",
    "소프트웨어개론", "신호및시스템", "블록체인", "데이터사이언스기초", "소프트웨어특강I", "계산이론", "4차산업혁명과창업",
    "인공지능수학", "웹서버구축", "SW창업전략과펀딩", "인공지능기초", "보안솔루션운영", "초음파진단기신호처리", "강화학습",
    "머신러닝및딥러닝기초", "인공지능생체시스템개론", "3차원모델링", "현대암호", "소프트웨어캡스톤디자인"
  ],
  "빅데이터 전공": [
    "머신러닝", "데이터마이닝", "텍스트정보처리", "클라우드컴퓨팅", "딥러닝기초", "빅데이터개론",
    "데이터시각화", "네트워크보안", "시스템보안"
  ],
  "콘텐츠IT 전공": [
    "컴퓨터그래픽스", "영상처리프로그래밍", "게임프로그래밍", "HCI", "VR/AR/게임제작기초", "멀티미디어개론",
    "가상현실과증강현실", "영상처리와딥러닝"
  ],
  "스마트IoT 전공": [
    "모바일프로그래밍", "디지털통신", "IOT플랫폼설계", "IOT네트워크", "모바일센서공학",
    "통신네트워크시스템"
  ]
};

const SubjectModal = ({ onClose }) => {
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  // 모달이 열릴 때마다 이수 과목 불러오기
  useEffect(() => {
    const fetchUserSubjects = async () => {
      if (!token) {
        alert('로그인이 필요합니다.');
        return; // onClose 제거하여 useEffect 의존성 경고 방지
      }

      try {
        setIsLoading(true);
        const response = await axios.get('/api/subjects', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data?.subjects) {
          const userSubjects = {};
          response.data.subjects.forEach(subject => {
            userSubjects[subject.trim()] = true;
          });
          setSelectedSubjects(userSubjects);
        }
      } catch (error) {
        console.error('과목 정보 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSubjects();
  }, [token]);

  // 체크 상태 토글
  const handleSubjectChange = (subject) => {
    const trimmed = subject.trim();
    setSelectedSubjects(prev => ({
      ...prev,
      [trimmed]: !prev[trimmed]
    }));
  };

  // 저장 처리
  const handleSave = async () => {
    if (!token) return;

    try {
      setIsLoading(true);

      const selectedList = Object.keys(selectedSubjects)
        .filter(subject => selectedSubjects[subject])
        .map(subject => subject.trim());

      await axios.post('/api/subjects', {
        subjects: selectedList
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('이수 과목이 저장되었습니다.');
      onClose();
    } catch (error) {
      console.error('과목 저장 실패:', error);
      alert('이수 과목 저장에 실패했습니다.');
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
                <h3>{category}</h3>
                <div className="subject-grid">
                  {subjects.map((name, idx) => {
                    const trimmedName = name.trim();
                    return (
                      <label key={idx}>
                        <input
                          type="checkbox"
                          checked={!!selectedSubjects[trimmedName]}
                          onChange={() => handleSubjectChange(trimmedName)}
                        />
                        {name}
                      </label>
                    );
                  })}
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
