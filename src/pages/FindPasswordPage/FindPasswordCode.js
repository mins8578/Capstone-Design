import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/findpasswordpage/FindPasswordCode.css';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';

function FindPasswordCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();


  const handleVerify = async () => {
    if (!code) {
      alert('인증코드를 입력해주세요.');
      return;
    }

    const email = sessionStorage.getItem('email');

    try {
      const response = await axios.post('http://192.168.219.48:8080/api/password-verify-code', {
        email: email,
        code: code,
      });

      if (response.data.success === true) {
        alert(response.data.message);
        navigate('/find-password/reset');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('서버오류가 발생했습니다.');
    }
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
