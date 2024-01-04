// Create a new file Login.js
import React, { useState } from 'react';
import './Login.css'; // Create a CSS file for styling
import { ChevronRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if username and password are valid (you can implement your own logic here)
    if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
      onLogin();
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container" style={{background:'#6f6f6f'}}>
      <h2> </h2>
      <div className="input-group">
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            } 
          }}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Sign In
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Login;
