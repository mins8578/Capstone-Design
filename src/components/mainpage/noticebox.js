import React from 'react';
import './noticebox.css';
import { FaArrowCircleRight } from 'react-icons/fa';

function NoticeBox({ title }) {
  return (
    <div className="notice-box">
      <div className="content">{title}</div>
      <div className="bottom">
        <div className="arrow"><FaArrowCircleRight size={30} color="white" /></div>
      </div>
    </div>
  );
}

export default NoticeBox;
