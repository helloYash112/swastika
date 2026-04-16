import { Header } from "./Header"
import './home.css'
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom"


export function Home(){
    const navigater=useNavigate();
    const {user}=useSelector(state=>state.user);
    console.log("user",user);
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