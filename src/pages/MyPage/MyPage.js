import React, { useEffect, useState } from "react";
import "../../components/mypage/mypage.css";
import hallymLogo from "../../asset/한림대학교 로고.png";
import home from "../../asset/Home.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    userID: '',
    studentNumber: '',
    major: '',
    scdMajor: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // ✅ GET 요청으로 변경
    axios.get("/api/mypage/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error("마이페이지 정보 불러오기 실패:", err);
        alert("사용자 정보를 불러오지 못했습니다.");
      });
  }, [navigate]);

  return (
    <div className="mypage-container">
      {/* 마이페이지 헤더 */}
      <div className="mypage-header">
        <div className="header-left">
          <img src={hallymLogo} alt="한림대학교 로고" className="mypage-logo" />
          <h1 className="mypage-title">마이 페이지</h1>
        </div>
        <img
          src={home}
          alt="Home"
          className="mypage-home-icon"
          onClick={() => navigate('/')}
        />
      </div>

      {/* 기본 정보 박스 */}
      <div className="mypage-content">
        <div className="mypage-info-box">
          <h2>기본 정보</h2>
          <p>이름: {userInfo.user_name}</p>
          <p>아이디(이메일): {userInfo.userID}</p>
          <p>학번: {userInfo.studentNumber}</p>
          <p>주전공: {userInfo.major}</p>
          <p>복수전공: {userInfo.scdMajor || '없음'}</p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
