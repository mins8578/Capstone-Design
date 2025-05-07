import React from 'react';
import '../components/communitypage/communitypage.css';
import logo from '../asset/한림대학교 로고.png';
import home from '../asset/Home.png';
import { useNavigate } from 'react-router-dom';

const dummyPosts = [
  {
    id: 1,
    title: '공부 질문 받습니다!',
    author: '리안',
    likes: 0,
    comments: 1,
    date: '2025-05-05T13:33:42'
  },
  {
    id: 2,
    title: 'ㅎㅇ',
    author: '리안',
    likes: 1,
    comments: 3,
    date: '2025-05-04T02:57:52'
  }
];

const CommunityBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="community-container">
      {/* 상단 로고, 제목, 홈 버튼 */}
      <div className="community-header">
        <div className="header-left">
          <img src={logo} alt="logo" className="board-logo" />
          <span className="board-title">커뮤니티 게시판</span>
        </div>
        <div className="header-right">
          <img
            src={home}
            alt="home"
            className="home-icon"
            onClick={() => navigate('/')}
          />
        </div>
      </div>
      <hr />

      {/* 배너 */}
      <div className="community-banner">
        <div className="banner-text">
          <h2>소프트웨어학부 커뮤니티 게시판</h2>
          <p>한림대학교 소프트웨어학부 학생들이 자유롭게 소통할 수 있는 공간입니다! 💬</p>
        </div>
      </div>

      {/* ✅ 글쓰기 버튼: 배너 아래에 위치 */}
      <div className="write-button-wrapper">
        <button className="write-button" onClick={() => navigate('/write')}>
          + 글쓰기
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="post-list">
        {dummyPosts.map(post => (
          <div className="post-card" key={post.id}>
            <div className="post-title">{post.title}</div>
            <div className="post-footer">
              <div className="footer-left">
                <span>👤 {post.author}</span>
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
              <div className="footer-right">
                <span className="date">🕒 {post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n}>{n}</button>
        ))}
        <button>다음</button>
      </div>

      {/* 하단 검색창 */}
      <div className="bottom-search">
        <select>
          <option>제목</option>
          <option>작성자</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>검색</button>
      </div>
    </div>
  );
};

export default CommunityBoard;
