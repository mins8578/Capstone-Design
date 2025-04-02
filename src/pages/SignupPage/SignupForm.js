import React, { useState } from 'react';
import axios from 'axios';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';
import '../../components/signuppage/signupform.css';

const SignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    studentId: '',
    major: '', // ✅ 전공 추가
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);

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

    try {
      const response = await axios.post("http://localhost:8080/api/send-email", {
        email: emailToSend,
      });

      if (response.data.success) {
        alert("인증 메일을 보냈습니다. 메일함을 확인하세요.");
        // setIsEmailVerified(true); // ✅ 실제 구현 시 인증 후에 true로 변경
      } else {
        alert("메일 발송에 실패했습니다.");
      }
    } catch (error) {
      console.error("메일 전송 오류:", error);
      alert("메일 전송 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      alert("아이디(이메일) 인증이 완료되지 않았습니다.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    alert('회원가입 요청이 준비되었습니다.');
    // 추후: axios.post로 회원가입 요청 백엔드에 전송
  };

  return (
    <div className="signup-container">
      <img src={hallymLogo} alt="한림대학교 로고" className="signup-logo" />

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
            <button type="button" className="cert-button" onClick={handleSendVerification}>인증</button>
          </div>
        </div>

        <div className="form-group">
          <label>비밀번호 입력</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
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
            required
          />
        </div>

        <div className="form-group">
          <label>전공 선택</label>
          <select name="major" value={form.major} onChange={handleChange} required>
            <option value="">전공을 선택하세요</option>
            <option value="빅데이터학과">빅데이터학과</option>
            <option value="콘텐츠IT학과">콘텐츠IT학과</option>
            <option value="스마트IoT학과">스마트IoT학과</option>
          </select>
        </div>

        <button type="submit" className="submit-button">회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm;
