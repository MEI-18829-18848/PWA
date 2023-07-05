import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {redirect, useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:8085'; // Replace with your API URL

interface TokenClaims {
    user_id: number;
    scope: string;
    iss: string;
    exp: number;
    iat: number;
    email: string;
    username: string;
}

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.token) {
            const claims: TokenClaims = jwtDecode(response.data.token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('claims', JSON.stringify(claims));
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (username: string, password: string, email: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password, email, roles: 'admin' });
        if (response.status != 201)
            return null
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('claims');
};

export const isTokenExpired = (token: string) => {
    try {
        const decoded: TokenClaims = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
};

export const getCurrentToken = () => {
    return localStorage.getItem('token');
};

export const getTokenClaims= () => {
    return JSON.parse(localStorage.getItem('claims') || '{}');
};
