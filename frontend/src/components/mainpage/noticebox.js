
import React from 'react';
import './noticebox.css';
import { FaArrowCircleRight } from 'react-icons/fa';

function NoticeBox({ title, icon, description }) {
  return (
    <div className="notice-box">
      <div className="content">
        <div className="icon">{icon}</div>
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}
      </div>
      <div className="bottom">
        <div className="arrow"><FaArrowCircleRight size={30} color="white" /></div>
      </div>
    </div>
  );
}

export default NoticeBox;