import React, { useState } from 'react';
import axios from 'axios';
import '../../components/signuppage/signupform.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    studentId: '',
    major: '',
    scdmajor: '',
  });

  const navigate = useNavigate();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSendVerification = async () => {
    const emailToSend = `${form.email}@hallym.ac.kr`;
    if (!form.email) {
      alert("이메일을 입력하세요.");
      return;
    }
    
    alert("인증코드 입력창이 나타납니다.");
    setShowCodeInput(true); // 인증창 바로 보여줌

    try {
      const response = await axios.post("/api/send-code", {
        email: emailToSend,
      });

      if (response.data.success) {
        alert("6자리 인증코드를 이메일로 보냈습니다.");
        setShowCodeInput(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("메일 전송 오류:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("메일 전송 중 오류가 발생했습니다.");
      }
    }
  };

  const handleVerifyCode = async () => {
    const email = `${form.email}@hallym.ac.kr`;
    try {
      const res = await axios.post("/api/verify-code", {
        email,
        code,
      });

      if (res.data.verified) {
        alert("인증이 완료되었습니다.");
        setIsEmailVerified(true);
      } else {
        alert("인증코드가 올바르지 않습니다.");
      }
    } catch (err) {
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isEmailVerified) {
      alert("아이디(이메일) 인증이 완료되지 않았습니다.");
      return;
    }
  
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
  
    try {
      await axios.post("/api/register", {
        userID: `${form.email}@hallym.ac.kr`,     // 이메일
        pwd: form.password,                       // 비밀번호
        passwordCheck: form.confirmPassword,      // 비밀번호 확인
        userName: form.name,                      // 이름
        studentNumber: form.studentId,            // 학번
        major: form.major,                        // 주전공
        scdMajor: form.scdMajor,                  // 복수전공
      });
  
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <img src="/한림대학교 로고2.png" alt="한림대학교 로고" className="signup-logo" />

      <div className="signup-form-area">
        <h2 className="signup-title">회원가입</h2>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>아이디(이메일)</label>
            <div className="email-group">
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일 앞부분 입력"
                required
              />
              <span className="email-fixed">@hallym.ac.kr</span>
              <button 
                type="button" 
                className="cert-button" 
                onClick={handleSendVerification}
              >
                인증
              </button>
            </div>
          </div>

          {showCodeInput && (
            <div className="form-group">
              <label>인증코드 입력</label>
              <div className="code-group">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6자리 코드"
                  maxLength={6}
                />
                <button type="button" onClick={handleVerifyCode}>인증 확인</button>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>비밀번호 입력</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="8자 이상 영문, 숫자, 특수문자 조합"
              required
            />
          </div>

          <div className="form-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 재입력"
              required
            />
          </div>

          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="실명 입력"
              required
            />
          </div>

          <div className="form-group">
            <label>학번</label>
            <input
              type="text"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              placeholder="ex: 2020XXXX"
              required
            />
          </div>

          <div className="form-group">
            <label>주전공 선택</label>
            <select name="major" value={form.major} onChange={handleChange} required>
              <option value="">주전공을 선택하세요</option>
              <option value="빅데이터">빅데이터학과</option>
              <option value="콘텐츠IT">콘텐츠IT학과</option>
              <option value="스마트IoT">스마트IoT학과</option>
            </select>
          </div>

          <div className="form-group">
            <label>복수전공 선택</label>
            <select name="scdmajor" value={form.scdmajor} onChange={handleChange} required>
              <option value="">복수전공을 선택하세요</option>
              <option value="빅데이터">빅데이터학과</option>
              <option value="콘텐츠IT">콘텐츠IT학과</option>
              <option value="스마트IoT">스마트IoT학과</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
