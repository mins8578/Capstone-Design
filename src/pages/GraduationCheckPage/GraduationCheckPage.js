import React, { useState, useEffect } from 'react';
import '../../components/graduationcheckpage/graduationcheck.css';
import SubjectModal from '../../pages/GraduationCheckPage/SubjectModal';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const GraduationCheckPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalScore, setTotalScore] = useState(null);   // 전체 학점
  // const [majorScore, setMajorScore] = useState(null);  // 전공 학점


  const [allSubjects, setAllSubjects] = useState([]); // 학생의 과에 맞는 전체 졸업 필수 과목 (주전공)
  const [completedSubjects, setCompletedSubjects] = useState([]); // 학생이 수강하는 졸업 필수 과목 (주전공)

  const [allSubjects02, setAllSubjects02] = useState([]); // 학생의 과에 맞는 전체 졸업 필수 과목 (복수전공)
  const [completedSubjects02, setCompletedSubjects02] = useState([]); // 학생이 수강하는 졸업 필수 과목 (복수전공)\

  const [userName, setUserName] = useState([]);  //학생 이름

  const [mainMajorSatisfied, setMainMajorSatisfied] = useState(false);
  const [doubleMajorSatisfied, setDoubleMajorSatisfied] = useState(false);

  // ✅ 판단 함수 정의
  const checkMainMajorSatisfied = (completedSubjects) => {
    const hasCapstone = completedSubjects.some(sub =>
        sub.subjectName.includes("소프트웨어캡스톤디자인")
    );
    const otherSubjects = completedSubjects.filter(sub =>
        !sub.subjectName.includes("소프트웨어캡스톤디자인")
    );
    return hasCapstone && otherSubjects.length >= 1;
  };

  const checkDoubleMajorSatisfied = (completedSubjects02, isCapstoneInMain) => {
    if (!isCapstoneInMain) return false;
    return completedSubjects02.length >= 1;
  };


  // ✅ 충족 여부 계산
  useEffect(() => {
    const isMain = checkMainMajorSatisfied(completedSubjects);
    setMainMajorSatisfied(isMain);
    const isDouble = checkDoubleMajorSatisfied(completedSubjects02, isMain);
    setDoubleMajorSatisfied(isDouble);
  }, [completedSubjects, completedSubjects02]);


  // ✅ 총 전공 학점 조회 API 호출
  useEffect(() => {
    const token = localStorage.getItem("token"); // JWT 토큰 가져오기


    const fetchTotalScore = async () => {
      try {

        const response = await axios.post("/api/total-score", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const score = response.data["총 학점 "];  // 백엔드 응답 키와 일치
        setTotalScore(score);  // 상태에 저장
      } catch (error) {
        console.error("총 학점 불러오기 실패:", error);
      }
    };

    /*
    // ✅ 전공 학점 조회
    const fetchMajorScore = async () => {

      try {
        const response = await axios.post("/api/subject-score?category=전공", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const score = response.data["총 학점"]; // 이건 공백 없음
        setMajorScore(score);
      } catch (error) {
        console.error("전공 학점 불러오기 실패:", error);
      }
    };
  */
    //주전공 자가진단
    const graduationCheck = async () => {
      try {
        const [allRes, completedRes] = await Promise.all([
          axios.post("/api/graduation-subject", {}, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.post("/api/graduation-check", {}, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);


        setAllSubjects(allRes.data);
        setCompletedSubjects(completedRes.data);
      } catch (error) {
        console.error("과목 목록 로딩 실패:", error);
      }
    };

    //복수전공 자가진단
    const graduationCheck02 = async () => {
      try {
        const [allRes02, completedRes02] = await Promise.all([
          axios.post("/api/graduation-subject02", {}, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.post("/api/graduation-check02", {}, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);


        setAllSubjects02(allRes02.data);
        setCompletedSubjects02(completedRes02.data);
      } catch (error) {
        console.error("과목 목록 로딩 실패:", error);
      }
    };



    // ✅ 이름 가져오기
    const getUserName = async () => {

      try {
        const response = await axios.post("/api/user-name", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userName1 = response.data["userName"]; // 이건 공백 없음
        setUserName(userName1);
      } catch (error) {
        console.error("회원 이름 가져오기 실패:", error);
      }
    };





    fetchTotalScore();
    //fetchMajorScore();
    graduationCheck();
    graduationCheck02();
    getUserName();

  }, []);

  const isAllSatisfied = mainMajorSatisfied && doubleMajorSatisfied && totalScore !== null && totalScore >= 66;

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
          <h2>{userName} 님의 현재 이수현황!</h2>
          <table className="check-table strong-border">
            <tbody>
            <tr className="gray-row">
              <td>졸업 요건 리스트</td>
              <td style={{ color: isAllSatisfied ? 'black' : 'red' }}>
                {isAllSatisfied ? '충족' : '불충족'}
              </td>
            </tr>
            <tr><td>주전공 필수</td><td style={{ color: mainMajorSatisfied ? "black" : "red" }}> {mainMajorSatisfied ? "충족" : "불충족"}</td>
            </tr>

            <tr>
              <td>복수전공 필수</td>
              <td style={{ color: doubleMajorSatisfied ? "black" : "red" }}>
                {doubleMajorSatisfied ? "충족" : "불충족"}
              </td>
            </tr>

            <tr>
              <td>전체취득 학점</td>
              <td style={{ color: totalScore !== null && totalScore < 66 ? 'red' : 'black' }}>
                {totalScore !== null ? (totalScore >= 66 ? "충족" : "불충족") : "로딩 중..."}
              </td>
            </tr>
            </tbody>
          </table>
        </section>

        <section className="section">
          <h2>현재 취득 학점</h2>
          <table className="credit-table">
            <tbody>
            <tr className="gray-row">
              <td>현재 전공 이수 학점</td>
              <td>총 전공 학점</td>
            </tr>
            <tr>
              <td> {totalScore !== null ? `${totalScore} 학점` : "로딩 중..."} </td>
              <td> 66 학점 </td>
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
            {allSubjects.map((subject, index) => {
              const isCompleted = completedSubjects.some((completed) => {
                const completedCode = completed.subjectCode?.toString().trim();
                const currentCode = subject.subjectCode?.toString().trim();

                return completedCode === currentCode;
              });

              return (
                  <tr key={index}>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.subjectName}</td>
                    <td>전필</td>
                    <td style={{ color: isCompleted ? "black" : "red" }}>
                      {isCompleted ? "수강완료" : "미수강"}
                    </td>
                  </tr>
              );
            })}
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
            {allSubjects02.map((subject, index) => {
              const isCompleted = completedSubjects02.some((completed) => {
                const completedCode = completed.subjectCode?.toString().trim();
                const currentCode = subject.subjectCode?.toString().trim();

                return completedCode === currentCode;
              });

              return (
                  <tr key={index}>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.subjectName}</td>
                    <td>전필</td>
                    <td style={{ color: isCompleted ? "black" : "red" }}>
                      {isCompleted ? "수강완료" : "미수강"}
                    </td>
                  </tr>
              );
            })}
            </tbody>
          </table>
        </section>
      </div>
  );
};

export default GraduationCheckPage;
