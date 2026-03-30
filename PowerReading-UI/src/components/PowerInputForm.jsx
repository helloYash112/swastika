import List from "./List.jsx";
import { useReducer,useRef } from "react";
import { meters } from "../assets/meter.js";
import "./powerInputForm.css";

const intialState = { label: '', value: '' };



function meterIdReducer(state,action){

    switch(action.type){
        case 'udt-id':{
            return{
                ...state,
                label:action.payload.label,
                value:action.payload.value

            }

        }
        case 'reset':
            {
            return intialState
        }
        default :{
            return state;

        }


    }

}
function meterNameReducer(state,action){
   

    switch(action.type){
        case 'udt-name':{
            return{
                ...state,
                label:action.payload.label,
                value:action.payload.value

            }

        }
        case 'reset':
            {
            return intialState
        }
        default :{
            return state;

        }


    }

}
function clearKwh(kwhRef){
    kwhRef.current.value='';
    kwhRef.current.focus();

}

function clearPf(pfRef){
    pfRef.current.value='';
    pfRef.current.focus();

}
export default function PowerInputForm() {
    const [mName, setMeterName] = useReducer(meterNameReducer, intialState);
     const [mId, setMeterId] = useReducer(meterIdReducer, intialState);
     const kwhRef=useRef(null);
       const pfRef=useRef(null);
       console.log(mName,mId);

    const meterName=[];
    const meterId=[];
    meters.forEach(ele=>{
        const obj={label :ele.name,value:ele.name};
        meterName.push(obj);
    })

    meters.forEach(ele=>{
        const obj={label :ele.id,value:ele.id};
        meterId.push(obj);
    })
    

     
    function handleMiterId(selectedId) {


         if (!selectedId)
         { 
            setMeterName({ type: 'reset' }); 
            setMeterId({ type: 'reset' });
             return;
             };

        if(!selectedId){
            setMeterId({
                type :'reset'
            })
            setMeterName({
                type :'reset'
            })
            return;
        }

    if (selectedId) {
        const match = meters.find(ele => ele.id === selectedId.label);
        if (match) {
           
            setMeterId({
                type: 'udt-id',
                payload: { label: match.id, value: match.id }
            });
            setMeterName({
                type: 'udt-name',
                payload: { label: match.name, value: match.name }
            });
        }
        else{
            setMeterId({
                type:'udt-id',
                payload:{
                    label:selectedId.value,
                    value:selectedId.value
                }
            })

        }
    }
     else {
       
        setMeterId({
            type: 'udt-name',
            payLoad: { label: selectedName.value, value: selectedName.value }
        });
    }
}

function handleMiterName(selectedName) {

    if (!selectedName)
         { 
            setMeterName({ type: 'reset' }); 
            setMeterId({ type: 'reset' });
             return;
             };

     if(!selectedName){
            setMeterId({
                type :'reset'
            })
            setMeterName({
                type :'reset'
            })
            return;
        }

    const match = meters.find(ele => ele.name === selectedName.label);
    if (match) {
       
        setMeterName({
            type: 'udt-name',
            payload: { label: match.name, value: match.name }
        });
        setMeterId({
            type: 'udt-id',
            payload: { label: match.id, value: match.id }
        });
    } else {
       
        setMeterName({
            type: 'udt-name',
            payload: { label: selectedName.value, value: selectedName.value }
        });
    }
}

function display() {
  const { label: meterLabel, value: meterValue } = mName;
  const { label: miterId, value: miterValue } = mId;

  const kwh = kwhRef.current.value;
  const pf = pfRef.current.value;
  clearKwh(kwhRef);
  clearPf(pfRef);
  setMeterName({type:'reset'});
  setMeterId({type:'reset'});
  alert(`kwh : ${kwh}, pf : ${pf}, meter-name : ${meterLabel}, miter-id : ${miterId}`);
}

    return (<div id="reading">
        <form id="input-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="kwh">kwh :</label>
            <input type='text' placeholder='enter a kwh value' id='kwh' ref={kwhRef}/>

            <label htmlFor="pf">pf :</label>
            <input type='text' placeholder='enter a pf value' id='pf' ref={pfRef}/>
            <label htmlFor="meter">Miter-Id</label>
           <List options={meterId} onChange={handleMiterId} value={mId}  />

            <label htmlFor="name">meter name :</label>
           <List 
              options={meterName} 
              onChange={handleMiterName} 
              value={mName}            
              title='name' 
           />
            <button id="btn" onClick={display}>Submit</button>
        </form>
        </div>
    );
}