import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, ListTile, SectionTitle } from '../../../../components';
import Actions from '../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, View} from 'react-native';
import API from '../../../../api';

const Stack = createNativeStackNavigator();

const FeedContentScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
        >
            <Stack.Screen 
                name="Main" 
                component={Content}
            />
        </Stack.Navigator>
    )
}

const Content = ({navigation}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.settings.isLoading);
    const settings = useSelector(state => state.settings.data);
    const users = useSelector(state => state.users.data);
    const rsses = useSelector(state => state.rss.data);

    useEffect(() => {
        dispatch({type: Actions.settings.FETCH_SETTINGS});
        dispatch({type: Actions.users.FETCH_ALL_USERS});
        dispatch({type: Actions.rss.FETCH_ALL_RSS});
    }, []);

    const handleUpdateSetting = async(rssId, value) => {
        let usersFollowing = settings.usersFollowing || [];
        
        if(value) { // Add user to following
            usersFollowing.push(rssId);

            //*FCM Subscribe
            await API.FcmTokens.subscribe(settings.fcmDeviceToken, settings.notification, [rssId]);
        }else{ // Remove user from following
            usersFollowing = usersFollowing.filter(user => user !== rssId);

            //*FCM Unsubscribe
            await API.FcmTokens.unsubscribe(settings.fcmDeviceToken, [rssId]);
        }
    
        //Update users following
        dispatch({
            type: Actions.settings.UPDATE_SETTING,
            payload: {
                key: "usersFollowing",
                value: usersFollowing
            }
        });
    }

    return (
        <ScreenView 
            loading={isLoading && !settings && !users && !rsses}
        >
            {/* <SectionTitle style={{marginTop: 0}}>RSS</SectionTitle>
            <LButton style={{marginBottom: 32}}>Add new</LButton> */}

            {rsses.map((rss, index) => {
                return (
                    <View key={`section-title-${index}`}>
                        <SectionTitle style={{marginTop: index == 0 ? 0 : 24}}>{rss.title}</SectionTitle>
                        {rss.rsses.map((item, i) => {
                            return (
                                <SettingTile
                                    key={`users-tile-${i}`}
                                    title={item.author.name}
                                    //subTitle={item.website}
                                    avatar={item.author.avatar}
                                    rssId={item._id}
                                    value={settings.usersFollowing?.includes(item._id)}
                                    onChange={handleUpdateSetting}
                                />
                            )
                        })}
                    </View>
                )
            })}
        </ScreenView>
    );
}

const SettingTile = ({title, subTitle, avatar, onChange, value, rssId}) => {
    const handlePress = () => {
        onChange(rssId, !value);
    }

    return (
        <ListTile.Tile onPress={handlePress} avatar={avatar}>
            <ListTile.Content column>
                <ListTile.Title>{title}</ListTile.Title>
                {
                    subTitle ?
                    <ListTile.SubTitle style={{marginTop: 8}}>{subTitle}</ListTile.SubTitle> : null
                }
            </ListTile.Content>
            <ListTile.Action>
                <Switch 
                    onChange={handlePress} 
                    value={value} 
                    trackColor={{true: "#222222"}}
                    thumbColor={"#fafafa"}
                />
            </ListTile.Action>
        </ListTile.Tile>
    )
}

export default FeedContentScreen;