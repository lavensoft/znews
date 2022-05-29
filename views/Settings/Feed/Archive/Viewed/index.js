import React, {useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, PostCard, Appbar } from '../../../../../components';
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
            loading={isLoading && !articlesState.length} 
            refreshing={isLoading} 
            onRefresh={handleRefresh} 
            appbar={{
                lead: <Appbar.BackAction onPress={() => navigation.goBack()} />,
            }}
        >
            {Object.values(articlesState).reverse()?.map((item, index) => {
                let data = item.data;

                return (
                    <PostCard 
                        originIcon={data.author.avatar}
                        originTitle={data.author.name}
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