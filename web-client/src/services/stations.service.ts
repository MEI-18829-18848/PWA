import { RcFile } from 'antd/es/upload';
import axios from 'axios';

export const fetchStations = async () => {
    try {
        const response = await axios.get('/charging-stations');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};

export const addStation = async (stationData: any) => {
    try {
        const response = await axios.post('/charging-stations', stationData);
        return response.data;
    } catch (error) {
        console.error('Error adding station:', error);
        throw error;
    }
};

export const uploadStationImage = async (stationImage: RcFile, stationId: string) => {
    try {
        let form = new FormData()
        form.append('file', stationImage);

        return axios.post(`/charging-stations/image/${stationId}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } catch (error) {
        console.error('Error uploading station image:', error);
        throw error;
    }
};

export const downloadStationImage = async (stationId: string) => {
    try {
        return axios.get(`/charging-stations/image/${stationId}`);
    } catch (error) {
        console.error('Error uploading station image:', error);
        throw error;
    }
}

export const fetchStation = async (id: string | undefined) => {
    try {
        const response = await axios.get(`/charging-stations/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station:', error);
        throw error;
    }
};

export const updateStation = async (id: string, stationData: any) => {
    try {
        const response = await axios.patch(`/charging-stations/${id}`, stationData);
        return response.data;
    } catch (error) {
        console.error('Error updating station:', error);
        throw error;
    }
};

export const deleteStation = async (id: string) => {
    try {
        const response = await axios.delete(`/charging-stations/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting station:', error);
        throw error;
    }
};
