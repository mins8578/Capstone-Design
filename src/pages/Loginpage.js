import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../components/loginpage/loginpage.css";
import hallymLogo from "../asset/한림대학교 로고2.png";

const Loginpage = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!id || !pw) {
            alert("ID와 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/login", {
                userID: id,
                pwd: pw,
            });

            const token = response.data.token;
            const username = response.data.username;

            alert(`${username}님 반갑습니다!`);
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("로그인 처리 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <img 
                src={hallymLogo} 
                alt="한림대학교 로고" 
                className="login-logo" 
            />
            
            <div className="login-form-container">
                <h2 className="login-title">소프트웨어학부 포털</h2>
                
                <div className="input-group">
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="@hallym.ac.kr"
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <button 
                    className="login-button" 
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "로그인 중..." : "로그인"}
                </button>

                <div className="login-links">
                    <Link to="/find-password/email">비밀번호 찾기</Link>
                    <Link to="/signup/terms">회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;