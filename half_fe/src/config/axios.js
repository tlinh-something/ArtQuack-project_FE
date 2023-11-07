import axios from "axios";

const api = axios.create({
  baseURL: "http://167.172.92.40:8080",
});

export default api;
