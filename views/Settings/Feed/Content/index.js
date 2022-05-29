import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, ListTile, SectionTitle, LButton } from '../../../../components';
import Actions from '../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Switch} from 'react-native';

const Stack = createNativeStackNavigator();

const FeedContentScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen  name="Main" component={Content} />
        </Stack.Navigator>
    )
}

const Content = ({navigation}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.settings.isLoading);
    const settings = useSelector(state => state.settings.data);
    const users = useSelector(state => state.users.data);

    useEffect(() => {
        dispatch({type: Actions.settings.FETCH_SETTINGS});
        dispatch({type: Actions.users.FETCH_ALL_USERS});
    }, []);

    const handleUpdateSetting = (userId, value) => {
        let usersFollowing = settings.usersFollowing || [];
        
        if(value) { // Add user to following
            usersFollowing.push(userId);
        }else{ // Remove user from following
            usersFollowing = usersFollowing.filter(user => user !== userId);
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
            title="Content"
            loading={isLoading && !settings && !users}
        >
            {/* <SectionTitle style={{marginTop: 0}}>RSS</SectionTitle>
            <LButton style={{marginBottom: 32}}>Add new</LButton> */}

            <SectionTitle style={{marginTop: 0}}>Pages Following</SectionTitle>
            {users.map((item, i) => {
                return (
                    <SettingTile
                        key={`users-tile-${i}`}
                        title={item.name}
                        //subTitle={item.website}
                        avatar={item.avatar}
                        userId={item._id}
                        value={settings.usersFollowing?.includes(item._id)}
                        onChange={handleUpdateSetting}
                    />
                )
            })}
        </ScreenView>
    );
}

const SettingTile = ({title, subTitle, avatar, onChange, value, userId}) => {
    const handlePress = () => {
        onChange(userId, !value);
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
                <Switch onChange={handlePress} value={value} trackColor={{true: "#222222"}}/>
            </ListTile.Action>
        </ListTile.Tile>
    )
}

export default FeedContentScreen;