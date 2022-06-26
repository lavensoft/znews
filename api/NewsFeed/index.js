import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsAPI from '../Settings';

const NewsFeedAPI = {
    getAll: async () => {
        let settings = await SettingsAPI.getAll();
        settings = settings.data;

        const topicsFollowing = settings.topicsFollowing;

        const response = await axios.post(`${config.API_URL}/newsfeed`, {
            headers: config.HEADERS
        });

        let data = response.data.data;

        data.sort((a, b) => {
            let topicA = topicsFollowing.includes(a.topic) ? 1 : 0;
            let topicB = topicsFollowing.includes(b.topic) ? 1 : 0;
            return topicB - topicA;
        });

        //Divide at already readed
        for (let i = 0; i < data.length; i++) {
            if (!topicsFollowing.includes(data[i].topic)) {
                data.splice(i, 0, {
                    title: "already-readed-break"
                });

                break;
            }
        }

        return {
            data
        };
    }
}

export default NewsFeedAPI;