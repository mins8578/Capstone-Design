import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/findpasswordpage/ResetPassword.css';
import hallymLogo from '../../asset/한림대학교 로고2.jpg';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!newPassword || !confirmPassword) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            window.location.reload();
            return;
        }

        const email = sessionStorage.getItem('email');
        if (!email) {
            alert('이메일 정보가 없습니다. 처음부터 다시 시도해주세요.');
            navigate('/find-password/email');
            return;
        }

        try {
            const response = await axios.post('/api/reset', {
                email: email,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            });

            if (response.data.success === true) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                sessionStorage.removeItem('email'); // 인증 정보 정리
                navigate('/login');
            } else {
                alert(response.data.message || '비밀번호 변경 실패');
            }
        } catch (error) {
            console.error(error);
            alert('서버와의 연결 중 오류가 발생했습니다.');
        }
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
