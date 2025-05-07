import React from 'react';
import Header from '../components/mainpage/header';
import NoticeBox from '../components/mainpage/noticebox';
import bgImage from '../asset/한림대학교.jpg';
import { useNavigate } from 'react-router-dom';


function MainPage() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* ✅ 선명한 배경 이미지 (opacity ❌, filter ❌) */}
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

      {/* ✅ 어두운 반투명 오버레이 (배경만 어둡게) */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // 어두운 느낌만 살짝 줌
          zIndex: 1,
        }}
      />

      {/* ✅ 실제 콘텐츠 (선명하게!) */}
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
        <main
          style={{
            display: 'flex',
            justifyContent: 'center',       // 중앙 정렬
            alignItems: 'center',           // 수직 정렬 (선택)
            gap: '200px',                    // 박스 간 간격
            marginTop: '60px',
            height: '500px'   // 중앙에 보이게 하기 위한 높이 조정
          }}>
          <div onClick={() => window.open('https://sw.hallym.ac.kr/index.php?mp=5_1', '_blank')} style={{ cursor: 'pointer' }}>
            <NoticeBox title="공지사항" />
          </div>

          <div onClick={() => navigate('/communityboard')} style={{ cursor: 'pointer' }}>
          <NoticeBox title="커뮤니티" />
          </div>

          <div onClick={() => navigate('/grad-check')} style={{ cursor: 'pointer' }}>
            <NoticeBox title="졸업자가진단" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
