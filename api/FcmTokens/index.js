import axios from 'axios';
import config from '../config'; 

const FcmTokensAPI = {
    subscribe: async(token, type, userFollowing) => {
        try {
            const tokenData = {
                token: token,
                type: type,
                following: userFollowing
            };
            const response = await axios.post(`${config.API_URL}/fcm_token/subscribe`, tokenData, {
                headers: config.HEADERS
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    unsubscribe: async(token, userFollowing) => {
        try {
            const tokenData = {
                token: token,
                following: userFollowing
            };
            const response = await axios.post(`${config.API_URL}/fcm_token/unsubscribe`, tokenData, {
                headers: config.HEADERS
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    unsubscribeAll: async(token) => {
        try {
            const tokenData = {
                token: token,
            };
            const response = await axios.post(`${config.API_URL}/fcm_token/unsubscribe_all`, tokenData, {
                headers: config.HEADERS
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    changeType: async(token, type) => {
        try {
            const tokenData = {
                token: token,
                type: type
            };
            const response = await axios.post(`${config.API_URL}/fcm_token/change_type`, tokenData, {
                headers: config.HEADERS
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default FcmTokensAPI;