import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import hallymLogo from '../../asset/한림대학교 로고.png';
import { FaUserCircle } from 'react-icons/fa'; // 로그인 아이콘

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={hallymLogo} alt="한림대 로고" />
        <div className="logo-text">한림대학교 소프트웨어학부 홈페이지</div>
      </div>
      <Link to="/login" className="user-icon">
        <FaUserCircle size={28} />
      </Link>
    </header>
  );
}

export default Header;
