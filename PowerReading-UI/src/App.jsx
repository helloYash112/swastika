import { Home } from './components/Home';
import './App.css'

import PowerInputForm from './components/PowerInputForm';
import Signup from './components/Signup'
import {Route, Routes} from 'react-router-dom';
import MeterForm from './components/MeterForm';
import Reading from './components/Reading';
import { dates,viewMeters } from './assets/meter';
import Login from './components/Login.jsx';



function App() {
  return (
    <Routes>
    <Route path='/home' element={<Home />}></Route>
    <Route path="/" element={<Signup />} /> 
    <Route path='/form' element={<PowerInputForm></PowerInputForm>}></Route>
    <Route path='/add/mater' element={<MeterForm />}></Route>
    <Route path='/get/reading' element={<Reading meters={viewMeters} dates={dates}/>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
   
    </Routes>
  )
}

export default App
