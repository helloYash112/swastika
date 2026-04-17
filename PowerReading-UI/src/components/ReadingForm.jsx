import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { useRef, useState ,useEffect} from "react";
import StatusAnimation from "./StatusAnimation";
import UserInput from "./UserInput";
//import './reading-form.css';
import "./signup1.css";
import power from "../assets/logo/power.png";
import { addReading } from "../userSlice";
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton";

function ReadingForm() {
  const kwhRef = useRef(null);
  const pfRef = useRef(null);
  const dispatch = useDispatch();
  const icon = <img src={power} alt="Power Icon" width={20} height={20} />;
  const meters = useSelector((state) => state.user.user?.meters);
  const user=useSelector((state)=>state.user.user);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const navigater=useNavigate();
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
    
    const readings = {
      mid: selectedMeter.value,
      date: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      time: new Date().toTimeString().split(" ")[0], // "HH:mm:ss"
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

        <button> Save data...</button>
         <BackButton></BackButton>
      </form>
     
    </div>
  );
}
export default ReadingForm;
