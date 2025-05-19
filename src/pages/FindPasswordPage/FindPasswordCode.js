import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/findpasswordpage/FindPasswordCode.css'; 
import hallymLogo from '../../asset/한림대학교 로고2.png';

function FindPasswordCode() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!code) {
      alert('인증코드를 입력해주세요.');
      return;
    }

    const email = sessionStorage.getItem('email');
    if (!email) {
      alert('이메일 정보가 없습니다. 처음부터 다시 시도해주세요.');
      navigate('/find-password/email');
      return;
    }
    try {

      setIsLoading(true);
      const response = await axios.post('/api/password-verify-code', {
        email: email,
        code: code,
      });

      if (response.data.success === true) {
        alert(response.data.message || '인증이 완료되었습니다.');
        navigate('/find-password/reset');
      } else {
        alert(response.data.message || '인증코드가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('서버오류:', error);
      alert('서버오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="password-page-container">
      <div className="password-top-logo">
        <img src={hallymLogo} alt="한림대학교 로고" />
      </div>

      <div className="password-form-area">
        <p className="password-label">인증코드 확인</p>
        <p className="email-description">
          이메일로 전송된 6자리 인증코드를 입력해주세요.
        </p>
        <input
          type="text"
          className="code-input"
          placeholder="인증코드 입력"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={6}
        />
        <button 
          className="verify-button" 
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? '확인 중...' : '인증확인'}
        </button>
      </div>
    </div>
  );
}

export default FindPasswordCode;