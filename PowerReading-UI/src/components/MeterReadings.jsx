import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import "./meterReadings.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import DownloadPDFButton from "./DownloadPDFButton";
import formatINR from "../assets/currency-formater";

export default function MeterReadings() {
  const charge = 5.82;
  const meters = useSelector((state) => state.user.user?.meters || []);
  const user = useSelector((state) => state.user.user);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const navigater = useNavigate();
  const [readings, setReadings] = useState([]);
  const options = meters.map((meter) => ({
    value: meter.id,
    label: meter.name,
  }));

  // const selected = meters.find((m) => m.id === selectedMeter?.value);
  useEffect(() => {
    if (selectedMeter) {
      const selected = meters.find((m) => m.id === selectedMeter.value);
      if (selected) {
        setReadings(selected.readings || []);
      }
    }
  }, [selectedMeter, meters]);
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  const totalUnits = readings.reduce((sum, r, idx) => {
    if (idx === 0) return sum;
    return sum + (r.kwh - readings[idx - 1].kwh);
  }, 0);

  const totalAmount =Math.round(totalUnits * charge);
  const lastReading = readings.at(-1)?.kwh ?? 0;

  return (
    <div className="meter-readings">
      <BackButton></BackButton>
      <DownloadPDFButton selectedMeter={selectedMeter}></DownloadPDFButton>
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
              <th>Net KWH</th>
              <th>Amount</th>
              <th>PF</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((r, idx) => {
              const prev = readings[idx - 1];
              const tot = idx > 0 ? r.kwh - prev.kwh : 0;
              const amount =Math.round(tot * charge);

              return (
                <tr key={r.rid}>
                  <td>{r.rid}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.kwh}</td>
                  <td>{tot}</td>
                  <td style={{ textAlign: "right" }}>{formatINR(amount)}</td>
                  <td>{r.pf}</td>
                </tr>
              );
            })}

            {/*  SUMMARY ROW */}
            <tr className="summary-row">
              <td colSpan="3">
                <strong>TOTAL</strong>
              </td>
              <td>
                <strong>Last: {lastReading}</strong>
              </td>
              <td>
                <strong>{totalUnits}</strong>
              </td>
              <td style={{ textAlign: "right" }}>
                <strong>{formatINR(totalAmount)}</strong>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No readings yet.</p>
      )}
    </div>
  );
}
