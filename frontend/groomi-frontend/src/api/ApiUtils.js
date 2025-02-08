import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5088/api",
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return {
            status: response.status,
            data: response.data?.data || null,
            requestLink: response.data?.requestLink || response.config.url,
            response: response.data?.response || response.statusText,
            success: response.data?.success !== undefined ? response.data.success : true,
        };
    },
    (error) => {
        const formattedError = {
            status: error.response?.status || 500,
            data: error.response?.data?.data || null,
            requestLink: error.response?.data?.requestLink || error.config?.url,
            response: error.response?.data?.response || error.message,
            success: false,
        };
        return Promise.reject(formattedError);
    }
);

export default api;
