import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/findpasswordpage/ResetPassword.css';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!newPassword || !confirmPassword) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // TODO: 비밀번호 변경 API 연결
        navigate('/login');
    };

    return (
        <div className="page-container">
            <div className="top-logo">
                <img src={hallymLogo} alt="한림대학교 로고" />
            </div>

            <div className="form-area">
                <p className="label">새 비밀번호를 입력해주세요.</p>
                <input
                    type="password"
                    className="password-input"
                    placeholder="새 비밀번호 입력"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="password-input"
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="check-button" onClick={handleSubmit}>확인</button>
            </div>
        </div>
    );
}

export default ResetPassword;
