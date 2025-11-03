import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:80000,
    headers: {
        "Content-Type": "application/json"
    }
    });
//Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if(error.response.status===401){
                window.location.href="/";
            }else if(error.response.status===500){
                console.error("Server Error: ", error.response.data);
            }else if (error.code==="ECONNABORTED"){
                console.log("Request Timeout")
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
 