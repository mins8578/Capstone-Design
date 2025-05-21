import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/findpasswordpage/FindPasswordEmail.css'; // 공통 CSS로 변경 예정

function FindPasswordEmail() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!email) {
      alert('학번을 입력해주세요.');
      return;
    }

    const fullEmail = `${email}@hallym.ac.kr`;

    try {
      setIsLoading(true);
      const response = await axios.post('/api/find-send-code', {
        userID: fullEmail,
      });

      if (response.data.success === true) {
        alert('인증코드를 이메일로 전송했습니다.');
        sessionStorage.setItem("email", fullEmail);
        navigate('/find-password/code');
      } else {
        alert(`회원이 없습니다: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('서버와의 연결 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  return (
    <div className="password-page-container">
      <div className="password-top-logo">
        <img src="/한림대학교 로고2.png" alt="한림대학교 로고" />
      </div>

      <div className="password-form-area">
        <p className="password-label">비밀번호 찾기</p>
        <div className="email-description">
          가입 시 등록한 학번을 입력하시면 해당 이메일로 인증코드를 보내드립니다.
        </div>
        <input
          type="text"
          className="email-input"
          placeholder="학번 입력 (ex: 2020XXXX)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="next-button" 
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '다음'}
        </button>
      </div>
    </div>
  );
}

export default FindPasswordEmail;