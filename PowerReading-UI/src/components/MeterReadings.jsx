import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import "./meterReadings.css"; 

export default function MeterReadings() {
  const meters = useSelector((state) => state.user.user?.meters || []);
  const [selectedMeter, setSelectedMeter] = useState(null);

  const options = meters.map((meter) => ({
    value: meter.id,
    label: meter.name,
  }));

  const selected = meters.find((m) => m.id === selectedMeter?.value);

  return (
    <div className="meter-readings">
      <Select
        options={options}
        value={selectedMeter}
        onChange={(option) => setSelectedMeter(option)}
        placeholder="Select a meter..."
      />

      {selected && (
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
            {selected.readings.map((r) => (
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
      )}
    </div>
  );
}
