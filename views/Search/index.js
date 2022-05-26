import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, PostCard } from '../../components';
import Actions from '../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';

//*Views
import ArticleScreen from '../Article';

const Stack = createNativeStackNavigator();

const SearchScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen  name="Main" component={Search} />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

const Search = ({navigation}) => {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.searchData);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);

    //Wait searchbox complete
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        handleSearch(searchTerm);
      }, 750)
  
      setSearchLoading(true);
      
      return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const handleReadArticle = (siteData) => {
        navigation.navigate("Article", {
            ...siteData
        });
    }

    const handleSearch = (value) => {
        dispatch({
            type: Actions.articles.SEARCH_ARTICLES,
            keywords: value
        })

        setSearchLoading(false);
    }

    return (
        <ScreenView 
            title="Search"
            onSearch={e => setSearchTerm(e)}
            loading={searchLoading}
        >
            {articles?.map((item, index) => {
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

export default SearchScreen;