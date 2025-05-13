import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../components/communitypage/communitypage.css';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import { useNavigate } from 'react-router-dom';
import WritePostModal from '../../pages//CommunityPage/WritePostModal';

const CommunityBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/board');
      setPosts(res.data);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async ({ title, content }) => {
    try {
      await axios.post('/api/board', { title, content }, { withCredentials: true });
      alert('게시글이 등록되었습니다!');
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      alert('등록 실패');
    }
  };

  return (
    <div className="community-container">
      <div className="community-header">
        <div className="header-left">
          <img src={logo} alt="logo" className="board-logo" />
          <span className="board-title">커뮤니티 게시판</span>
        </div>
        <div className="header-right">
          <img src={home} alt="home" className="home-icon" onClick={() => navigate('/')} />
        </div>
      </div>
      <hr />

      <div className="community-banner">
        <div className="banner-text">
          <h2>소프트웨어학부 커뮤니티 게시판</h2>
          <p>한림대학교 소프트웨어학부 학생들이 자유롭게 소통할 수 있는 공간입니다! 💬</p>
        </div>
      </div>

      <div className="write-button-wrapper">
        <button className="write-button" onClick={() => setIsModalOpen(true)}>+ 글쓰기</button>
      </div>

      <div className="post-list">
        {posts.map(post => (
          <div className="post-card" key={post.id} onClick={() => navigate(`/board/${post.id}`)}>
            <div className="post-title">{post.title}</div>
            <div className="post-footer">
              <div className="footer-left">
                <span>👤 {post.author}</span>
                <span>❤️ {post.likeCount}</span>
                <span>💬 {post.commentCount}</span>
              </div>
              <div className="footer-right">
                <span className="date">🕒 {new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {[1, 2, 3, 4, 5].map(n => <button key={n}>{n}</button>)}
        <button>다음</button>
      </div>

      <div className="bottom-search">
        <select>
          <option>제목</option>
          <option>작성자</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>검색</button>
      </div>

      {isModalOpen && (
        <WritePostModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostSubmit}
        />
      )}
    </div>
  );
};

export default CommunityBoard;
