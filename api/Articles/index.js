import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsAPI from '../Settings';

const ArticlesAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/articles`);
        return response.data;
    },
    getId: async (id) => {
        const response = await axios.get(`${config.API_URL}/articles/${id}`);
        return response.data;
    },
    getAt: async (page) => {
        let settings = await SettingsAPI.getAll();
        settings = settings.data;

        let articlesReaded = JSON.parse(await AsyncStorage.getItem('articlesState')) || {};
        articlesReaded = Object.keys(articlesReaded);

        const response = await axios.post(`${config.API_URL}/articles/page/${page}`,{
            authors: settings.usersFollowing,
            rejectsId: !settings["showReadedArticles"] ? articlesReaded : []
        });

        return response.data;
    },
    search: async(keywords) => {
        const response = await axios.post(`${config.API_URL}/articles/search`, {
            value: keywords
        });

        return response.data;
    },
    setViewedStory: async(articleData) => {
        let dateNow = new Date();
        dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()).getTime().toString()
        
        let storiesViewed = JSON.parse(await AsyncStorage.getItem('storiesViewed')) || {};
        
        if(!storiesViewed[dateNow]) storiesViewed[dateNow] = [];
        if(storiesViewed[dateNow].indexOf(articleData.id) === -1) storiesViewed[dateNow].push(articleData.id);
  
        await AsyncStorage.setItem('storiesViewed', JSON.stringify(storiesViewed));
    },
    getStories: async() => {
        let settings = await SettingsAPI.getAll();
        settings = settings.data;

        let articlesReaded = JSON.parse(await AsyncStorage.getItem('articlesState')) || {};
        articlesReaded = Object.keys(articlesReaded);

        let result = await axios.post(`${config.API_URL}/articles/featured`,{
            authors: settings.usersFollowing,
            rejectsId: !settings["showReadedArticles"] ? articlesReaded : []
        });

        result = result.data.data;
        
        //*Check viewed stories
        let dateNow = new Date();
        dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()).getTime().toString()
        
        let storiesViewed = JSON.parse(await AsyncStorage.getItem('storiesViewed')) || {};

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
    },
    saveState: async(articleData, state) => {
        //Save to local storage
        let articlesState = JSON.parse(await AsyncStorage.getItem('articlesState')) || {};
        articlesState[articleData._id] = {
            data: articleData,
            state
        };

        await AsyncStorage.setItem('articlesState', JSON.stringify(articlesState));

        return articlesState;
    },
    getState: async(id) => {
        let articlesState = JSON.parse(await AsyncStorage.getItem('articlesState')) || {};
        
        return {
            data: articlesState[id]
        };
    },
    getAllState: async() => {
        let articlesState = JSON.parse(await AsyncStorage.getItem('articlesState')) || {};

        return {
            data: articlesState
        };
    }
}

export default ArticlesAPI;