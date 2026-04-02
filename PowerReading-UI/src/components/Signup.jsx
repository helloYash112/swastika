import './signup.css'
import { useRef,useState,useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {addUser} from '../api.js'

function reducer(state, action) {
    switch (action.type) {
      case 'add-meter': {
        return {
          ...state,
          meter: action.value
        };
      }
      case 'add-user': {
        return { 
          ...state,
          user: action.value
        };
      }
      case 'reset': {
        return {}; 
      }
      default: { 
        return state;
      }
    }
  }
export default function Signup() {
    const userRef=useRef(null);
    const pswRef=useRef(null);
    const [status,setStatus]=useState(null);
    const navigate=useNavigate();
    const[state,dispatcher]=useReducer(reducer,{});
    
    async function  onSubmit(e){
        e.preventDefault(); 
        //sending data to api
        try {
            setStatus('loading....');
            
           
            const response = await addUser({
              user: userRef.current.value,
              password: pswRef.current.value
            });
          
            if (response) {
              setStatus('signup successfull....'); // Fixed spelling
            
              console.log("Success:", response); 
            }
          
          } catch (error) {
            
            setStatus('Error occurred');
            console.log(error.message);
          }
        
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

    <button id='sign-sub' type="submit">Signup</button>
</form>
    );
}

