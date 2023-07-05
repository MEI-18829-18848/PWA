import axios from 'axios';
import {getCurrentToken} from "./auth.service";
import '../api/axiosConfig'; // Import the configuration

export const createNotification = async (title: string, body: string) => {
    try {
        const response = await axios.post(
            `/notifications`,
            { title, body }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};
