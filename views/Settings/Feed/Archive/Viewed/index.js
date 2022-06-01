import React, {useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, PostCard, Appbar, DetailPostCard } from '../../../../../components';
import Actions from '../../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';

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

    useEffect(() => {
        dispatch({ //Fetch Articles states
          type: Actions.articles.FETCH_ARTICLES_STATE
        });
    }, []);

    const handleReadArticle = (siteData) => {
        navigation.navigate("Article", {
            ...siteData
        });
    }

    const handleRefresh = async () => {
        dispatch({ type: Actions.articles.FETCH_ARTICLES_STATE });
    }

    return (
        <ScreenView 
            loading={isLoading && !articlesState.length && !settings} 
            refreshing={isLoading} 
            onRefresh={handleRefresh} 
            appbar={{
                lead: <Appbar.BackAction onPress={() => navigation.goBack()} />,
            }}
        >
            {Object.values(articlesState).reverse()?.map((item, index) => {
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
                    />
                )
            })}
        </ScreenView>
    );
}

export default FeedArticlesViewedScreen;