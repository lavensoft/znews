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
            usersFollowing: []
        }

        await AsyncStorage.setItem('settings', JSON.stringify(settings));

        return {
            data: settings
        };
    }
}

export default SettingsAPI;