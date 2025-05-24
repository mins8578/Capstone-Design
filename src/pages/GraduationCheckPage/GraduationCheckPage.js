import React, { useState, useEffect } from 'react';
import '../../components/graduationcheckpage/graduationcheck.css';
import SubjectModal from '../../pages/GraduationCheckPage/SubjectModal';
import TrackRecommendationModal from './TrackRecommendationModal';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import trackIcon from '../../asset/학년별 전공트랙.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

let authErrorShown = false;

const GraduationCheckPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', completed: false });
  const [majorSubjects, setMajorSubjects] = useState([]);
  const [doubleMajorSubjects, setDoubleMajorSubjects] = useState([]);
  const [majorScore, setMajorScore] = useState(0);
  const [doubleMajorScore, setDoubleMajorScore] = useState(0);
  const [requirementStatus, setRequirementStatus] = useState({
    "주전공 필수": "불충족",
    "복수전공 필수": "불충족"
  });

  const requiredCredits = 33;

  useEffect(() => {
    authErrorShown = false;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다');
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo({ name: userRes.data?.userName || 'OOO', completed: false });

        const [majorRes, doubleMajorRes, scoreRes, resultRes] = await Promise.all([
          axios.post('/api/graduation-check', {}, { headers: { Authorization: `Bearer ${token}` } }),
          axios.post('/api/graduation-check02', {}, { headers: { Authorization: `Bearer ${token}` } }),
          axios.post('/api/total-score', {}, { headers: { Authorization: `Bearer ${token}` } }),
          axios.post('/api/graduation-check-result', {}, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setMajorSubjects(Array.isArray(majorRes.data) ? majorRes.data : []);
        setDoubleMajorSubjects(Array.isArray(doubleMajorRes.data) ? doubleMajorRes.data : []);
        setMajorScore(scoreRes.data?.['주전공 학점'] || 0);
        setDoubleMajorScore(scoreRes.data?.['복수전공 학점'] || 0);
        setRequirementStatus(resultRes.data);
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
      axios.post('/api/total-score', {}, { headers: { Authorization: `Bearer ${token}` } }),
      axios.post('/api/graduation-check-result', {}, { headers: { Authorization: `Bearer ${token}` } }),
    ]).then(([majorRes, doubleMajorRes, scoreRes, resultRes]) => {
      setMajorSubjects(Array.isArray(majorRes.data) ? majorRes.data : []);
      setDoubleMajorSubjects(Array.isArray(doubleMajorRes.data) ? doubleMajorRes.data : []);
      setMajorScore(scoreRes.data?.['주전공 학점'] || 0);
      setDoubleMajorScore(scoreRes.data?.['복수전공 학점'] || 0);
      setRequirementStatus(resultRes.data);
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
      {isTrackModalOpen && <TrackRecommendationModal onClose={() => setIsTrackModalOpen(false)} />}

      <button className="track-recommend-button" onClick={() => setIsTrackModalOpen(true)}>
        <img src={trackIcon} alt="학년별 트랙 추천" className="track-recommend-icon" />
      </button>

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
              <td className={requirementStatus['주전공 필수'] === '충족' ? 'status-pass' : 'status-fail'}>
                {requirementStatus['주전공 필수']}
              </td>
            </tr>
            <tr>
              <td>복수전공 필수</td>
              <td className={requirementStatus['복수전공 필수'] === '충족' ? 'status-pass' : 'status-fail'}>
                {requirementStatus['복수전공 필수']}
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
              <td className="credit-value">{majorScore} / {requiredCredits}</td>
              <td className="credit-value">{doubleMajorScore} / {requiredCredits}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GraduationCheckPage;
