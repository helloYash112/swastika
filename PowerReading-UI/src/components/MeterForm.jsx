import { useRef } from "react"
import './meter.css'
export default function MeterForm(){
    const mname=useRef('');
    const mnum=useRef('');
    const mmac=useRef('');
    function display(e){
        e.preventDefault();
        let mn=mname.current.value;
        let mnu=mnum.current.value;
        let mm=mmac.current.value;
        alert(`mName :${mn} mNum :${mnu} mMac :${mm}`)
    }
    return  <form id="meter" onSubmit={display}>
      <div>
        <label htmlFor="mname">Meter Name</label>
        <input id="mname" type="text" ref={mname} placeholder="enter meter name" />
      </div>
      <div>
        <label htmlFor="mnum">Meter Number</label>
        <input id="mnum" type="text" ref={mnum} placeholder="enter meter number" />
      </div>
      <div>
        <label htmlFor="mmac">Meter Mac Address</label>
        <input id="mmac" type="text" ref={mmac} placeholder="enter mac address" />
      </div>
      <button id="mbtn" type="submit" >Submit</button>
    </form>
}