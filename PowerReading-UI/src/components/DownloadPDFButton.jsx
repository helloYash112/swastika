import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";
import formatINR from "../assets/currency-formater";



export default function DownloadPDFButton({ selectedMeter }) {
  const meters = useSelector((state) => state.user.user.meters);
  const charge =5.82;

  const handleDownload = () => {
    if (!selectedMeter) {
      alert("Please select a meter first!");
      return;
    }

    const meter = meters.find((m) => m.id === selectedMeter.value);
    if (!meter || !meter.readings?.length) {
      alert("No readings available for this meter.");
      return;
    }
    let totalUnits = 0;

    const body = meter.readings.map((r, idx) => {
      const prev = meter.readings[idx - 1];
      const net = idx > 0 ? r.kwh - prev.kwh : 0;
      const amount = Math.round(net * charge);
      
     

      totalUnits += net;

      return [
        r.rid,
        r.date,
        r.time,
        r.kwh,
        net,
        formatINR(amount),
        r.pf
      ];
    });

    const totalAmount = Math.round(totalUnits * charge);
    const lastReading = meter.readings.at(-1)?.kwh ?? 0;
     
    /*  Add TOTAL row */
    body.push([
      "TOTAL",
      "",
      "",
      `Last: ${lastReading}`,
      totalUnits,
      formatINR(totalAmount),
      ""
    ]);

    const doc = new jsPDF();
    doc.text(`Readings for ${meter.name}`, 14, 10);

    //autotable
    autoTable(doc, {
      head:[["RID", "Date", "Time", "KWH", "NET KWH", "AMOUNT", "PF"]],
      body: body,
    });

    doc.save(`${meter.name}-readings.pdf`);
  };

  return (
    <button onClick={handleDownload} className="back-button">
      Download PDF
    </button>
  );
}
