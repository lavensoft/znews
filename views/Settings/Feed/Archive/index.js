import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, ListTile, SectionTitle, Appbar } from '../../../../components';
import Actions from '../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

//*Views
import FeedArticlesViewedScreen from './Viewed';

const Stack = createNativeStackNavigator();

const FeedArchiveScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen name="Main" component={Archive} />
            <Stack.Screen name="ArticlesViewed" component={FeedArticlesViewedScreen} />
        </Stack.Navigator>
    )
}

const Archive = ({navigation}) => {
    const dispatch = useDispatch();

    return (
        <ScreenView    
            contentStyle={{
                paddingTop: 0
            }}
        >
            <SectionTitle style={{marginTop: 0}}>Bài viết</SectionTitle>
            <SettingTile
                icon="eye"
                title="Bài viết đã xem"
                onPress={() => navigation.navigate('ArticlesViewed')}
            />
            {/* <SectionTitle>Activity</SectionTitle>*/}
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

export default FeedArchiveScreen;