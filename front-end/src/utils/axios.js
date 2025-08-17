// src/utils/api.js (or wherever you store it)
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
