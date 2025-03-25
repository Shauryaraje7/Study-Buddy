import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user_id', email); // Store user_id instead of token
        console.log('Signed in successfully:', data);
        setTimeout(() => {
          navigate('/'); // Redirect to home or dashboard
        }, 300)
      } else {
        console.error('Sign-in error:', data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Sign-in failed. Please try again.');
    }
  };

  return (
    <div className="signin">
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <p>
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default SignIn;