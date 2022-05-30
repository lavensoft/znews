import CONFIG from '../global/config';

const config = {
    API_URL: CONFIG.DEBUG ? 'http://192.168.1.3:8082/api/v1' : 'https://server.news.lavenes.com/api/v1',
}

export default config;