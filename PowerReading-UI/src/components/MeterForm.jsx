import { useRef } from "react";
import UserInput from "./UserInput";
import { useDispatch, useSelector } from "react-redux";
import "./signup1.css";
import StatusAnimation from "./StatusAnimation";
import { createMeter } from "../userSlice";

/**
 * 
meters
: 
[]
userId
: 
2
userName
: 
"rajputyashwardhan17747@gmail.com"
 */
export default function MeterForm() {
  const mname = useRef("");
  const mnum = useRef("");
  const mmac = useRef("");
  const { status, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function display(e) {
    e.preventDefault();
    let mn = mname.current.value;
    let mnu = mnum.current.value;
    let mm = mmac.current.value;
    const meter = {
      meterName: mn,
      meterNumber: mnu,
      meterMacAddress: mm,
    };
    const response = dispatch(createMeter({userId:user.userId,meter}));
    //console.log(response);
    console.log(user);
  }


  return (
    <div className="container">
      <StatusAnimation></StatusAnimation>
      <form onSubmit={display}>
        <UserInput
          type="text"
          placeholder="Enter meter name"
          ref={mname}
        ></UserInput>
        <UserInput
          type="text"
          placeholder="Enter meter number"
          ref={mnum}
        ></UserInput>
        <UserInput
          type="text"
          placeholder="Enter meter macaddress"
          ref={mmac}
        ></UserInput>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
