import React, { useState } from 'react';
import '../../components/graduationcheckpage/graduationcheck.css';
import SubjectModal from '../../pages/GraduationCheckPage/SubjectModal';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import { useNavigate } from 'react-router-dom';

const GraduationCheckPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container">
      <header className="page-header">
        <img src={logo} alt="한림대학교 로고" className="graduationcheck-logo" />
        <h1>한림대학교 소프트웨어학부 졸업 자가 진단</h1>
        <img src={home} alt="Home" className="home-icon" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
      </header>
      <hr className="divider" />
      <section className="section">
        <button
          className="subject-button"
          onClick={() => setIsModalOpen(true)}
        >
          현재 이수 과목 등록/수정
        </button>
      </section>

      {isModalOpen && <SubjectModal onClose={() => setIsModalOpen(false)} />}


      <section className="section">
        <h2>XXX님의 현재 이수현황!</h2>
        <table className="check-table strong-border">
          <tbody>
            <tr className="gray-row">
              <td>졸업 요건 리스트</td>
              <td>충족? 불충족?</td>
            </tr>
            <tr><td>주전공 필수</td><td>충족? 불충족?</td></tr>
            <tr><td>복수전공 필수</td><td>충족? 불충족?</td></tr>
            <tr><td>전체취득 학점</td><td>충족? 불충족?</td></tr>
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
              <td>전공 학점</td>
              <td>전체 학점</td>
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
            {[1, 2, 3, 4, 5, 6].map(i => (
              <tr key={i}>
                <td>1234{i}</td><td>알고리즘</td><td>전필</td><td>수강완료</td>
              </tr>
            ))}
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
            {[1, 2, 3, 4, 5, 6].map(i => (
              <tr key={i}>
                <td>1234{i}</td><td>알고리즘</td><td>전필</td><td>수강완료</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GraduationCheckPage;
