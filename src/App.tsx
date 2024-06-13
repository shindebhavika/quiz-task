// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './components/Admin';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import PlayQuiz from './components/PlayQuiz';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

 

  return (
    <Router>
      <div className="container  ">
        
        <Routes>
          <Route path="/admin" element={<Admin /> }  />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/playQuiz" element={<PlayQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
