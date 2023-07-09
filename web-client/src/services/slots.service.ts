import axios from 'axios';


export const addSlot = async (stationId: string) => {
    try {
        const response = await axios.post(`/charging-stations/${stationId}/slots`);
        return response.data;
    } catch (error) {
        console.error('Error adding slot:', error);
        throw error;
    }
};

export const deleteSlot = async (stationId: string, slotId: string) => {
    try {
        const response = await axios.delete(`/charging-stations/${stationId}/slots/${slotId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting slot:', error);
        throw error;
    }
};

export const fetchSlot = async (stationId: string|undefined, slotId: string|undefined) => {
    try {
        const response = await axios.get(`/charging-stations/${stationId}/slots/${slotId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting slot info:', error);
        throw error;
    }
};

export const updateReservation = async (stationId: string | undefined, slotId: string | undefined, reservationId: string, updatedData: any) => {
    try {
        const response = await axios.patch(`/charging-stations/${stationId}/slots/${slotId}/reservations/${reservationId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating reservation:', error);
        throw error;
    }
};

export const deleteReservation = async (stationId: string | undefined, slotId: string | undefined, reservationId: string) => {
    try {
        const response = await axios.delete(`/charging-stations/${stationId}/slots/${slotId}/reservations/${reservationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting reservation:', error);
        throw error;
    }
};
