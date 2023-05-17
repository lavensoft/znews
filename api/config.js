import CONFIG from '../global/config';

const API_KEY = 'lavenesnewsapikeyghdnjmkljd@1239980004!'

const config = {
    API_URL: CONFIG.DEBUG ? 'http://192.168.1.3:8082/api/v1' : 'https://api.news.lavenes.com/api/v1',
    API_KEY: API_KEY,
    HEADERS: {
        "api_key": API_KEY
    }
}

export default config;