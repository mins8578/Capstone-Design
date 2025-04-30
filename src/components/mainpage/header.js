import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import hallymLogo from '../../asset/한림대학교 로고.png';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 로그인했다고 가정
  const isLoggedIn = true; // 항상 true로 설정!

  // 로그인 여부 판단 (예: 토큰이 있으면 로그인된 상태라고 가정)
  //const isLoggedIn = !!localStorage.getItem('token');

  const handleIconClick = () => {
    if (!isLoggedIn) {
      navigate('/login'); // 로그인 안 된 경우 로그인 페이지로 이동
    } else {
      setIsOpen((prev) => !prev); // 로그인된 경우 드롭다운 토글
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그아웃 처리 (예시)
    alert("로그아웃 되었습니다.");
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="mainpage-logo">
        <img src={hallymLogo} alt="한림대 로고" />
        <div className="logo-text">한림대학교 소프트웨어학부 홈페이지</div>
      </div>

      <div className="user-icon-wrapper">
        <FaUserCircle
          className="user-icon"
          size={28}
          onClick={handleIconClick}
        />
        {isLoggedIn && isOpen && (
          <div className="dropdown-menu">
            <Link to="/mypage">나의 정보</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
