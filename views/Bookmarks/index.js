import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, PostCard } from '../../components';
import Actions from '../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';

//*Views
import ArticleScreen from '../Article';

const Stack = createNativeStackNavigator();

const BookmarksScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen  name="Main" component={Bookmarks} />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

const Bookmarks = ({navigation}) => {
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state.bookmarks.data);
    const isLoading = useSelector(state => state.bookmarks.isLoading);
    const page = useSelector(state => state.bookmarks.page);

    useEffect(() => {
        dispatch({
            type: Actions.bookmarks.FETCH_BOOKMARKS,
            page: 0
        })
    }, []);

    const handleReadArticle = (siteData) => {
        navigation.navigate("Article", {
            ...siteData
        });
    }

    const handleRefresh = async () => {
        dispatch({ type: Actions.bookmarks.REFRESH_BOOKMARKS });
    }

    return (
        <ScreenView loading={isLoading && !bookmarks.length} refreshing={isLoading} onRefresh={handleRefresh} title="Bookmarks">
            {bookmarks?.map((item, index) => {
                return (
                    <PostCard 
                        originIcon={item.originIcon}
                        originTitle={item.originTitle}
                        title={item.title}
                        banner={item.banner}
                        key={`post-card-${index}`}
                        onPress={() => handleReadArticle(item)}
                    />
                )
            })}
        </ScreenView>
    );
}

export default BookmarksScreen;