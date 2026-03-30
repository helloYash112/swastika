import { useReducer, useEffect ,useState} from "react";
import './timer.css'


function reduceDate(state, action) {
    if (action.type === 'upd-date') {
        
        return new Date().toLocaleString(); 
    }
    return state;
}

function DateAndTime() {
    
    const [dateAndTime, dispatch] = useReducer(reduceDate, new Date().toLocaleString());
    const[tick,setTick]=useState(false);

    useEffect(() => {
        
        const timer = setInterval(() => {
            dispatch({ type: 'upd-date' });
            setTick(true);
            setTimeout(() => setTick(false), 220); 
        }, 1000);

        return () => clearInterval(timer);
    }, []);

   
return (
  <span
    id="timer"
    role="status"
    aria-live="polite"
    className={tick ? "tick" : ""}
  >
    <span className="time">{dateAndTime}</span>
    <span className="tz">Local time</span>
  </span>
);


}

export default DateAndTime;