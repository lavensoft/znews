import axios from 'axios';
import CONFIG from '../../global/config';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FcmTokensAPI from '../FcmTokens';

//Get day session now
const getDaySession = () => {
    let hour = new Date().getHours();
    let session = (hour/8).toFixed();
    session -= 1;

    if(session < 0) session = 2;

    return session;
}

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
    getHighestContentScore: async () => {
        let timeSession = getDaySession();
        let settings = JSON.parse(await AsyncStorage.getItem('settings')) || {};
        let contentScores = settings.contentScores[timeSession];
        let highestList = {};

        if(contentScores) {
            highestList.keywords = contentScores.keywords.sort((a, b) => b.score - a.score);
            highestList.keywords = highestList.keywords.map((item) => item.keyword);

            highestList.topics = contentScores.topics.sort((a, b) => b.score - a.score);
            highestList.topics = highestList.topics.map((item) => item._id);

            highestList.users = contentScores.users.sort((a, b) => b.score - a.score);
            highestList.users = highestList.users.map((item) => item._id);
        }

        return {
            data: highestList
        }
    },
    addContentScore: async(data, type) => {
        let timeSession = getDaySession();
        let settings = JSON.parse(await AsyncStorage.getItem('settings')) || {};

        if(!settings.contentScores) settings.contentScores = [
            {
                time: 'morning',
                keywords: [],
                users: [],
                topics: []
            },
            {
                time: 'noon',
                keywords: [],
                users: [],
                topics: []
            },
            {
                time: 'night',
                keywords: [],
                users: [],
                topics: []
            }
        ];

        let timeData = settings.contentScores[timeSession];
        let contentScoresConfig = CONFIG.CONTENT_SCORES;

        //*KEYWORDS
        let keywords = data.keywords ? data.keywords.split(",") : [];

        for(keyword of keywords) {
            let keyw = keyword.trim();
            
            if(keyw) {
                let dataIndex = timeData['keywords'].findIndex(item => item.keyword == keyw);

                let keywordData = {
                    keyword: keyw,
                    score: contentScoresConfig[type.toUpperCase()]
                }
            
                if(dataIndex === -1) {
                    timeData['keywords'].push(keywordData)
                }else{
                    keywordData.score += timeData['keywords'][dataIndex].score;
                    timeData['keywords'][dataIndex] = keywordData;
                }
            }
        }

        //*USER
        let userId = data.author._id;
        let userIndex = timeData['users'].findIndex(item => item._id == userId);

        if(userIndex === -1) {
            timeData['users'].push({
                _id: userId,
                score: contentScoresConfig[type.toUpperCase()]
            })
        }else{
            timeData['users'][userIndex].score += contentScoresConfig[type.toUpperCase()];
        }

        //*TOPIC
        let topicId = data.topic;
        let topicIndex = timeData['topics'].findIndex(item => item._id == topicId);

        if(topicIndex === -1) {
            timeData['topics'].push({
                _id: topicId,
                score: contentScoresConfig[type.toUpperCase()]
            })
        }else{
            timeData['topics'][topicIndex].score += contentScoresConfig[type.toUpperCase()];
        }

        settings.contentScores[timeSession] = timeData;

        await AsyncStorage.setItem('settings', JSON.stringify(settings));

        return {
            data: settings.contentScores[timeSession]
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
            contentScores: [ //Điểm quan tâm của user đối với 1 nội dung nào đó
                {
                    time: 'morning',
                    keywords: [],
                    users: [],
                    topics: []
                },
                {
                    time: 'noon',
                    keywords: [],
                    users: [],
                    topics: []
                },
                {
                    time: 'night',
                    keywords: [],
                    users: [],
                    topics: []
                }
            ],
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