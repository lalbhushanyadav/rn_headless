// src/api/axiosInstance.js
import axios from "axios";

// Create a base instance
const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
});

// 🔐 Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// Example: Attach token if available
		const token = localStorage.getItem("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Optional: Custom headers
		// config.headers["X-Custom-Header"] = "your-custom-header";

		return config;
	},
	(error) => Promise.reject(error)
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// Handle known status codes globally
			if (error.response.status === 401) {
				console.warn("Unauthorized! Redirect to login or refresh token.");
			} else if (error.response.status === 500) {
				console.error("Server error. Try again later.");
			}
		} else {
			console.error("Network error:", error.message);
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
