import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/users`);
        return response.data;
    },
    get: async (id) => {
        const response = await axios.get(`${config.API_URL}/users/${id}`);
        return response.data;
    }
}

export default UsersAPI;