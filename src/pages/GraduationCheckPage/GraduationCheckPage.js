import React, { useState, useEffect } from 'react';
import '../../components/graduationcheckpage/graduationcheck.css';
import SubjectModal from '../../pages/GraduationCheckPage/SubjectModal';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

let authErrorShown = false;

const GraduationCheckPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', completed: false });
  const [majorSubjects, setMajorSubjects] = useState([]);
  const [doubleMajorSubjects, setDoubleMajorSubjects] = useState([]);

  // 과목별 취득 학점 (3학점 기준)
  const getCredits = subjects => subjects.filter(s => s.completed).length * 3;

  const majorCredits = getCredits(majorSubjects);
  const doubleMajorCredits = getCredits(doubleMajorSubjects);

  const requiredCredits = 60;
  const isMajorRequirementMet = majorSubjects.length > 0 && majorSubjects.every(s => s.completed);
  const isDoubleMajorRequirementMet = doubleMajorSubjects.length > 0 && doubleMajorSubjects.every(s => s.completed);

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
        const userRes = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo({ name: userRes.data?.userName || 'OOO', completed: false });

        const [majorRes, doubleMajorRes] = await Promise.all([
          axios.post('/api/graduation-check', {}, { headers: { Authorization: `Bearer ${token}` } }),
          axios.post('/api/graduation-check02', {}, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setMajorSubjects(Array.isArray(majorRes.data) ? majorRes.data : []);
        setDoubleMajorSubjects(Array.isArray(doubleMajorRes.data) ? doubleMajorRes.data : []);
      } catch (error) {
        if (!authErrorShown && error.response?.status === 401) {
          authErrorShown = true;
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('데이터 로딩 실패:', error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    const token = localStorage.getItem('token');
    if (!token) return;

    Promise.all([
      axios.post('/api/graduation-check', {}, { headers: { Authorization: `Bearer ${token}` } }),
      axios.post('/api/graduation-check02', {}, { headers: { Authorization: `Bearer ${token}` } }),
    ]).then(([majorRes, doubleMajorRes]) => {
      setMajorSubjects(Array.isArray(majorRes.data) ? majorRes.data : []);
      setDoubleMajorSubjects(Array.isArray(doubleMajorRes.data) ? doubleMajorRes.data : []);
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
              <td className={isMajorRequirementMet ? "status-pass" : "status-fail"}>
                {isMajorRequirementMet ? "충족" : "불충족"}
              </td>
            </tr>
            <tr>
              <td>복수전공 필수</td>
              <td className={isDoubleMajorRequirementMet ? "status-pass" : "status-fail"}>
                {isDoubleMajorRequirementMet ? "충족" : "불충족"}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>현재 취득 학점(전공, 복수전공)</h2>
        <table className="credit-table">
          <tbody>
            <tr className="gray-row">
              <td>전공 학점</td>
              <td>복수전공 학점</td>
            </tr>
            <tr>
              <td className="credit-value">{majorCredits} / {requiredCredits}</td>
              <td className="credit-value">{doubleMajorCredits} / {requiredCredits}</td>
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
            {majorSubjects.length > 0 ? (
              majorSubjects.map((subject, index) => (
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
            {doubleMajorSubjects.length > 0 ? (
              doubleMajorSubjects.map((subject, index) => (
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
