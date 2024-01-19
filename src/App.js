// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Comp/Login';
import RegistrationForm from './Comp/Register';
import Quiz from './Comp/Quiz';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedQuizType, setSelectedQuizType] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser)

    if (storedUser) {
      setUser(storedUser);
    }
    fetchLeaderboard();
  }, []);
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };
  const updateLeaderboard = async (student, score) => {
    try {
      // Update leaderboard on the server
      const response = await fetch('http://localhost:3001/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student, score }),
      });

      if (response.ok) {
        // If successful, fetch updated leaderboard
        fetchLeaderboard();
        localStorage.setItem(`quizTaken_${selectedQuizType}_${user}`, 'true');
      } else {
        console.error('Error updating leaderboard:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  const handleLogin = (user) => {
    console.log(user.username);
    setUser(user.username);
    localStorage.setItem('user',user.username);
  };

  const handleLogout = () => {
    // Perform logout actions, e.g., clearing user data
    setUser(null);
    setSelectedQuizType(null);
    localStorage.removeItem('user');
    
  };
  const isQuizTaken = () => {
    // Check if the quiz has been taken by the current user
    return localStorage.getItem(`quizTaken_${selectedQuizType}_${user}`) === 'true';
  };
  
  return (
   
      <Routes>
        <Route index path="/login" element={user ? <Navigate to="/quiz" /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/quiz" /> : <RegistrationForm onRegister={handleLogin} />} />
        <Route
        path="/quiz"
        element={
          user ? (
            selectedQuizType ? (
              isQuizTaken() ? (
                <Quiz
                  quizType={selectedQuizType}
                  student={localStorage.getItem('user')}
                  onLogout={handleLogout}
                  leaderboard={leaderboard}
                  viewOnly={true} 
                />
              ) : (
                <Quiz
                  quizType={selectedQuizType}
                  student={localStorage.getItem('user')}
                  updateLeaderboard={updateLeaderboard}
                  onLogout={handleLogout}
                  leaderboard={leaderboard}
                />
              )
            ) : (
              <QuizTypeSelection onSelectQuizType={setSelectedQuizType} />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
        <Route index element={user ? <Navigate to="/quiz" /> : <Navigate to="/login" />} />
      </Routes>
   
  );
};
const QuizTypeSelection = ({ onSelectQuizType }) => {
  const handleQuizSelection = (quizType) => {
    onSelectQuizType(quizType);
  };

  return (
    <div>
      <h2>Select Quiz Type</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => handleQuizSelection('Quiz 1')}>Quiz 1</button>
        <button onClick={() => handleQuizSelection('Quiz 2')}>Quiz 2</button>
        <button onClick={() => handleQuizSelection('Quiz 3')}>Quiz 3</button>
      </div>
    </div>
  );
};
export default App;
