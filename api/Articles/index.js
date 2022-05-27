import axios from 'axios';
import config from '../config';

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};

const ArticlesAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/articles`);
        return response.data;
    },
    getAt: async (page) => {
        const response = await axios.get(`${config.API_URL}/articles/page/${page}`);
        return response.data;
    },
    search: async(keywords) => {
        const response = await axios.post(`${config.API_URL}/articles/search`, {
            value: keywords
        });

        return response.data;
    },
    getStories: async() => {
        let result = await axios.get(`${config.API_URL}/articles/featured`);
        result = result.data.data;

        return {
            data: result
        };
    }
}

export default ArticlesAPI;