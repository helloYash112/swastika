import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import "./meterReadings.css"; 
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton";

export default function MeterReadings() {
  const meters = useSelector((state) => state.user.user?.meters || []);
  const user=useSelector((state)=>state.user.user);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const navigater=useNavigate();
  const [readings,setReadings]=useState([]);
  const options = meters.map((meter) => ({
    value: meter.id,
    label: meter.name,
  }));

 // const selected = meters.find((m) => m.id === selectedMeter?.value);
 useEffect(()=>{
  if(selectedMeter){
    const selected = meters.find((m) => m.id === selectedMeter.value);
    if(selected){
      setReadings(selected.readings || []);
    }
  }

 },[selectedMeter,meters])
  useEffect(() => {
  if (user === null) {
    navigate("/login");
  }
}, [user]);


  return (
    <div className="meter-readings">
      <BackButton></BackButton>
      <Select
        options={options}
        value={selectedMeter}
        onChange={(option) => setSelectedMeter(option)}
        placeholder="Select a meter..."
        className="meter"
        isClearable
      />

      {readings && readings.length > 0 ? (
  <table className="readings-table">
    <thead>
      <tr>
        <th>RID</th>
        <th>Date</th>
        <th>Time</th>
        <th>KWH</th>
        <th>PF</th>
      </tr>
    </thead>
    <tbody>
      {readings.map((r) => (
        <tr key={r.rid}>
          <td>{r.rid}</td>
          <td>{r.date}</td>
          <td>{r.time}</td>
          <td>{r.kwh}</td>
          <td>{r.pf}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No readings yet.</p>
)}

    </div>
  );
}
