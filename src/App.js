import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';  // 메인 페이지
import LoginPage from './pages/LoginPage';  // 로그인 페이지
import SignupTerms from './pages/SignupPage/SignupTerms';   // 약관 동의 페이지
import SignupForm from './pages/SignupPage/SignupForm';     // 회원정보 입력 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/terms" element={<SignupTerms />} />
        <Route path="/signup/form" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;


