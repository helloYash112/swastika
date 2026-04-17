import { useEffect } from "react";
import { Header } from "./Header"
import './home.css'
import { useSelector,useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom"


export function Home(){
    const navigater=useNavigate();
    const {user}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    //console.log("user",user);
    useEffect(()=>{
        let timer;
        if(user ===null){
            timer=setTimeout(()=>{
             navigater('/login');

            },700);

        }
        return ()=>clearTimeout(timer);

    },[user]);

    return<div id="app"
    >
        <Header></Header>
        <div id="menus">
             <button id="rbtn" onClick={()=>navigater('/form')}>Create Reading</button>
             <button id="rbtn" onClick={()=>navigater('/add/mater')}> Add Meter</button>
             <button id="rbtn" onClick={()=>navigater('/get/reading')}> Get Readings...</button>

        </div>
        
      
       
    </div>
}