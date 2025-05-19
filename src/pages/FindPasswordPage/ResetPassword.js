import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/findpasswordpage/ResetPassword.css'; // 공통 CSS로 변경 예정
import hallymLogo from '../../asset/한림대학교 로고2.png';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const navigate = useNavigate();

    // 비밀번호 강도 검사 함수
    const checkPasswordStrength = (password) => {
        if (!password) return '';
        
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);
        
        if (password.length < 8) return 'weak';
        if (hasLetter && hasNumber && hasSpecial) return 'strong';
        if ((hasLetter && hasNumber) || (hasLetter && hasSpecial) || (hasNumber && hasSpecial)) return 'medium';
        return 'weak';
    };

    const handleNewPasswordChange = (e) => {
        const newPass = e.target.value;
        setNewPassword(newPass);
        setPasswordStrength(checkPasswordStrength(newPass));
    };

    const handleSubmit = async () => {
        if (!newPassword || !confirmPassword) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (passwordStrength === 'weak') {
            alert('더 강력한 비밀번호를 설정해주세요.');
            return;
        }

        const email = sessionStorage.getItem('email');
        if (!email) {
            alert('이메일 정보가 없습니다. 처음부터 다시 시도해주세요.');
            navigate('/find-password/email');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('http://192.168.219.48:8080/api/reset', {
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="password-page-container">
            <div className="password-top-logo">
                <img src={hallymLogo} alt="한림대학교 로고" />
            </div>

            <div className="password-form-area">
                <p className="password-label">새 비밀번호 설정</p>
                <p className="password-rules">
                    * 8자 이상의 영문, 숫자, 특수문자를 조합하여 입력해주세요.
                </p>
                
                <input
                    type="password"
                    className="password-input"
                    placeholder="새 비밀번호 입력"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                
                {newPassword && (
                    <div className="password-strength">
                        <div className={`password-strength-bar ${passwordStrength}`}></div>
                    </div>
                )}
                
                <input
                    type="password"
                    className="password-input"
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <button 
                    className="check-button" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? '처리 중...' : '비밀번호 변경'}
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;