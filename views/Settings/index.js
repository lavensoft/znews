import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, ListTile, SectionTitle, Headerbar } from '../../components';
import Actions from '../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

//*Views
//Preferences
import PreferencesAppereanceScreen from './Preferences/Appereance';
import PreferencesNotificationScreen from './Preferences/Notification';

//Feed
import FeedAdvancedScreen from './Feed/Advanced';
import FeedContentScreen from './Feed/Content';
import FeedArchiveScreen from './Feed/Archive';

//Information
import InformationAboutScreen from './Information/About';
import InformationFeedbackScreen from './Information/Feedback';

import API from '../../api';

const Stack = createNativeStackNavigator();

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings.data);

    useEffect(() => {
        dispatch({
            type: Actions.settings.FETCH_SETTINGS
        });
    }, [dispatch]);

    if(settings.isLoading && !settings) return null

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                header: ({navigation, route, options}) => <Headerbar navigation={navigation} title={options.title || route.name}/>
            }}
        >
            <Stack.Screen options={{headerShown: false}} name="Main" component={Settings} />
            <Stack.Screen initialParams={settings} options={{title: "Thông báo"}} name="Preferences/Notification" component={PreferencesNotificationScreen} />
            <Stack.Screen initialParams={settings} options={{title: "Hiển thị"}} name="Preferences/Appereance" component={PreferencesAppereanceScreen} />

            <Stack.Screen options={{title: "Nâng cao"}} name="Feed/Advanced" component={FeedAdvancedScreen} />
            <Stack.Screen options={{title: "Sở thích"}} name="Feed/Content" component={FeedContentScreen} />
            <Stack.Screen options={{title: "Hoạt động"}} name="Feed/Archive" component={FeedArchiveScreen} />

            <Stack.Screen options={{title: "Thông tin liên hệ"}} name="Information/About" component={InformationAboutScreen} />
            <Stack.Screen options={{title: "Góp ý"}} name="Information/Feedback" component={InformationFeedbackScreen} />
        </Stack.Navigator>
    )
}

const Settings = ({navigation}) => {
    const dispatch = useDispatch();

    return (
        <ScreenView 
            title="Cài Đặt"
        >
            <SectionTitle style={{marginTop: 0}}>Tổng quan</SectionTitle>
            {/* <SettingTile
                icon="globe"
                title="Language"
                subTitle="English"
                onPress={() => navigation.navigate('Account')}
            /> */}
            <SettingTile
                icon="bell"
                title="Thông báo"
                onPress={() => navigation.navigate('Preferences/Notification')}
            />
            <SettingTile
                icon="sun"
                title="Hiển thị"
                onPress={() => navigation.navigate('Preferences/Appereance')}
            />
            <SectionTitle>Nội dung</SectionTitle>
            <SettingTile
                icon="inbox"
                title="Sở thích"
                onPress={() => navigation.navigate('Feed/Content')}
            />
            <SettingTile
                icon="archive"
                title="Hoạt động"
                onPress={() => navigation.navigate('Feed/Archive')}
            />
            <SettingTile
                icon="toggle-left"
                title="Nâng cao"
                onPress={() => navigation.navigate('Feed/Advanced')}
            />
            {/* <SettingTile
                icon="hash"
                title="Manage tags"
                onPress={() => navigation.navigate('Account')}
            /> */}
            <SectionTitle>Khác</SectionTitle>
            <SettingTile
                icon="info"
                title="Thông tin liên hệ"
                onPress={() => navigation.navigate('Information/About')}
            />
            <SettingTile
                icon="mail"
                title="Góp ý"
                onPress={() => navigation.navigate('Information/Feedback')}
            />
            {/* <SettingTile
                icon="rotate-ccw"
                title="Xoá tất cả cài đặt"
                onPress={async() => {
                    await API.Settings.reset();
                }}
            /> */}
        </ScreenView>
    );
}

const SettingTile = ({title, subTitle, icon, onPress}) => {
    return (
        <ListTile.Tile onPress={onPress} icon={icon}>
            <ListTile.Content column>
                <ListTile.Title>{title}</ListTile.Title>
                {
                    subTitle ?
                    <ListTile.SubTitle style={{marginTop: 8}}>{subTitle}</ListTile.SubTitle> : null
                }
            </ListTile.Content>
        </ListTile.Tile>
    )
}

export default SettingsScreen;