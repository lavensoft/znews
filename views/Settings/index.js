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
            <Stack.Screen initialParams={settings} options={{title: "Notification"}} name="Preferences/Notification" component={PreferencesNotificationScreen} />
            <Stack.Screen initialParams={settings} options={{title: "Appereance"}} name="Preferences/Appereance" component={PreferencesAppereanceScreen} />

            <Stack.Screen options={{title: "Advanced"}} name="Feed/Advanced" component={FeedAdvancedScreen} />
            <Stack.Screen options={{title: "Content"}} name="Feed/Content" component={FeedContentScreen} />
            <Stack.Screen options={{title: "Archive"}} name="Feed/Archive" component={FeedArchiveScreen} />

            <Stack.Screen options={{title: "About"}} name="Information/About" component={InformationAboutScreen} />
        </Stack.Navigator>
    )
}

const Settings = ({navigation}) => {
    const dispatch = useDispatch();

    return (
        <ScreenView 
            title="Settings"
        >
            <SectionTitle style={{marginTop: 0}}>Preferences</SectionTitle>
            {/* <SettingTile
                icon="globe"
                title="Language"
                subTitle="English"
                onPress={() => navigation.navigate('Account')}
            /> */}
            <SettingTile
                icon="bell"
                title="Notification"
                onPress={() => navigation.navigate('Preferences/Notification')}
            />
            <SettingTile
                icon="sun"
                title="Appereance"
                onPress={() => navigation.navigate('Preferences/Appereance')}
            />
            <SectionTitle>Feed</SectionTitle>
            <SettingTile
                icon="inbox"
                title="Content"
                onPress={() => navigation.navigate('Feed/Content')}
            />
            <SettingTile
                icon="toggle-left"
                title="Advanced"
                onPress={() => navigation.navigate('Feed/Advanced')}
            />
            <SettingTile
                icon="archive"
                title="Archive"
                onPress={() => navigation.navigate('Feed/Archive')}
            />
            {/* <SettingTile
                icon="hash"
                title="Manage tags"
                onPress={() => navigation.navigate('Account')}
            /> */}
            <SectionTitle>Information</SectionTitle>
            {/* <SettingTile
                icon="info"
                title="Thông tin"
                onPress={() => navigation.navigate('Information/About')}
            /> */}
            <SettingTile
                icon="rotate-ccw"
                title="Xoá tất cả cài đặt"
                onPress={async() => {
                    await API.Settings.reset();
                }}
            />
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