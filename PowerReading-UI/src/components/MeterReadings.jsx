import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import "./meterReadings.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import DownloadPDFButton from "./DownloadPDFButton";
import KWHdailyUtilityGraph from "./KWHdailyUtilityGraph";

import Table from "./Table";

export default function MeterReadings() {
  const user = useSelector((state) => state.user.user);
  const meters = user?.meters ?? [];
  const [selectedMeter, setSelectedMeter] = useState(null);
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGraph, setGraph] = useState(false);

  const options = meters.map((meter) => ({
    value: meter.id,
    label: meter.name,
  }));
  function handleMeterOptions(e) {
    setSelectedMeter(e);
    setIsSubmitted(true);
  }
  // Reset back to form page
  const handleClose = () => {
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className={!isSubmitted ? "meter-readings" : "table-container"}>
      {!isSubmitted ? (
        <>
          <BackButton></BackButton>
          <button
            className="back-button"
            onClick={() => navigate("/date-picker")}
          >
            Get Reading By Months
          </button>
          <Select
            options={options}
            value={selectedMeter}
            onChange={handleMeterOptions}
            placeholder="Select a meter..."
            className="meter"
            isClearable
          />
        </>
      ) : (
        <>
          <button
            onClick={handleClose}
            style={{
              float: "right",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor: "red",
            }}
          >
            ✖
          </button>
          <DownloadPDFButton selectedMeter={selectedMeter}></DownloadPDFButton>
          <button
            style={{
              background: "linear-gradient(135deg, rgb(143, 12, 78), #13718d)",
            }}
            onClick={() => setGraph((prev) => !prev)}
          >
            {!isGraph ? "See Kwh&usage in graph " : "See on Table"}
          </button>
          {selectedMeter != null && !isGraph ? (
            <Table selectedMeter={selectedMeter} />
          ) : (
            <KWHdailyUtilityGraph />
          )}
        </>
      )}
      {selectedMeter ==null && (<h2 style={{color:"red"}}> Please select meter from list... </h2>)}
    </div>
  );
}
