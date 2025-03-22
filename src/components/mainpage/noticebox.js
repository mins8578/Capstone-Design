import React from 'react';
import './noticebox.css';

function NoticeBox({ title }) {
  return (
    <div className="notice-box">
      <div className="content">{title}</div>
      <div className="bottom">
        <div className="arrow">➡️</div>
      </div>
    </div>
  );
}

export default NoticeBox;
