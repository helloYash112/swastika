import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { useRef, useState, useEffect } from "react";
import StatusAnimation from "./StatusAnimation";
import UserInput from "./UserInput";
//import './reading-form.css';
//import "./signup1.css";
import '../App.css'
import power from "../assets/logo/power.png";
import { addReading } from "../userSlice";
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker'
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const getFormattedData = (selectedDate, selectedTime) => {
  return {
    // Returns "YYYY-MM-DD"
    date: selectedDate ? selectedDate.toLocaleDateString('en-CA') : "", 
    
    // Returns "HH:mm:ss" (adds :00 if seconds are missing)
    time: selectedTime && selectedTime.split(':').length === 2 
          ? `${selectedTime}:00` 
          : selectedTime 
  };
};
function ReadingForm() {
  const kwhRef = useRef(null);
  const pfRef = useRef(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const dispatch = useDispatch();
  const icon = <img src={power} alt="Power Icon" width={20} height={20} />;
  const meters = useSelector((state) => state.user.user?.meters);
  const user = useSelector((state) => state.user.user);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const navigate = useNavigate();
  const [showPickers, setShowPickers] = useState(false);
  function submitReading(e) {
    e.preventDefault();
    if (
      kwhRef.current.value.trim() === "" ||
      pfRef.current.value.trim() === "" ||
      selectedMeter === null
    ) {
      alert("Input fields should not be empty!");
      return;
    }
    const dateAndTime = (date && time) ? getFormattedData(date, time) : null;
    const readings = {
      mid: selectedMeter.value,
      date: dateAndTime?.date || new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      time:dateAndTime?.time || new Date().toTimeString().split(" ")[0], // "HH:mm:ss"
      kwh: parseFloat(kwhRef.current.value),
      pf: parseFloat(pfRef.current.value),
    };
    dispatch(addReading(readings));
  }
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="container">
      <StatusAnimation></StatusAnimation>
      <form onSubmit={submitReading}>

        <UserInput
          type="number"
          ref={kwhRef}
          placeholder="Enter KWH value"
          icon={icon}
        ></UserInput>
        <UserInput
          type="number"
          ref={pfRef}
          placeholder="Enter PF value"
          icon={icon}
        ></UserInput>
        <Select
          options={
            meters?.map((meter) => ({
              value: meter.id,
              label: meter.name,
            })) ?? []
          }
          value={selectedMeter}
          onChange={(option) => setSelectedMeter(option)}
        />
        {showPickers && <div className="form-picker-container">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Select Date"
            dateFormat="yyyy-MM-dd"
          />
          <TimePicker
            onChange={setTime}
            value={time}
            disableClock={true} // Recommended for easier styling
            
          />
        </div>}
        <div className="toggle-container">
          <span style={{ color: "white", fontSize: "14px" }}>{showPickers ? "Exclude date&time ?" :"Include date&time ?"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={showPickers}
              onChange={() => setShowPickers(!showPickers)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <button> Save data...</button>
        <BackButton></BackButton>
      </form>

    </div>
  );
}
export default ReadingForm;
