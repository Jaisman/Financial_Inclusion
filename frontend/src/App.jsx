import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './components/UI/LanguageContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Credit from './components/Credit';
import EduChat from './components/EduChat';
import NGO from './components/NGO';
import FinancialQuizPage from './components/FinancialQuizPage';
import FloatingChatButton from './components/UI/FloatingChatButton';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login/>}/>
            {/* <Route path="/register" element={<Register/>}/> */}
            {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
            {/* <Route path="/profile" element={<ProfilePage/>}/> */}
            {/* <Route path="/credit" element={<AICreditScoreInsights/>}/> */}
            {/* <Route path="/ngo" element={<NGOPage/>}/> */}
            <Route path="/educhat" element={<EduChat/>}/>
            <Route path="/quiz" element={<FinancialQuizPage/>}/>
          </Routes>
          {isLoggedIn && <FloatingChatButton />}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
