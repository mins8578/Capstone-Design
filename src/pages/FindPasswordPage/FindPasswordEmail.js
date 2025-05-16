import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/findpasswordpage/FindPasswordEmail.css';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';

function FindPasswordEmail() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!email) {
      alert('학번을 입력해주세요.');
      return;
    }

    const fullEmail = `${email}@hallym.ac.kr`;

    try {
      const response = await axios.post('/api/find-send-code', {
        userID: fullEmail,
      });

      // ✅ success 값 기준으로 처리
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
    }
  };

  return (
    <div className="page-container">
      <div className="top-logo">
        <img src={hallymLogo} alt="한림대학교 로고" />
      </div>

      <div className="form-area">
        <p className="label">학번을 입력해주세요.</p>
        <input
          type="text"
          className="email-input"
          placeholder="ex) 2020XXXX"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="next-button" onClick={handleNext}>다음</button>
      </div>
    </div>
  );
}

export default FindPasswordEmail;
