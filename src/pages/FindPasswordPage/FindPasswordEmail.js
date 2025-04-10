import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/findpasswordpage/FindPasswordEmail.css';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';

function FindPasswordEmail() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    // 이메일 형식 체크도 추가 가능
    navigate('/find-password/code');
  };

  return (
    <div className="page-container">
      <div className="top-logo">
        <img src={hallymLogo} alt="한림대학교 로고" />
      </div>

      <div className="form-area">
        <p className="label">아이디(이메일)을 입력해주세요.</p>
        <input
          type="email"
          className="email-input"
          placeholder="@hallym.ac.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="next-button" onClick={handleNext}>다음</button>
      </div>
    </div>
  );
}

export default FindPasswordEmail;




