import React, { useState } from 'react';
import {getUser} from '../api.js'
import { useNavigate } from 'react-router-dom';
import './login.css';
const Login= () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
  
    try {
      
        const response = await getUser(formData.username, formData.password);
    
        console.log(response)
        const data = response.data;
       console.log(data);
  
      if (response.status==200) {
        setMessage('Login Successful!');
        setTimeout(()=>{
          navigate('/home');
  
        },2000);
      } else {
        setMessage('Invalid username or password.');
        navigate('/');
      }
    } catch (error) {
      setMessage('Connection failed.');
      setTimeout(()=>{
        navigate('/');

      },2000);
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              required
              className="form-input"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="form-input"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Checking...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <p className={`status-message ${message.includes('Successful') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;