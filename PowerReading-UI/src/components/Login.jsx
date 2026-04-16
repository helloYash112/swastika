import React, { useState ,useEffect,useRef} from 'react';

import { useNavigate } from 'react-router-dom';
import {fetchByNameAndPassword} from '../userSlice.js';
import './signup1.css'
import {useDispatch,useSelector} from 'react-redux';
import StatusAnimation from './StatusAnimation.jsx';
import UserInput from './UserInput.jsx';

const Login= () => {
  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { status} = useSelector((state) => state.user);
  const emailRef=useRef(null);
  const pswRef=useRef(null);
 
 const handleLogin = (e) => {
  e.preventDefault();

  dispatch(
    fetchByNameAndPassword({
      userName: emailRef.current.value,
      userPassword: pswRef.current.value,
    })
  );
};
console.log(status);
useEffect(() => {
  if (status === "success") {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 1500); 

    return () => clearTimeout(timer);
  }
}, [status, navigate]);

  return (
    <div className="container">
      
         <StatusAnimation ></StatusAnimation>
        
        <form onSubmit={handleLogin} className="login-form">
          <UserInput type="email" placeholder="Enter Email" ref={emailRef} icon="📧"></UserInput>
          <UserInput type="password" placeholder="Enter Password" ref={pswRef} icon="🔒"></UserInput>
         

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>
 
    </div>
  );
};

export default Login;