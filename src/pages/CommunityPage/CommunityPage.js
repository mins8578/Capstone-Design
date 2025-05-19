import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../../components/communitypage/communitypage.css';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import { useNavigate } from 'react-router-dom';
import WritePostModal from '../../pages/CommunityPage/WritePostModal';
import { FaPencilAlt, FaHeart, FaComment, FaUserCircle, FaClock } from 'react-icons/fa';

const CommunityBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 진입 시 인증 체크
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다');
      //navigate('/login');
      return;
    }
  }, [navigate]);

  const token = localStorage.getItem('token');

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get('/api/board', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err);
      // 401 오류는 별도 처리할 필요 없음 (App.js의 인터셉터에서 처리)
    }
  }, [token]);

  useEffect(() => {
    // 토큰이 있을 때만 게시글 로드
    if (token) {
      fetchPosts();
    }
  }, [fetchPosts, token]);

  const handlePostSubmit = async ({ title, content }) => {
    try {
      await axios.post(
        '/api/board',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('게시글이 등록되었습니다!');
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      alert('등록 실패');
    }
  };

  // 날짜 포맷 함수 추가
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <button className="write-button" onClick={() => setIsModalOpen(true)}>
          <FaPencilAlt /> 글쓰기
        </button>
      </div>

      <div className="post-list">
        {posts.length > 0 ? posts.map(post => (
          <div className="post-card" key={post.id} onClick={() => navigate(`/board/${post.id}`)}>
            <div className="post-title">{post.title}</div>
            <div className="post-footer">
              <div className="footer-left">
                <span><FaUserCircle /> {post.author}</span>
                <span><FaHeart /> {post.likeCount}</span>
                <span><FaComment /> {post.commentCount}</span>
              </div>
              <div className="footer-right">
                <span className="date"><FaClock /> {formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: 'white', borderRadius: '12px' }}>
            <p>게시글이 없습니다. 첫 번째 게시글을 작성해보세요!</p>
          </div>
        )}
      </div>

      <div className="pagination">
        {[1, 2, 3, 4, 5].map(n => (
          <button 
            key={n} 
            className={currentPage === n ? 'active' : ''}
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </button>
        ))}
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