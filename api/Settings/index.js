import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsAPI = {
    getAll: async () => {
        let settings = JSON.parse(await AsyncStorage.getItem('settings')) || {};

        return {
            data: settings,
        };
    },
    get: async (key) => {
        let settings = JSON.parse(await AsyncStorage.getItem('settings')) || {};

        return {
            data: settings[key]
        };
    },
    set: async (key, value) => {
        let settings = JSON.parse(await AsyncStorage.getItem('settings')) || {};

        settings[key] = value;

        await AsyncStorage.setItem('settings', JSON.stringify(settings));

        return {
            data: settings
        };
    },
    setDefault: async () => {
        let settings = {
            language: 'en',
            showReadedArticles: true,
            usersFollowing: [
                "6290f8941864be6a045cac91",
                "6290f8941864be6a045cac92",
                "6290f8941864be6a045cac93",
                "6290f8941864be6a045cac94",
                "6290f8941864be6a045cac95",
                "6290f8941864be6a045cac96",
                "6290f8941864be6a045cac97",
                "6290f8941864be6a045cac98",
                "6290f8941864be6a045cac99", 
                "6290f8941864be6a045cac9a",
                "6290fb83edfb346251677b57",
                "6290fc76edfb346251677b59",
                "6290fceeedfb346251677b5b",
                "6291099eedfb346251677b5d",
                "629109a5edfb346251677b5e"
            ],
            notification: 'tech-vi-high',
            theme: 'light',
            cardStyle: 'card',
        }

        await AsyncStorage.setItem('settings', JSON.stringify(settings));

        return {
            data: settings
        };
    }
}

export default SettingsAPI;