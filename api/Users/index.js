import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/users`, {
            headers: config.HEADERS
        });
        return response.data;
    },
    get: async (id) => {
        const response = await axios.get(`${config.API_URL}/users/${id}`, {
            headers: config.HEADERS
        });
        return response.data;
    }
}

export default UsersAPI;