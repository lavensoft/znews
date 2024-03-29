import axios from 'axios';
import config from '../config';

const RSSAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/rss_list`, {
            headers: config.HEADERS
        });
        return response.data;
    },
    getByTopic: async (topicId) => {
        const response = await axios.post(`${config.API_URL}/rss_by_topic`, {
            topic: topicId
        }, {
            headers: config.HEADERS
        });
        return response.data;
    }
}

export default RSSAPI;