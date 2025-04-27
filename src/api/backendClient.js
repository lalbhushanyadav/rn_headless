// src/api/backendClient.js
import axiosInstance from "./axiosInstance";

const backendClient = axiosInstance.create({
	baseURL: import.meta.env.VITE_BACKEND_API_URL, // Accessing the backend API URL from env
});

export default backendClient;
