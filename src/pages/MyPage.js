import React from "react";
import "../components/mypage/mypage.css";
import hallymLogo from "../asset/한림대학교 로고.png";
import home from "../asset/Home.png";
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();

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
          <p>아이디(이메일) : XXXXXXX@hallym.ac.kr</p>
          <p>비밀번호 : XXXXXXXX</p>
          <p>학번 : XXXXXXXX</p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
