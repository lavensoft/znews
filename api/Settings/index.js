import axios from 'axios';
import config from '../config';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FcmTokensAPI from '../FcmTokens';

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
    update: async (value) => {
        let settings = JSON.parse(await AsyncStorage.getItem('settings')) || {};

        settings = {
            ...settings,
            ...value,
        };

        await AsyncStorage.setItem('settings', JSON.stringify(settings));

        return {
            data: settings
        };
    },
    setDefault: async () => {
        const fcmDeviceToken = await messaging().getToken();

        let settings = {
            language: 'vi',
            showReadedArticles: true,
            notification: 'relax',
            theme: 'light',
            cardStyle: 'card',
            fcmDeviceToken
        }

        await AsyncStorage.setItem('settings', JSON.stringify(settings));

        //Unsubscribe all fcm
        await FcmTokensAPI.unsubscribeAll(fcmDeviceToken);

        return {
            data: settings
        };
    },
    reset: async () => {
        await AsyncStorage.clear();
    }
}

export default SettingsAPI;