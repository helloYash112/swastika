import { Home } from './components/Home';
import './App.css'

import PowerInputForm from './components/PowerInputForm';
import ReadingForm from './components/ReadingForm.jsx';
import {Route, Routes} from 'react-router-dom';
import MeterForm from './components/MeterForm';
import Reading from './components/Reading';
import { dates,viewMeters } from './assets/meter';
import Login from './components/Login.jsx';
import Signup1 from './components/Signup1.jsx';
import MeterReadings from './components/MeterReadings.jsx';
import MeterReadingPicker from './components/MeterReadingPicker.jsx';



function App() {
  return (
    <Routes>
    <Route path='/home' element={<Home />}></Route>
    <Route path="/" element={<Signup1 />} /> 
    <Route path='/form' element={<ReadingForm/>}></Route>
    <Route path='/add/mater' element={<MeterForm />}></Route>
    <Route path='/get/reading' element={<MeterReadings></MeterReadings>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/date-picker' element={<MeterReadingPicker />}></Route>
   
    </Routes>
  )
}

export default App
