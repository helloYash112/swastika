import React, { useState } from "react";
import Select from "react-select";
import "./meterReadingPicker.css";
import { useSelector,useDispatch } from "react-redux";
import months from "../assets/months";
import StatusAnimation from "./StatusAnimation";
import { fetchMeterData } from "../userSlice";


export default function MeterReadingPicker() {
  const user = useSelector((state) => state.user?.user);
  const meters = user?.meters || [];
  const dispatch=useDispatch();
  const [month, setMonth] = useState(null);
  const [option, setOption] = useState(null);

  const calendar = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December"
  ];

  //  Meter options
  const options = meters.map((meter) => ({
    value: meter.id,
    label: meter.name,
  }));

  //  Month options (FIXED)
  const monthOptions = months.map((m, idx) => ({
    value: m.startDate,   
    label: calendar[idx],
    endDate: m.endDate    // optional extra data
  }));

 const handleSubmit = async (e) => {
  e.preventDefault();

  const meterId = option?.value;
  const startDate = month?.value;
  const endDate = month?.endDate;

  // guard check
  if (!meterId || !startDate || !endDate) {
    alert("Please select both meter and month");
    return;
  }

  try {
    const resultAction = await dispatch(
      fetchMeterData({ meterId, startDate, endDate })
    );
   
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="form-container">
      <h2 className="title">Get Reading By Month</h2>

      <StatusAnimation />

      <form onSubmit={handleSubmit}>
        
        {/* Month Picker */}
        <div className="form-group">
          <label>Select Month:</label>
          <Select
            options={monthOptions}
            value={month}
            onChange={setMonth}
            placeholder="Select Month"
          />
        </div>

        {/* Meter Selector */}
        <div className="form-group">
          <label>Select Meter:</label>
          <Select
            options={options}
            value={option}
            onChange={setOption}
            placeholder="Choose Meter"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}