import axios from 'axios';
import config from '../config';

const TopicsAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/topics`);
        return response.data;
    }
}

export default TopicsAPI;