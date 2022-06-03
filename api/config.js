import CONFIG from '../global/config';

const API_KEY = 'lavenesnewsapikeyghdnjmkljd@1239980004!'

const config = {
    API_URL: CONFIG.DEBUG ? 'http://192.168.1.4:8082/api/v1' : 'https://server.news.lavenes.com:8082/api/v1',
    API_KEY: API_KEY,
    HEADERS: {
        "api_key": API_KEY
    }
}

export default config;