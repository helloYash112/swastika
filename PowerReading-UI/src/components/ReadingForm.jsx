import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { useRef, useState } from "react";
import StatusAnimation from "./StatusAnimation";
import UserInput from "./UserInput";
//import './reading-form.css';
import "./signup1.css";
import power from "../assets/logo/power.png";
import { addReading } from "../userSlice";

function ReadingForm() {
  const kwhRef = useRef(null);
  const pfRef = useRef(null);
  const dispatch = useDispatch();
  const icon = <img src={power} alt="Power Icon" width={20} height={20} />;
  const meters = useSelector((state) => state.user.user?.meters);

  const [selectedMeter, setSelectedMeter] = useState(null);
  function submitReading(e) {
    e.preventDefault();
    const readings = {
      mid: selectedMeter.value,
      date: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      time: new Date().toTimeString().split(" ")[0], // "HH:mm:ss"
      kwh: parseFloat(kwhRef.current.value),
      pf: parseFloat(pfRef.current.value),
    };
    dispatch(addReading(readings));
  }
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

        <button> Save data...</button>
      </form>
    </div>
  );
}
export default ReadingForm;
