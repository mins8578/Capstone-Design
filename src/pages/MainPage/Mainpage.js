import React from 'react';
import Header from '../../components/mainpage/header';
import NoticeBox from '../../components/mainpage/noticebox';
import bgImage from '../../asset/한림대학교.jpg';
import { useNavigate } from 'react-router-dom';


function MainPage() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* 배경 이미지 */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* 어두운 오버레이 (배경에 깊이감 추가) */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // 더 어둡게 조정 (깊이감)
          zIndex: 1,
        }}
      />

      {/* 실제 콘텐츠 */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Header />
        
        {/* 환영 메시지 추가 */}
        <div style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '30px',
          maxWidth: '800px'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            marginBottom: '12px'
          }}>
            한림대학교 소프트웨어학부
          </h1>
          <p style={{ 
            fontSize: '1.2rem',
            opacity: 0.9,
            lineHeight: 1.5,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            미래를 선도하는 IT 인재의 요람, 한림대학교 소프트웨어학부에 오신 것을 환영합니다.
          </p>
        </div>
        
        <main
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px', // 박스 간격 조정
            height: '400px',
            width: '100%',
            maxWidth: '1200px', // 최대 너비 설정
            padding: '0 20px', // 양쪽 패딩 추가
          }}>
          <div onClick={() => window.open('https://sw.hallym.ac.kr/index.php?mp=5_1', '_blank')} style={{ cursor: 'pointer' }}>
            <NoticeBox 
              title="공지사항" 
              icon="📢" // 아이콘 추가 (NoticeBox 컴포넌트에서 사용 필요)
              description="소프트웨어학부 최신 소식을 확인하세요" // 설명 추가 (NoticeBox에서 사용 필요)
            />
          </div>

          <div onClick={() => navigate('/communityboard')} style={{ cursor: 'pointer' }}>
            <NoticeBox 
              title="커뮤니티" 
              icon="💬" 
              description="자유롭게 의견을 나누고 질문하세요"
            />
          </div>

          <div onClick={() => navigate('/grad-check')} style={{ cursor: 'pointer' }}>
            <NoticeBox 
              title="졸업자가진단" 
              icon="🎓" 
              description="졸업요건을 확인하고 계획을 세우세요"
            />
          </div>
        </main>
        
        {/* 하단 콘텐츠 영역 추가 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          © 2025 한림대학교 소프트웨어학부 | 캡스톤 프로젝트 K2C1
        </div>
      </div>
    </div>
  );
}

export default MainPage;
