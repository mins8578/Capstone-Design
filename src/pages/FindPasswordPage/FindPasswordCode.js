import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/findpasswordpage/FindPasswordCode.css';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';

function FindPasswordCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!code) {
      alert('인증코드를 입력해주세요.');
      return;
    }

    // TODO: 인증 코드 확인 API 연결
    navigate('/find-password/reset');
  };

  return (
    <div className="page-container">
      <div className="top-logo">
        <img src={hallymLogo} alt="한림대학교 로고" />
      </div>

      <div className="form-area">
        <p className="label">이메일로 전송된 인증코드를 입력해주세요.</p>
        <input
          type="text"
          className="code-input"
          placeholder="인증코드 입력"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="verify-button" onClick={handleVerify}>인증확인</button>
      </div>
    </div>
  );
}

export default FindPasswordCode;
