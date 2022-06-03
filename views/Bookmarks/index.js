import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlankTitle, PostCard, DetailPostCard, ScreenTitle } from '../../components';
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
            <Stack.Screen name="Main" component={Bookmarks} />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

const Bookmarks = ({navigation}) => {
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state.bookmarks.data);
    const isLoading = useSelector(state => state.bookmarks.isLoading);
    const settings = useSelector(state => state.settings.data);

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
        <SafeAreaView style={{
          width: '100%',
          height: '100%',
          backgroundColor: "#fff"
        }}>
          <FlatList
            data={bookmarks}
            scrollEventThrottle={400}
            refreshing={isLoading && !bookmarks.length}
            onRefresh={handleRefresh}
            ListHeaderComponent={() => {
                return (
                  <>
                    <ScreenTitle>Bookmarks</ScreenTitle>
                    {!bookmarks.length && !isLoading ? 
                        <BlankTitle>Bạn chưa lưu bài viết nào</BlankTitle> 
                       : null
                    }
                  </>
                )
              }}
              renderItem={({ item, index }) => {
                if(settings.cardStyle === 'detail') {
                  return (
                    <DetailPostCard 
                      key={`post-card-${index}`}
                      onPress={() => handleReadArticle(item)}
                      originIcon={item.author.avatar}
                      subtitle={item.author.name}
                      title={item.title}
                      banner={item.thumbnail}
                    />
                  )
                }

                return (
                    <PostCard 
                        originIcon={item.author.avatar}
                        originTitle={item.author.name}
                        title={item.title}
                        banner={item.thumbnail}
                        key={`post-card-${index}`}
                        onPress={() => handleReadArticle(item)}
                    />
                )
              }}
              />
        </SafeAreaView>
    );
}

export default BookmarksScreen;