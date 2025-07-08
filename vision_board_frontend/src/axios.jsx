import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
});

delete API.defaults.headers.common["Authorization"];

export default API;