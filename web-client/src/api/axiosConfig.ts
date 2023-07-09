import axios from 'axios';
import {getCurrentToken} from "../services/auth.service";

// Set the base URL
const API_URL = 'http://127.0.0.1:3001';
//const API_URL = process.env.REACT_APP_REST_BACK_END;
axios.defaults.baseURL = API_URL;

// Interceptor to inject the token in the authorization header
axios.interceptors.request.use((config) => {
    // Check if the request URL does not contain /register or /login
    if (config.url && !config.url.includes('/register') && !config.url.includes('/login')) {
        const token = getCurrentToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
