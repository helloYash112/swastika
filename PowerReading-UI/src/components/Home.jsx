import { Header } from "./Header"
import './home.css'

import { useNavigate } from "react-router-dom"


export function Home(){
    const navigater=useNavigate();
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