import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksAPI = {
    add: async(articleData) => {
        let bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];

        let siteIndex = bookmarks.findIndex(site => site._id === articleData._id);

        if(siteIndex === -1) {
            bookmarks.push(articleData);
        }else{
            bookmarks.splice(siteIndex, 1);
        }

        await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        return {
            data: bookmarks
        };
    },
    getAll: async () => {
        let bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
        bookmarks = bookmarks.reverse();

        return {
            data: bookmarks
        };
    },
    isBookmarked: async(id) => {
        let bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];

        let siteIndex = bookmarks.findIndex(site => site._id === id);
        
        return siteIndex > -1;
    }
}

export default BookmarksAPI;