import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, ListTile, SectionTitle } from '../../../../../components';
import Actions from '../../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, View, Text} from 'react-native';
import API from '../../../../../api';

const Stack = createNativeStackNavigator();

const FeedContentRSSScreen = ({route}) => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
        >
            <Stack.Screen 
                initialParams={route.params}
                name="Main" 
                component={RSS}
            />
        </Stack.Navigator>
    )
}

const RSS = ({navigation, route}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.settings.isLoading);
    const settings = useSelector(state => state.settings.data);
    const {topic, topicTitle} = route.params;

    const [rss, setRss] = useState([]);

    useEffect(() => {
        dispatch({type: Actions.settings.FETCH_SETTINGS});

        API.RSS.getByTopic(topic).then(res => {
            setRss(res.data);
        });
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

    const handleRefresh = () => {
        dispatch({type: Actions.settings.FETCH_SETTINGS});

        API.RSS.getByTopic(topic).then(res => {
            setRss(res.data);
        });
    }

    return (
        <ScreenView 
            loading={isLoading && !settings}
            scrollEventThrottle={400}
            refreshing={isLoading && !settings}
            onRefresh={handleRefresh}
        >
            {/* <SectionTitle style={{marginTop: 0}}>RSS</SectionTitle>
            <LButton style={{marginBottom: 32}}>Add new</LButton> */}
            <SectionTitle style={{marginTop: 0}}>{topicTitle}</SectionTitle>
            
            {rss.map((item, index) => {
                return (
                    <SettingTile
                        key={`users-tile-${index}`}
                        title={item.author.name}
                        //subTitle={item.website}
                        avatar={item.author.avatar}
                        rssId={item._id}
                        value={settings.usersFollowing?.includes(item._id)}
                        onChange={handleUpdateSetting}
                    />
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
                <View style={{
                    width: 100,
                    paddingVertical: 7,
                    backgroundColor: value ? "rgba(0,0,0,.08)" : "#222222",
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: value ? "#222222" : "#ffffff",
                        fontSize: 13
                    }}>{value ? "Bỏ theo dõi" : "Theo dõi"}</Text>
                </View>
            </ListTile.Action>
        </ListTile.Tile>
    )
}

export default FeedContentRSSScreen;