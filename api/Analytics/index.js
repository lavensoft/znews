import axios from 'axios';
import config from '../config';

const AnalyticsAPI = {
    sendFeedback: async (content) => {
        const response = await axios.post(`${config.API_URL}/feedback`, {content}, {
            headers: config.HEADERS
        });
        return response.data;
    },
}

export default AnalyticsAPI;