// src/components/communitypage/WritePostModal.js
import React, { useState, useEffect } from 'react';
import '../../components/communitypage/writepostmodal.css';

const WritePostModal = ({
  onClose,
  onSubmit,
  initialTitle = '',
  initialContent = '',
  mode = 'create', // 'create' or 'edit'
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // props가 바뀌었을 때 상태도 업데이트 (수정 시 필요)
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = async () => {
    if (!title.trim()) return alert('제목을 입력하세요.');
    if (!content.trim()) return alert('내용을 입력하세요.');

    setIsSubmitting(true);
    try {
      await onSubmit({ title, content });
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('게시글 저장 실패:', err);
      alert('게시글 저장 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <h3>{mode === 'edit' ? '게시글 수정' : '게시글 작성'}</h3>
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
          <button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '처리 중...' : mode === 'edit' ? '수정' : '등록'}
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default WritePostModal;
