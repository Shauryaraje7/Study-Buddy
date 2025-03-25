import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [degree, setDegree] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !name || !age || !degree) {
      alert('Please fill all fields');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: email, password, name, age, degree })
      });
      const data = await response.json();
      console.log('Sign-up response:', data, 'Status:', response.status);
      if (response.ok) {
        localStorage.setItem('user_id', email);
        alert('Sign-up successful! Welcome aboard!');
        window.location.href = '/mainpanel'; // Force reload to update App.jsx state
      } else {
        console.error('Sign-up failed:', data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      alert('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder="Pursuing Degree (e.g., 10th, B.Sc)" value={degree} onChange={(e) => setDegree(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
}

export default SignUp;