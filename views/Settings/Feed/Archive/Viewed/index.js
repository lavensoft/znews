import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlankTitle, PostCard, SectionTitle, DetailPostCard } from '../../../../../components';
import Actions from '../../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import { StatusBar } from 'expo-status-bar';

//*Views
import ArticleScreen from '../../../../Article';

const Stack = createNativeStackNavigator();

const FeedArticlesViewedScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen  name="Main" component={Viewed} />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

const Viewed = ({navigation}) => {
    const dispatch = useDispatch();
    const articlesState = useSelector(state => state.articles.articlesState);
    const isLoading = useSelector(state => state.articles.isLoading);
    const settings = useSelector(state => state.settings.data);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        dispatch({ //Fetch Articles states
          type: Actions.articles.FETCH_ARTICLES_STATE
        });
    }, []);

    useEffect(() => {
        setArticles(Object.values(articlesState).reverse());
    }, [articlesState]);

    const handleReadArticle = (siteData) => {
        navigation.navigate("Article", {
            ...siteData
        });
    }

    const handleRefresh = async () => {
        dispatch({ type: Actions.articles.FETCH_ARTICLES_STATE });
    }

    return (
        <SafeAreaView style={{
            width: '100%',
            height: '100%',
            backgroundColor: "#fff",
            paddingTop: 24
          }}>
            <StatusBar backgroundColor="#ffffff" barStyle="light-content"/>
            <FlatList
              data={articles}
              scrollEventThrottle={400}
              refreshing={isLoading}
              onRefresh={handleRefresh} 
              ListHeaderComponent={() => {
                  return (
                    <>
                        <SectionTitle 
                            subtitle={"Bài viết bạn đã xem"}
                        />
                        {!articles.length && !isLoading ? 
                            <BlankTitle>Bạn chưa xem bài viết nào</BlankTitle> 
                           : null
                        }
                    </>
                  )
                }}
                renderItem={({ item, index }) => {
                    let data = item.data;
    
                    if(!data.author || !data) return null;
    
                    if(settings.cardStyle === 'detail') {
                      return (
                        <DetailPostCard 
                          key={`post-card-${index}`}
                          onPress={() => handleReadArticle(data)}
                          originIcon={data.author?.avatar}
                          subtitle={data.author?.name}
                          title={data.title}
                          banner={data.thumbnail}
                          date={item.dateAdded}
                        />
                      )
                    }
    
                    return (
                        <PostCard 
                            originIcon={data.author?.avatar}
                            originTitle={data.author?.name}
                            title={data.title}
                            banner={data.thumbnail}
                            key={`post-card-${index}`}
                            onPress={() => handleReadArticle(data)}
                            date={item.dateAdded}
                        />
                    )
                }}
                />
          </SafeAreaView>
    );
}

export default FeedArticlesViewedScreen;