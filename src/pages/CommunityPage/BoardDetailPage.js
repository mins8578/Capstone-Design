import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/communitypage/boarddetailpage.css';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa'; // 화살표 아이콘 추가

const BoardDetailPage = () => {
  const { id } = useParams(); // 게시글 ID
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false); // 좋아요 상태 추가

  // ✅ 댓글 불러오는 함수
  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/api/comments/board/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('댓글 불러오기 실패:', err);
    }
  }, [id]);

  // ✅ 게시글, 댓글, 사용자 정보, 좋아요 상태 가져오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // 게시글 정보 가져오기
    axios.get(`/api/board/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.error('게시글 불러오기 실패:', err);
        alert("게시글을 찾을 수 없습니다.");
      });

    // 댓글 가져오기
    fetchComments();

    // 사용자 정보 가져오기
    axios.get('/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setCurrentUser(res.data.userID))
      .catch(err => console.error('사용자 정보 불러오기 실패:', err));
    
    // 좋아요 상태 확인
    axios.get(`/api/board/${id}/like`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setLiked(res.data.liked);
      })
      .catch(err => {
        console.error('좋아요 상태 확인 실패:', err);
      });
  }, [id, fetchComments]);

  // ✅ 좋아요 토글 함수 추가
  const toggleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (liked) {
        // 좋아요 취소
        await axios.delete(`/api/board/${id}/like`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLiked(false);
        setPost(prev => ({
          ...prev,
          likeCount: prev.likeCount - 1
        }));
      } else {
        // 좋아요 추가
        await axios.post(`/api/board/${id}/like`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLiked(true);
        setPost(prev => ({
          ...prev,
          likeCount: prev.likeCount + 1
        }));
      }
    } catch (err) {
      console.error('좋아요 작업 실패:', err);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  // ✅ 댓글 등록
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요.");

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `/api/comments/board/${id}`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNewComment('');
      fetchComments();
    } catch (err) {
      alert('댓글 등록 실패');
      console.error('댓글 등록 실패:', err);
    }
  };

  // ✅ 댓글 수정 시작
  const startEdit = (id, content) => {
    setEditingId(id);
    setEditContent(content);
  };

  // ✅ 댓글 수정 완료
  const handleEditSubmit = async (commentId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `/api/comments/${commentId}`,
        { content: editContent },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setEditingId(null);
      setEditContent('');
      fetchComments();
    } catch (err) {
      alert('댓글 수정 실패');
      console.error('댓글 수정 실패:', err);
    }
  };

  // ✅ 댓글 삭제
  const handleDelete = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchComments();
    } catch (err) {
      alert('댓글 삭제 실패');
      console.error('댓글 삭제 실패:', err);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft style={{ marginRight: '8px' }} /> 목록으로
      </button>
      
      <div className="post-header">
        <h2>{post.title}</h2>
        <div className="post-meta">
          <p className="author-info">👤 {post.author} | 🕒 {new Date(post.createdAt).toLocaleString()}</p>
          
          {/* 좋아요 버튼 추가 */}
          <div className="like-container">
            <button 
              className={`like-button ${liked ? 'liked' : ''}`} 
              onClick={toggleLike}
            >
              {liked ? <FaHeart color="#ff4a4a" /> : <FaRegHeart />} {post.likeCount}
            </button>
          </div>
        </div>
      </div>
      
      <div className="post-content">
        <p className="board-content">{post.content}</p>
      </div>

      <hr />
      <h3>💬 댓글 ({comments.length})</h3>
      <div className="comments">
        {comments.length === 0 && <p className="no-comments">댓글이 없습니다.</p>}
        {comments.map(c => (
          <div key={c.id} className="comment">
            {editingId === c.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="edit-textarea"
                />
                <div className="comment-edit-buttons">
                  <button onClick={() => handleEditSubmit(c.id)} className="confirm-button">확인</button>
                  <button onClick={() => setEditingId(null)} className="cancel-button">취소</button>
                </div>
              </>
            ) : (
              <>
                <div className="comment-header">
                  <p><strong>{c.author}</strong> | {new Date(c.createdAt).toLocaleString()}</p>
                  {currentUser === c.author && (
                    <div className="comment-actions">
                      <button onClick={() => startEdit(c.id, c.content)} className="edit-button">✏️ 수정</button>
                      <button onClick={() => handleDelete(c.id)} className="delete-button">🗑️ 삭제</button>
                    </div>
                  )}
                </div>
                <p className="comment-content">{c.content}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={3}
          className="comment-textarea"
        />
        <button onClick={handleCommentSubmit} className="submit-button">등록</button>
      </div>
    </div>
  );
};

export default BoardDetailPage;