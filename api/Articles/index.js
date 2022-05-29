import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArticlesAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/articles`);
        return response.data;
    },
    getAt: async (page) => {
        const response = await axios.get(`${config.API_URL}/articles/page/${page}`).catch(e => console.log(e));
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
        
        //*Check viewed stories
        let dateNow = new Date();
        dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()).getTime().toString()
        
        let storiesViewed = JSON.parse(await AsyncStorage.getItem('@storiesViewed')) || {};

        result.map((item, i) => {
            if(storiesViewed[dateNow]?.indexOf(item.author._id) > -1) {
                result[i].viewed = true;
            }
        })

        result.sort((a) => a.viewed ? 1 : -1);

        return {
            data: result
        };
    },
    updateView: async(id) => {
        const response = await axios.put(`${config.API_URL}/articles/view/${id}`);
        return response.data;
    }
}

export default ArticlesAPI;