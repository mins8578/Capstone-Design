import React, { useState, useEffect } from 'react';
import '../../components/graduationcheckpage/graduationcheck.css';
import SubjectModal from '../../pages/GraduationCheckPage/SubjectModal';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 인증 관련 오류를 추적하기 위한 전역 변수
let authErrorShown = false;

const GraduationCheckPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    completed: false
  });

  const [graduationData, setGraduationData] = useState({
    majorRequired: { status: false, credits: 0, requiredCredits: 60, subjects: [] },
    doubleMajorRequired: { status: false, subjects: [] },
    totalCredits: { current: 0, required: 130, status: false }
  });

  // 초기화 - 컴포넌트 마운트 시 한 번 실행
  useEffect(() => {
    authErrorShown = false;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다');
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // 사용자 정보
        const userResponse = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUserInfo({
          name: userResponse.data?.userName || 'OOO',
          completed: false
        });

      } catch (error) {
        if (!authErrorShown && error.response?.status === 401) {
          authErrorShown = true;
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('token');
          navigate('/login');
        }
        return;
      }

      try {
        // 졸업 진단 정보
        const gradResponse = await axios.post('/api/graduation-check', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (gradResponse.data) {
          setGraduationData(gradResponse.data);
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error('졸업 데이터 로딩 실패:', error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  // 모달 닫힘 후 데이터 갱신
  const handleModalClose = () => {
    setIsModalOpen(false);
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.post('/api/graduation-check', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      if (response.data) {
        setGraduationData(response.data);
      }
    }).catch(error => {
      console.error('데이터 갱신 실패:', error);
    });
  };

  return (
    <div className="container">
      <header className="page-header">
        <img src={logo} alt="한림대학교 로고" className="graduationcheck-logo" />
        <h1>한림대학교 소프트웨어학부 졸업 자가 진단</h1>
        <img src={home} alt="Home" className="home-icon" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
      </header>
      <hr className="divider" />

      <div className="button-wrapper">
        <button className="subject-button" onClick={() => setIsModalOpen(true)}>
          현재 이수 과목 등록/수정
        </button>
      </div>

      {isModalOpen && <SubjectModal onClose={handleModalClose} />}

      <section className="section">
        <h2>{userInfo.name}님의 현재 이수현황!</h2>
        <table className="check-table strong-border">
          <tbody>
            <tr className="gray-row">
              <td>졸업 요건 리스트</td>
              <td>충족 여부</td>
            </tr>
            <tr>
              <td>주전공 필수</td>
              <td className={graduationData.majorRequired.status ? "status-pass" : "status-fail"}>
                {graduationData.majorRequired.status ? "충족" : "불충족"}
              </td>
            </tr>
            <tr>
              <td>복수전공 필수</td>
              <td className={graduationData.doubleMajorRequired.status ? "status-pass" : "status-fail"}>
                {graduationData.doubleMajorRequired.status ? "충족" : "불충족"}
              </td>
            </tr>
            <tr>
              <td>전체취득 학점</td>
              <td className={graduationData.totalCredits.status ? "status-pass" : "status-fail"}>
                {graduationData.totalCredits.status ? "충족" : "불충족"}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>현재 취득 학점(전공, 전체)</h2>
        <table className="credit-table">
          <tbody>
            <tr className="gray-row">
              <td>전공 학점</td>
              <td>전체 학점</td>
            </tr>
            <tr>
              <td className="credit-value">
                {graduationData.majorRequired.credits || 0} / {graduationData.majorRequired.requiredCredits || 60}
              </td>
              <td className="credit-value">
                {graduationData.totalCredits.current || 0} / {graduationData.totalCredits.required || 130}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>주전공 필수</h2>
        <table className="subject-table">
          <thead>
            <tr className="gray-row">
              <td>과목코드</td><td>과목명</td><td>분류</td><td>수강여부</td>
            </tr>
          </thead>
          <tbody>
            {graduationData.majorRequired.subjects?.length > 0 ? (
              graduationData.majorRequired.subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.code || '-'}</td>
                  <td>{subject.name}</td>
                  <td>{subject.type || '전필'}</td>
                  <td className={subject.completed ? "status-pass" : "status-fail"}>
                    {subject.completed ? '수강완료' : '미수강'}
                  </td>
                </tr>
              ))
            ) : (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td>-</td><td>과목 정보 없음</td><td>-</td><td>-</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>복수 전공 필수</h2>
        <table className="subject-table">
          <thead>
            <tr className="gray-row">
              <td>과목코드</td><td>과목명</td><td>분류</td><td>수강여부</td>
            </tr>
          </thead>
          <tbody>
            {graduationData.doubleMajorRequired.subjects?.length > 0 ? (
              graduationData.doubleMajorRequired.subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.code || '-'}</td>
                  <td>{subject.name}</td>
                  <td>{subject.type || '전필'}</td>
                  <td className={subject.completed ? "status-pass" : "status-fail"}>
                    {subject.completed ? '수강완료' : '미수강'}
                  </td>
                </tr>
              ))
            ) : (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td>-</td><td>과목 정보 없음</td><td>-</td><td>-</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GraduationCheckPage;
