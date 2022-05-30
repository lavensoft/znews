import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, ListTile, SectionTitle, Appbar } from '../../../../components';
import Actions from '../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, Text} from 'react-native';

const Stack = createNativeStackNavigator();

const FeedAdvancedScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen  name="Main" component={Advanced} />
        </Stack.Navigator>
    )
}

const Advanced = ({navigation}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.settings.isLoading);
    const settings = useSelector(state => state.settings.data);

    useEffect(() => {
        dispatch({type: Actions.settings.FETCH_SETTINGS});
    }, []);

    const handleUpdateSetting = (key, value) => {
        dispatch({
            type: Actions.settings.UPDATE_SETTING,
            payload: {
                key,
                value
            }
        });
    }

    return (
        <ScreenView 
            loading={isLoading && !settings}
            appbar={{
                lead: <Appbar.BackAction onPress={() => navigation.goBack()} />,
            }}
        >
            <SectionTitle style={{marginTop: 0}}>Feed</SectionTitle>
    
            <SettingTile
                title="Show readed Articles"
                subTitle="Show your readed Articles"
                settingKey="showReadedArticles"
                value={settings.showReadedArticles}
                onChange={handleUpdateSetting}
            />
        </ScreenView>
    );
}

const SettingTile = ({title, subTitle, icon, onChange, value, settingKey}) => {
    const handlePress = () => {
        onChange(settingKey, !value);
    }

    return (
        <ListTile.Tile onPress={handlePress} icon={icon}>
            <ListTile.Content column>
                <ListTile.Title>{title}</ListTile.Title>
                {
                    subTitle ?
                    <ListTile.SubTitle style={{marginTop: 8}}>{subTitle}</ListTile.SubTitle> : null
                }
            </ListTile.Content>
            <ListTile.Action>
                <Switch onChange={handlePress} value={value} trackColor={{true: "#222222"}}/>
            </ListTile.Action>
        </ListTile.Tile>
    )
}

export default FeedAdvancedScreen;