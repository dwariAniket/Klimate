import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '20px'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    border: '1px solid #e2e8f0'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    margin: '12px 0',
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    color: '#1e293b',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#3b82f6'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  };

  const linkStyle = {
    color: '#3b82f6',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    marginTop: '25px',
    fontSize: '14px',
    fontWeight: '500'
  };

  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo - simulate login
    onLogin({ username: 'Isabella' }, 'demo-token-123');
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          color: '#1e293b',
          fontSize: '32px',
          fontWeight: '700'
        }}>
          Welcome Back
        </h2>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            required
            style={focusedInput === 'email' ? inputFocusStyle : inputStyle}
          />
        </div>
        
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            required
            style={focusedInput === 'password' ? inputFocusStyle : inputStyle}
          />
        </div>
        
        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
        
        <Link to="/register" style={linkStyle}>
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
};

export default Login;