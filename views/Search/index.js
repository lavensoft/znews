import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostCard, DetailPostCard, SearchHeader } from '../../components';
import Actions from '../../sagas/actions';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, SafeAreaView, StatusBar, View, Text, Dimensions, ActivityIndicator } from 'react-native';

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

const HeaderComponent = () => {
    const dispatch = useDispatch();
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

    const handleSearch = (value) => {
        dispatch({
            type: Actions.articles.REFRESH_SEARCH_ARTICLES,
            payload: {
              keywords: value
            }
        })

        setSearchLoading(false);
    }

    return (
        <SearchHeader
            title="Tìm Kiếm"
            placeholder="Nhập gì đó..."
            onSearch={setSearchTerm}
            isLoading={searchLoading}
        />
    )
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 256;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

const Search = ({navigation}) => {
    const dispatch = useDispatch();

    const articles = useSelector(state => state.articles.searchData);
    const settings = useSelector(state => state.settings.data);
    const searchPage = useSelector(state => state.articles.searchPage);
    const searchValue = useSelector(state => state.articles.searchKeywords);
    const isLoading = useSelector(state => state.articles.isLoading);

    const handleReadArticle = (siteData) => {
        navigation.navigate("Article", {
            ...siteData
        });
    }

    const handleLoadMore = () => {
      if(!isLoading && searchValue) {
        dispatch({
          type: Actions.articles.SEARCH_ARTICLES,
          payload: {
            keywords: searchValue,
            page: searchPage + 1
          }
        })
      }
    }

    const handleRefresh = () => {
      dispatch({
          type: Actions.articles.REFRESH_SEARCH_ARTICLES,
          payload: {
            keywords: searchValue
          }
      })
    }

    return (
        <SafeAreaView style={{
          width: '100%',
          backgroundColor: "#fff",
          paddingTop: 24
        }}>
          <StatusBar backgroundColor="#ffffff" barStyle="light-content"/>
            <FlatList
              data={articles}
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  handleLoadMore();
                }
              }}
              scrollEventThrottle={400}
              refreshing={false}
              onRefresh={handleRefresh}

              ListEmptyComponent={() => {
                return (
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 248,
                  }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'rgba(0,0,0, .25)',
                            fontWeight: 'bold'
                        }}
                    >Hãy thử tìm điều gì đó</Text>
                  </View>
                )
              }}

              ListHeaderComponent= {HeaderComponent}

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
                      date={item.dateAdded}
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
                        date={item.dateAdded}
                    />
                )
              }}
          
              ListFooterComponent={() => {
                if(!articles.length) return null;

                return(
                  <View style={{//LOADING INDICATOR
                    height: 86,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <ActivityIndicator color="#999" />
                  </View>
                )
              }}
            />
        </SafeAreaView>
    );
}

export default SearchScreen;