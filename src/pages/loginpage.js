import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../components/loginpage/loginpage.css";
import hallymLogo from "../asset/한림대학교 로고2.jpg";

const Loginpage = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const response = await axios.post("/api/login", {
                userID: id, // ✅ 백엔드 DTO와 맞춰서 key를 userID로 수정
                pwd: pw,    // ✅ 백엔드 DTO와 맞춰서 pwd로 수정
            });

            const token = response.data.token; // ✅ JWT 토큰을 받음
            const username = response.data.username;

            alert(`${username}님 반갑습니다!`);

            // 토큰을 localStorage에 저장 (로그인 유지 목적)
            localStorage.setItem("token", token);

            navigate("/");
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);  // 백엔드에서 보낸 에러 메시지 표시
            } else {
                alert("로그인 처리 중 오류가 발생했습니다.");
            }
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
                <Link to="/find-password" style={{ color: "black", textDecoration: "none" }}>
                    ID/PW찾기
                </Link>
                <Link to="/signup/terms" style={{ color: "black", textDecoration: "none" }}>
                    회원가입
                </Link>
            </div>
        </div>
    );
};

export default Loginpage;


