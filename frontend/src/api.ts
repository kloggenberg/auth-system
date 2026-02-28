import axios from "axios";

const api = axios.create({
  baseURL: "http://host.docker.internal:5263/api",
});

export default api;