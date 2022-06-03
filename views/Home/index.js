import React, {useEffect, useState, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen, ScreenTitle, PostCard, DetailPostCard, StoryAvatar, StoryContainer } from '../../components';
import Actions from '../../sagas/actions';
import { StatusBar } from 'expo-status-bar';
import {useSelector, useDispatch} from 'react-redux';
import {Modal, StyleSheet, FlatList, Dimensions, SafeAreaView} from 'react-native';
  
//*Views
import ArticleScreen from '../Article';

const Stack = createNativeStackNavigator();

const HomeScreen = ({route}) => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 256;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

const Feed = ({navigation, route}) => {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.data);
    const settings = useSelector(state => state.settings.data);
    const articlesState = useSelector(state => state.articles.articlesState);
    const stories = useSelector(state => state.articles.stories);
    const isLoading = useSelector(state => state.articles.isLoading);
    const page = useSelector(state => state.articles.page);

    //*Story
    //#region
    const [isModelOpen, setModel] = useState(false);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentScrollValue, setCurrentScrollValue] = useState(0);
    const modalScroll = useRef(null);

    const onStorySelect = (index) => {
        setCurrentUserIndex(index);
        setModel(true);
    };
    
    const onStoryClose = () => {
        setModel(false);
    };
    
    const onStoryNext = (isScroll) => {
        const newIndex = currentUserIndex + 1;
        if (stories.length - 1 > currentUserIndex) {
            setCurrentUserIndex(newIndex);
            if (!isScroll) {
                
              modalScroll.current.scrollToOffset({ animated: true, offset: Dimensions.get('window').width * newIndex });
            }
        } else {
            setModel(false);
        }
    };
    
    const onStoryPrevious = (isScroll) => {
        const newIndex = currentUserIndex - 1;
        if (currentUserIndex > 0) {
            setCurrentUserIndex(newIndex);
            if (!isScroll) {
              modalScroll.current.scrollToOffset({ animated: true, offset: Dimensions.get('window').width * newIndex });
            }
        }
    };
    //#endregion
    //*---

    useEffect(() => {
      dispatch({ //Fetch Articles
          type: Actions.articles.FETCH_ALL_ARTICLES,
          page: 1
      });

      dispatch({ //Fetch Stories
        type: Actions.articles.FETCH_STORIES
      })

      dispatch({ //Fetch Articles states
        type: Actions.articles.FETCH_ARTICLES_STATE
      });

      dispatch({ //Fetch Settings
        type: Actions.settings.FETCH_SETTINGS
      });
    }, []);

    const handleReadArticle = (siteData) => {
      navigation.navigate("Article", {
          ...siteData
      });
    }

    const handleLoadMore = () => {
      if(!isLoading) {
          dispatch({
              type: Actions.articles.FETCH_ALL_ARTICLES,
              page: page + 1
          })
      }
    }

    const handleRefresh = () => {
      //Refresh articles
      dispatch({
        type: Actions.articles.REFRESH_ARTICLES
      })

      //Refresh stories
      dispatch({
        type: Actions.articles.FETCH_STORIES
      })
    }

    if(isLoading && !articles.length && !settings.length && !articlesState.length) return <LoadingScreen/>
 
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
          refreshing={isLoading && !articles.length && !articlesState.length}
          onRefresh={handleRefresh}
          ListHeaderComponent={() => {
            return (
              <>
                <ScreenTitle titleTime>Chào mừng, bạn đã trở lại!</ScreenTitle>
                <FlatList
                  data={stories}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginBottom: stories ? 32 : 0, 
                    paddingLeft: 24,
                  }}
                  renderItem={({ item, index }) => (
                    <StoryAvatar viewed={item.viewed} style={{marginRight: (index == stories.length - 1 ? 48 : 16)}} authorId={item.author._id} name={item.author.name} avatar={item.stories[0].thumbnail} onPress={() => onStorySelect(index)} key={`story-item-${index}`}/>
                  )}
                />
              </>
            )
          }}
          renderItem={({ item, index }) => {
            if(settings.cardStyle === 'detail') {
              return (
                <DetailPostCard 
                  key={`article-item-${index}`}
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
                key={`article-item-${index}`}
                onPress={() => handleReadArticle(item)}
                originIcon={item.author.avatar}
                originTitle={item.author.name}
                title={item.title}
                banner={item.thumbnail}
              />
            )
          }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModelOpen}
          style={styles.modal}
          onShow={() => {
            if (currentUserIndex > 0) {
              modalScroll.current.scrollToOffset({ animated: false, offset: Dimensions.get('window').width * currentUserIndex });
            }
          }}
          onRequestClose={onStoryClose}
        >
          <FlatList
            data={stories}
            ref={modalScroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            enableMomentum={true}
            snapToAlignment={"center"}
            snapToInterval={Dimensions.get('window').width}
            viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
            pagingEnabled={true}
            decelerationRate={'fast'}
            style={{
              width: '100%',
              height:'100%'
            }}
            renderItem={({ item, index }) => (
              <StoryContainer
                onClose={onStoryClose}
                onStoryNext={onStoryNext}
                onStoryPrevious={onStoryPrevious}
                siteData={item}
                isNewStory={index !== currentUserIndex}
                key={`story-${index}`}
              />
            )}
          />
        </Modal>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 50,
    backgroundColor: 'rgba(255,255,255,255)',
  },
  circle: {
    width: 66,
    margin: 4,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#72bec5',
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 9, textAlign: 'center',
  },
});

export default HomeScreen;