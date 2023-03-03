import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://fastfood314.up.railway.app/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    },
});

axiosClient.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    return response.data.data;
}, function (error) {
    return Promise.reject(error);
});


export default axiosClient;