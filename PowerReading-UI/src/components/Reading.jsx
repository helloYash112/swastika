import Select from "react-select";
import { useReducer } from "react";
import './reading.css'

const initialState = {
  meter:null,
  date: null
};

function reducer(state, action) {
  switch (action.type) {
    case "set-date":
      return { ...state, date:action.value }; 
    case "set-meter":
      return { ...state, meter:action.value};
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function Reading({ meters, dates }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function display() {
    console.log(state.meter);
    alert(JSON.stringify(state, null, 2));
  }

  function selectedMeter(option) {
    if(option===null){
        dispatch({type:'reset'})
    }
    dispatch({
      type: "set-meter",
      value: option
    });
  }

  function selectedDates(option) {
     if(option===null){
        dispatch({type:'reset'})
    }
    dispatch({
      type: "set-date",
      value: option
    });
  }

  return (
    <div id="reading">
      <label htmlFor="meter_reading">Select Meter</label>
      <Select
        id="meter_reading"
        options={meters}
        isClearable
        placeholder="Choose a meter..."
        onChange={selectedMeter}
        value={state.meter}
        
      />

      <label htmlFor="date">Select Specific Date from List</label>
      <Select
        id="date"
        options={dates}
        isClearable
        placeholder="Choose a date..."
        onChange={selectedDates}
        value={state.date}
        
      />

      <button id="reading_btn" onClick={display}>Submit...</button>
    </div>
  );
}
