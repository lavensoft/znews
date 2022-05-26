import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksAPI = {
    add: async(siteData) => {
        let bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];

        let siteIndex = bookmarks.findIndex(site => site._id === siteData._id);

        if(siteIndex === -1) {
            bookmarks.push(siteData);
        }else{
            bookmarks.splice(siteIndex, 1);
        }

        await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        return bookmarks;
    },
    getAll: async () => {
        let bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
        bookmarks = bookmarks.reverse();

        return bookmarks;
    },
    getAt: async (page) => {
        const response = await axios.get(`${config.API_URL}/articles/page/${page}`);
        return response.data;
    },
    isBookmarked: async(id) => {
        let bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];

        let siteIndex = bookmarks.findIndex(site => site._id === id);
        
        return siteIndex > -1;
    }
}

export default BookmarksAPI;