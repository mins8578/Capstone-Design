import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/communitypage/boarddetailpage.css';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import WritePostModal from './WritePostModal';

const BoardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const token = localStorage.getItem('token');

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(`/api/board/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPost(res.data);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err);
      alert('게시글을 찾을 수 없습니다.');
    }
  }, [id, token]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/api/comments/board/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('댓글 불러오기 실패:', err);
    }
  }, [id]);

  const fetchLikeStatus = useCallback(async () => {
    try {
      const res = await axios.get(`/api/board/${id}/like`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLiked(res.data.liked);
    } catch (err) {
      console.error('좋아요 상태 확인 실패:', err);
    }
  }, [id, token]);

  useEffect(() => {
    if (!token) return;

    fetchPost();
    fetchComments();
    fetchLikeStatus();

    axios.get('/api/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCurrentUser(res.data.userID))
      .catch(err => console.error('사용자 정보 불러오기 실패:', err));
  }, [fetchPost, fetchComments, fetchLikeStatus, token]);

  const toggleLike = async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      if (liked) {
        await axios.delete(`/api/board/${id}/like`, headers);
        alert('좋아요를 취소하셨습니다.');
      } else {
        await axios.post(`/api/board/${id}/like`, {}, headers);
        alert('좋아요를 누르셨습니다!');
      }
      await fetchLikeStatus();
      await fetchPost();
    } catch (err) {
      console.error('좋아요 처리 중 오류:', err);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요.");
    try {
      await axios.post(`/api/comments/board/${id}`, {
        content: newComment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      alert('댓글 등록 실패');
      console.error('댓글 등록 실패:', err);
    }
  };

  const startEdit = (id, content) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleEditSubmit = async (commentId) => {
    try {
      await axios.put(`/api/comments/${commentId}`, {
        content: editContent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      setEditContent('');
      fetchComments();
    } catch (err) {
      alert('댓글 수정 실패');
      console.error('댓글 수정 실패:', err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComments();
    } catch (err) {
      alert('댓글 삭제 실패');
      console.error('댓글 삭제 실패:', err);
    }
  };

  const handlePostEditOpen = () => setIsEditModalOpen(true);

  const handlePostEditSubmit = async (updatedData) => {
    try {
      await axios.put(`/api/board/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("게시글이 수정되었습니다.");
      await fetchPost();
      setIsEditModalOpen(false);
    } catch (err) {
      alert("게시글 수정 실패");
      console.error("게시글 수정 실패:", err);
    }
  };

  const handlePostDelete = async () => {
    if (!window.confirm("이 게시글을 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/api/board/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("삭제되었습니다.");
      navigate("/communityboard");
    } catch (err) {
      alert("게시글 삭제 실패");
      console.error("게시글 삭제 실패:", err);
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
          <p className="author-info">
            👤 {post.author} | 🕒 {new Date(post.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
          </p>
          <div className="like-container">
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={toggleLike}>
              {liked ? <FaHeart color="#ff4a4a" /> : <FaRegHeart />} {post.likeCount}
            </button>
          </div>
        </div>

        {currentUser !== null && currentUser === post.authorId && (
          <div className="post-actions">
            <button onClick={handlePostEditOpen} className="edit-button">✏️ 수정</button>
            <button onClick={handlePostDelete} className="delete-button">🗑️ 삭제</button>
          </div>
        )}
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
                  <p><strong>{c.author}</strong> | {new Date(c.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
                  {currentUser !== null && currentUser === c.authorId && (
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

      {isEditModalOpen && (
        <WritePostModal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handlePostEditSubmit}
          initialTitle={post.title}
          initialContent={post.content}
          isEditMode={true}
        />
      )}
    </div>
  );
};

export default BoardDetailPage;
