import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, ListTile, SectionTitle, Appbar } from '../../../../components';
import Actions from '../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import API from '../../../../api';
import Icon from 'react-native-vector-icons/Feather';

//*Views

const Stack = createNativeStackNavigator();

const PreferencesNotificationScreen = ({route}) => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen initialParams={route.params} name="Main" component={Notification} />
        </Stack.Navigator>
    )
}

const Notification = ({navigation, route}) => {
    const settings = route.params;
    const dispatch = useDispatch();
    const [notification, setNotification] = useState('off');

    useEffect(() => {
        setNotification(settings.notification || 'relax');
    }, [settings]);

    const handleChangeSetting = async(key, value) => {
        switch(key) {
            case "notification":
                setNotification(value);
                break;
            default:
                break;
        }

        //*FCM Token Update
        await API.FcmTokens.changeType(settings.fcmDeviceToken, value);
    
        //Update settings
        dispatch({
            type: Actions.settings.UPDATE_SETTING,
            payload: {
                key: key,
                value: value
            }
        });
    }

    return (
        <ScreenView
            contentStyle={{
                paddingTop: 0
            }}
        >
            <SectionTitle style={{marginTop: 0}}>Quản Lý Thông Báo</SectionTitle>
            
            <SettingTile
                icon="compass"
                title="Cao"
                subTitle="Tất cả các thông báo"
                active={notification === 'high'}
                settingKey="notification"
                value={'high'}
                onChange={handleChangeSetting}
            />
            <SettingTile
                icon="coffee"
                title="Thấp"
                settingKey="notification"
                subTitle="Vào các giờ nghỉ ngơi"
                value={'relax'}
                active={notification === 'relax'}
                onChange={handleChangeSetting}
            />
            <SettingTile
                icon="bell-off"
                title="Tắt"
                subTitle="Không nhận thông báo"
                settingKey="notification"
                value={'off'}
                active={notification === 'off'}
                onChange={handleChangeSetting}
            />
        </ScreenView>
    );
}

const SettingTile = ({settingKey, value, title, subTitle, icon, onChange, active}) => {
    return (
        <ListTile.Tile 
            iconContainerStyle={
                active ? {
                    backgroundColor: "#222222"
                } : {}
            } 
            iconStyle={
                active ? {
                    color: "#fff"
                } : {}
            }
            onPress={() => onChange(settingKey, value)} 
            icon={icon}
        >
            <ListTile.Content column>
                <ListTile.Title>{title}</ListTile.Title>
                {
                    subTitle ?
                    <ListTile.SubTitle style={{marginTop: 8}}>{subTitle}</ListTile.SubTitle> : null
                }
            </ListTile.Content>
            <ListTile.Action>
                <Icon name="check" size={18} color={"#222"} style={{
                    opacity: active ? 1 : 0,
                }}/>
            </ListTile.Action>
        </ListTile.Tile>
    )
}

export default PreferencesNotificationScreen;