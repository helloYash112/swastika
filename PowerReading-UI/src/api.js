import axios from "axios";

const API = axios.create({
  baseURL: "https://swastika-9mp3.onrender.com/",
});

// Endpoints for all entities
export const USERS = () => API.get("/api/users");
export const METERS = () => API.get("/api/meters");
export const READINGS = () => API.get("/api/reading");

// Filtering by ID
export const USER = (id) => API.get(`/api/users/${id}`);
export const METER = (id) => API.get(`/api/meters/${id}`);
export const READING = (id) => API.get(`/api/reading/${id}`);
//creating a user
export const addUser = ({ user, password }) => {
  return API.post('/api/users', {
    userName: user,
    userPassword: password,
    meter: []
  });
}; 
