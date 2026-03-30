import './signup.css'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const userRef=useRef(null);
    const pswRef=useRef(null);
    const navigate=useNavigate();
    function onSubmit(e){
        e.preventDefault(); 
        
        if(userRef.current.value !='' && pswRef.current.value != '' ){
            alert(`userName :${userRef.current.value}  password :${pswRef.current.value}`)
            navigate('/home');

        }
        else{
            alert('user name or password should not be empty...')
        }


    }
    return (
       <form id='signup' onSubmit={onSubmit}>
        <h2>Login/Signup</h2>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username"  ref={userRef} placeholder="Enter your username" />
    </div>

    <div>
        <label for="password">Password</label>
        <input type="password" id="password" ref={pswRef} placeholder="Enter your password" />
    </div>

    <button id='sign-sub' type="submit">Signup/Login</button>
</form>
    );
}

