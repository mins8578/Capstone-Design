import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';
import "../../components/signuppage/signupterms.css";


const SignupTerms = () => {
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const navigate = useNavigate();
  
    const handleNext = () => {
      if (agreeTerms && agreePrivacy) {
        navigate('/signup/form');
      } else {
        alert("필수 항목에 모두 동의해야 합니다.");
      }
    };
  
    return (
      <div className="terms-container">
        <img src={hallymLogo} alt="로고" className="logo" />
  
        <div className="terms-section">
          <label>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <strong>[필수]</strong> 이용약관
          </label>
          <textarea readOnly value={`[이용약관]

제1조 목적
본 약관은 한림대학교 소프트웨어학부 홈페이지의 이용과 관련된 조건 및 절차를 규정함을 목적으로 합니다.

제2조 회원의 의무
회원은 다음 행위를 해서는 안 됩니다:
- 타인의 정보 도용
- 법령 또는 공공질서에 위배되는 행위
- 시스템 장애를 유발할 수 있는 행위

제3조 서비스 제공자의 책임
사이트는 안정적인 서비스 제공을 위해 최선을 다하며, 회원의 개인정보 보호에 노력합니다.

제4조 서비스 이용 제한
회원이 약관을 위반할 경우, 서비스 이용이 제한될 수 있습니다.

제5조 약관의 변경
본 약관은 필요시 변경될 수 있으며, 변경 사항은 공지사항을 통해 통보됩니다.

제6조 준거법
본 약관은 대한민국 법률에 따릅니다.`} />
        </div>
  
        <div className="terms-section">
          <label>
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={() => setAgreePrivacy(!agreePrivacy)}
            />
            <strong>[필수]</strong> 개인정보 수집 및 이용
          </label>
          <textarea readOnly value={`[개인정보 수집 및 이용 동의서]

1. 수집 항목
- 필수: 이름, 학번, 이메일, 비밀번호

2. 수집 목적
- 회원 식별 및 로그인 기능 제공
- 커뮤니티 및 졸업자가진단 서비스 이용
- 공지사항 및 알림 메일 발송

3. 보유 및 이용 기간
- 회원 탈퇴 시 또는 개인정보 삭제 요청 시까지
(단, 관계법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안 보관됨)

4. 동의 거부 시 불이익
- 개인정보 수집 및 이용에 동의하지 않을 경우, 회원가입 및 본 사이트의 서비스 이용이 제한될 수 있습니다.

5. 기타
- 수집된 정보는 외부에 제공되지 않으며, 안전한 방법으로 보호됩니다.`} />
        </div>
  
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!(agreeTerms && agreePrivacy)}
        >
          다음
        </button>
      </div>
    );
  };
  
  export default SignupTerms;