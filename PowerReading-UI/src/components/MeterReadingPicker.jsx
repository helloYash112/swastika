import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./meterReadingPicker.css";
import { useSelector, useDispatch } from "react-redux";
import {months,currentMonth} from "../assets/months";
import StatusAnimation from "./StatusAnimation";
import { fetchMeterData } from "../userSlice";
import BackButton from "./BackButton";
import Table from "./Table";

export default function MeterReadingPicker() {
  const user = useSelector((state) => state.user?.user);
  const meters = user?.meters || [];
  const dispatch = useDispatch();
  const [month, setMonth] = useState(null);
  const [option, setOption] = useState(null);
  const [selectedMeter, setMeter] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const calendar = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
    endDate: m.endDate, 
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
        fetchMeterData({ meterId, startDate, endDate }),
      );

      setMeter(option);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setMeter(null);
    }
  };
  // Reset back to form page
  const handleClose = () => {
    const loadCurrentMonthData =async ()=>{
       try{
      const {startDate,endDate}=currentMonth();
      const meterId = option?.value;
      const res=await dispatch(fetchMeterData({meterId,startDate,endDate}));
      //console.log(res.payload);

    }catch(err){
      console.error(err);

    }

    }
    loadCurrentMonthData();
    setIsSubmitted(false);
  };

  return (
    <div className={!isSubmitted ? "form-container" : "table-container"}>
      <h2 className="title">Get Reading By Month</h2>

      <StatusAnimation />
      {!isSubmitted ? (
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
          <BackButton to="/get/reading" label="Back to reading page"></BackButton>
        </form>
      ) : (
        <div>
          <button
            onClick={handleClose}
            style={{
              float: "right",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor:"red"
            }}
          >
            ✖
          </button>

          {selectedMeter != null && <Table selectedMeter={selectedMeter} />}
        </div>
      )}
    </div>
  );
}
