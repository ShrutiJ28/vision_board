import axios from "axios";

const API = axios.create({
  baseURL: 'https://vision-board-af04.onrender.com/api',
});

delete API.defaults.headers.common["Authorization"];

export default API;