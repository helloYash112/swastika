import React, { useState } from 'react';
import {userApi} from '../api.js'
import { useNavigate } from 'react-router-dom';
import {fetchByNameAndPassword} from '../userSlice.js';
import './login.css';
import {useDispatch,useSelector} from 'react-redux';
const Login= () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
  
    try {
        
      const response = await dispatch(
        fetchByNameAndPassword({ 
          userName: formData.username, 
          userPassword: formData.password 
        })
      ).unwrap();
        //const response = await userApi.auth.getUser(formData.username, formData.password);
    
        
       console.log(response);
       setMessage('Login Successful!');
       setTimeout(()=>{
         navigate('/home');
 
       },1000);
    
    } catch (error) {
      setMessage('Connection failed.');
      setTimeout(()=>{
        navigate('/');

      },1000);
     
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