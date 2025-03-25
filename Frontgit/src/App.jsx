import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import Profile from './components/Profile';
import Progress from './components/Progress';
import Test from './components/Test';
import ExamPreparation from './components/ExamPreparation';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user_id');
    setUser(user)
    return user ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <div className="app-container">
        {user && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<ProtectedRoute><MainPanel /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
            <Route path="/exam-preparation" element={<ProtectedRoute><ExamPreparation /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;