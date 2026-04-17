import React, { useRef, useEffect } from "react";
import { createUser } from "../userSlice";
import StatusAnimation from "./StatusAnimation"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import UserInput from "./UserInput";

import './signup1.css'

const Signup1 = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { status, error, user } = useSelector(state => state.user);
    const navigation = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const userInput = {
            userName: email,
            userPassword: password,
        };
        const response = dispatch(createUser(userInput));
        console.log(response);
    };
    useEffect(() => {
        if (status === "success") {
            const time = setTimeout(() => {
                navigation("/home");
            }, 2000);

            return () => clearTimeout(time);
        }
    }, [status, navigation]);

    return (
        <div className="container">
            <StatusAnimation />

            <form onSubmit={handleSubmit}>
               
                <UserInput type="email" placeholder="Enter Email" ref={emailRef} icon="📧"></UserInput>
                <UserInput type="password" placeholder="Enter Password" ref={passwordRef} icon="🔒"></UserInput>
                <button type="submit">Sign Up </button>
                 <p>have an account ? login here...</p>
                <Link className="link" to='/login'> login </Link>
            </form>
           
        </div>
    );
};

export default Signup1;