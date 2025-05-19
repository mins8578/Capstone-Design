import React, { useState } from 'react';
import '../../components/communitypage/writepostmodal.css';
// FaTimes import 제거

const WritePostModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({ title, content });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('게시글 등록 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <h3>게시글 작성</h3>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />
        <div className="modal-actions">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '등록'}
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default WritePostModal;