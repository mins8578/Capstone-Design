import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../components/loginpage/loginpage.css";
import hallymLogo from "../asset/한림대학교 로고2.jpg";

const LoginPage = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try { //백엔드 연결
            const response = await axios.post("http://localhost:8080/api/login", {
                id: id,
                password: pw,
            });

            if (response.data.status === "success") {
                alert(`${response.data.username}님 환영합니다!`);
                // 로그인 성공 후 메인 페이지로 이동
                navigate("/");
            } else {
                alert(response.data.message);
                window.location.reload(); // 웹페이지 새로고침
            }
        } catch (error) {
            alert("아이디 또는 비밀번호가 잘못 입력되었습니다.");
            console.error(error);
            window.location.reload(); // 웹페이지 새로고침
        }
    };

    return (
        <div className="login-container">
            <img src={hallymLogo} alt="한림대학교 로고" className="login-logo" />

            <div className="input-group">
                <label htmlFor="userId">ID</label>
                <input
                    type="text"
                    id="userId"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="@hallym.ac.kr"
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">PW</label>
                <input
                    type="password"
                    id="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                />
            </div>

            <button className="login-button" onClick={handleLogin}>
                로그인
            </button>

            <div className="login-links">
                <a href="#">ID/PW찾기</a>
                <Link to="/signup/terms" style={{ color: "black", textDecoration: "none" }}>
                    회원가입
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;

