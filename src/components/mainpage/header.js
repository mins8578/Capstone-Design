import React from 'react';
import './header.css';
import hallymLogo from '../../asset/한림대학교 로고.png';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={hallymLogo} alt="한림대 로고" />
        <div className="logo-text">한림대학교 소프트웨어학부 홈페이지</div>
      </div>
      <div className="user-icon">👤</div>
    </header>
  );
}

export default Header;
