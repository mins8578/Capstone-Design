import React from 'react';
import NoticeList from '../../pages/NoticePage/NoticeList';
import '../../components/noticepage/noticepage.css';
import logo from '../../asset/한림대학교 로고.png';
import home from '../../asset/Home.png';
import { useNavigate } from 'react-router-dom';


    const NoticePage = () => {
        const navigate = useNavigate();
        return (
            <div className="notice-container">
                <header className="notice-header">
                    <img src={logo} alt="한림대학교 로고" className="graduationcheck-logo" />
                    <h1>공지사항</h1>
                    <img src={home} alt="Home" className="home-icon" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                </header>

                <NoticeList />
            </div>
        );
    };

export default NoticePage;
