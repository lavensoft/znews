import CONFIG from '../global/config';

const config = {
    API_URL: CONFIG.DEBUG ? 'http://10.82.66.179:8082/api/v1' : 'https://server.news.lavenes.com:8082/api/v1',
}

export default config;