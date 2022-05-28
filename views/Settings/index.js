import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, ListTile, SectionTitle } from '../../components';
import Actions from '../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

//*Views
import ArticleScreen from '../Article';

const Stack = createNativeStackNavigator();

const SettingsScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen  name="Main" component={Settings} />
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
                onPress={() => navigation.navigate('Account')}
            />
            <SettingTile
                icon="sun"
                title="Appereance"
                onPress={() => navigation.navigate('Account')}
            />
            <SectionTitle>Content</SectionTitle>
            <SettingTile
                icon="inbox"
                title="Sources"
                onPress={() => navigation.navigate('Account')}
            />
            {/* <SettingTile
                icon="hash"
                title="Manage tags"
                onPress={() => navigation.navigate('Account')}
            /> */}
            <SectionTitle>Information</SectionTitle>
            <SettingTile
                icon="info"
                title="About"
                onPress={() => navigation.navigate('Account')}
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