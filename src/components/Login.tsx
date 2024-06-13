// src/components/Login.tsx
import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const sampleQuestions = [
      {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin', 'Madrid'],
        correct: 'Paris'
      },
      {
        question: 'What is 2 + 2?',
        answers: ['3', '4', '5', '6'],
        correct: '4'
      },
      {
        question: 'What is the largest planet in our solar system?',
        answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        correct: 'Jupiter'
      },
      // Add more questions as needed
    ];
    
    localStorage.setItem('question', JSON.stringify(sampleQuestions));
    
  }, []);
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user: { username: string, password: string }) => 
        user.username === username && user.password === password
    );
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/playquiz');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input 
            type="text" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-gray-900 mt-4">
              Don't have an account? 
              <Link to="/register" className="text-sm text-blue-500 hover:underline mt-4"> Signup</Link>
            </p>
          </div>
          <button 
            type="submit" 
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
