import React, {useEffect, useState} from 'react';
import {  View, Text, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, LButton } from '../../../components';
import {useSelector, useDispatch} from 'react-redux';
import Actions from '../../../sagas/actions';
import messaging from '@react-native-firebase/messaging';
import API from '../../../api';

//*Styles
import {settingUpStyles} from './styles';

//*Views

const Stack = createNativeStackNavigator();

const SettingUpScreen = ({route}) => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen initialParams={route.params} name="Main" component={SettingUp} />
        </Stack.Navigator>
    )
}

const SettingUp = ({navigation, route}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {rssSubscribed} = route.params;

    useEffect(() => {
        (async() => {
            let usersFollowing = [];
            const fcmDeviceToken = await messaging().getToken();

            //Set default settings
            await API.Settings.setDefault();

            //FCM Subscribe
            for(rssId of rssSubscribed){
                usersFollowing.push(rssId);

                //*FCM Subscribe
                await API.FcmTokens.subscribe(fcmDeviceToken, 'relax', [rssId]);
            }
    
            //Update users following
            dispatch({
                type: Actions.settings.UPDATE_SETTING,
                payload: {
                    key: "usersFollowing",
                    value: usersFollowing
                }
            });

            setLoading(false);
        })();
    }, []);

    const handleStart = () => {
        dispatch({
            type: Actions.settings.UPDATE_SETTING,
            payload: {
                key: "configured",
                value: true
            }
        });
    }

    if(loading) {
        return(
            <ScreenView>
                <View style={settingUpStyles.loadingContainer}>
                    <View style={settingUpStyles.content}>
                        <ActivityIndicator color={"#222222"}/>
                        <Text style={settingUpStyles.loadingTitle}>Bọn mình đang cài đặt, bạn đợi một xíu nhé</Text>
                    </View>
                </View>
            </ScreenView>
        )
    }

    return (
        <ScreenView>
            <View style={settingUpStyles.container}>
                <View style={settingUpStyles.content}>
                    <Text style={settingUpStyles.title}>Let's Go!</Text>
                    <Text style={settingUpStyles.loadingTitle}>Hãy bắt đầu hành trình của chúng ta!</Text>
                </View>

                <LButton onPress={handleStart}>Bắt đầu</LButton>
            </View>
        </ScreenView>
    );
}

export default SettingUpScreen;