import axios from "axios";

const API = axios.create({
  baseURL: "https://swastika-9mp3.onrender.com/",
});

// Endpoints for all entities
 const USERS = () => API.get("/api/users");
 const METERS = () => API.get("/api/meters");
 const READINGS = () => API.get("/api/reading");

// Filtering by ID
 const USER = (id) => API.get(`/api/users/${id}`);
 const METER = (id) => API.get(`/api/meters/${id}`);
 const READING = (id) => API.get(`/api/reading/${id}`);
 const userMeter=(id) =>API.get(`/api/meters/user${id}`);
//creating a user
 const addUser = ({ user, password,meters=[] }) => {
  return API.post('/api/users', {
    userName: user,
    userPassword: password,
    meter: meters
  });
}; 
//checking user credentials

export const getUser = (userName, userPassword) => {
  return API.get(`/api/users/login?userName=${userName}&userPassword=${userPassword}`);
};

//save reading to meter by mid
/**
 * Java DTO:
 * public record ReadingDTO(LocalDate date, LocalTime time, double kwh, float pf) {}
 *
 * JS client function:
 */
const addReading = ({ id, date, time, kwh, pf }) => {
  return API.post(`api/meters/reading/${id}`, {
    date,
    time,
    kwh,
    pf,
  });
};
//add meter to user 
//MeterDTO(String meterName,String meterNumber,String meterMacAddress) 
const addMeter = (userId, meter) => {
  return API.post(`api/meters/meter`, { 
    userId, 
    meter  
  });
};

export const userApi={
  listOfAll :{
    USERS,
    METERS,
    READINGS
  },
  getById:{
    USER,
    METER,
    READING,
    userMeter
  },
  create :{
    addUser,
    addReading,
    addMeter
  },
  auth :{
    getUser
  }
}