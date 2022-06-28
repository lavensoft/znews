const DEBUG = false;

const CONFIG = {
    DEBUG: DEBUG,
    DOMAIN: DEBUG ? 'news://' : 'https://news.lavenes.com/',
    CDN_DOMAIN: 'https://server.news.lavenes.com:8082',
    CONTENT_SCORES: {
        REACT: 0,
        VIEW: 1,
        BOOKMARK: 2
    }
}

export default CONFIG;