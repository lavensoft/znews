import axios from 'axios';
import config from '../config';

const TopicsAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/topics`, {
            headers: config.HEADERS
        });
        return response.data;
    }
}

export default TopicsAPI;