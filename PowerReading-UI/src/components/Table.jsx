import { useSelector } from "react-redux";
import formatINR from "../assets/currency-formater";
import './table.css'

export default function Table({ selectedMeter }) {
  const charge = 5.82;

  const user = useSelector((state) => state.user?.user);
  const meters = user?.meters ?? [];

  const meter = meters.find(
    (m) => m.id === selectedMeter?.value
  );

  const readings = meter?.readings ?? [];

  const totalUnits = readings.reduce((sum, r, idx) => {
    if (idx === 0) return sum;
    return sum + (r.kwh - readings[idx - 1].kwh);
  }, 0);

  const totalAmount = Math.round(totalUnits * charge);
  const lastReading = readings.at(-1)?.kwh ?? 0;

    
    return <>
    {
        readings && readings.length > 0 ? ( <table className="readings-table">
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
        </table>) : (<p>No readings yet.</p>)
    }
    
    </>
}