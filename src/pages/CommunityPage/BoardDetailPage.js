import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/communitypage/boarddetailpage.css';

const BoardDetailPage = () => {
  const { id } = useParams(); // 게시글 ID
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ 댓글 불러오는 함수 (useCallback으로 감쌈)
  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/api/comments/board/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('댓글 불러오기 실패:', err);
    }
  }, [id]);

  // ✅ 게시글, 댓글, 로그인 사용자 정보 가져오기
  useEffect(() => {
    axios.get('/api/board')
      .then(res => {
        const found = res.data.find(item => item.id === parseInt(id));
        if (found) setPost(found);
        else alert("게시글을 찾을 수 없습니다.");
      })
      .catch(err => console.error('게시글 불러오기 실패:', err));

    fetchComments();

    axios.get('/api/user/me', { withCredentials: true })
      .then(res => setCurrentUser(res.data.userID))
      .catch(err => console.error('사용자 정보 불러오기 실패:', err));
  }, [id, fetchComments]);

  // ✅ 댓글 등록
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요.");

    try {
      await axios.post(
        `/api/comments/board/${id}`,
        { content: newComment },
        { withCredentials: true }
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
      await axios.put(
        `/api/comments/${commentId}`,
        { content: editContent },
        { withCredentials: true }
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
      await axios.delete(`/api/comments/${commentId}`, { withCredentials: true });
      fetchComments();
    } catch (err) {
      alert('댓글 삭제 실패');
      console.error('댓글 삭제 실패:', err);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)}>← 목록으로</button>
      <h2>{post.title}</h2>
      <p className="meta">👤 {post.author} | 🕒 {new Date(post.createdAt).toLocaleString()}</p>
      <p className="content">{post.content}</p>

      <hr />
      <h3>💬 댓글</h3>
      <div className="comments">
        {comments.length === 0 && <p>댓글이 없습니다.</p>}
        {comments.map(c => (
          <div key={c.id} className="comment">
            {editingId === c.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleEditSubmit(c.id)}>확인</button>
                <button onClick={() => setEditingId(null)}>취소</button>
              </>
            ) : (
              <>
                <p><strong>{c.author}</strong> | {new Date(c.createdAt).toLocaleString()}</p>
                <p>{c.content}</p>
                {currentUser === c.author && (
                  <>
                    <button onClick={() => startEdit(c.id, c.content)}>✏️ 수정</button>
                    <button onClick={() => handleDelete(c.id)}>🗑️ 삭제</button>
                  </>
                )}
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
        />
        <button onClick={handleCommentSubmit}>등록</button>
      </div>
    </div>
  );
};

export default BoardDetailPage;
