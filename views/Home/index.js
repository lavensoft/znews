import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { SelectButton, LoadingScreen, SectionBreak, SectionTitle, ScreenTitle, ArticlesGroup, PostCard, DetailPostCard, StoryAvatar, StoryContainer } from '../../components';
import Actions from '../../sagas/actions';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../api';
import { Text, Modal, StyleSheet, FlatList, Dimensions, SafeAreaView, View, ActivityIndicator } from 'react-native';
  
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
    const newsfeed = useSelector(state => state.newsfeed.data);
    const articles = useSelector(state => state.articles.data);
    const settings = useSelector(state => state.settings.data);
    const topics = useSelector(state => state.topics.data);
    const articlesState = useSelector(state => state.articles.articlesState);
    const stories = useSelector(state => state.articles.stories);
    const isLoading = useSelector(state => state.articles.isLoading);
    const page = useSelector(state => state.articles.page);

    //*States
    const [topic, setTopic] = useState('all');

    //*REFS
    const flatListRef = useRef(null);

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

      dispatch({ //Fetch Newsfeed
        type: Actions.newsfeed.FETCH_NEWSFEED

      })

      dispatch({ //Fetch Topics
        type: Actions.topics.FETCH_ALL_TOPICS
      });
    }, []);

    const handleReadArticle = (siteData) => {
      navigation.navigate("Article", {
          ...siteData
      });
    }

    const handleLoadMore = () => {
      if(topic === 'all') {
        if(!isLoading && newsfeed.length) {
            dispatch({
                type: Actions.articles.FETCH_ALL_ARTICLES,
                page: page + 1
            })
        }
      }else {
        if(!isLoading && articles.length) {
            dispatch({
                type: Actions.articles.FETCH_ALL_ARTICLES_OF_TOPIC,
                topic: topic,
                page: page + 1
            })
        }
      }
    }

    const handleRefresh = () => {
      //Refresh stories
      dispatch({
        type: Actions.articles.FETCH_STORIES
      })

      //Refresh topics
      dispatch({
        type: Actions.topics.FETCH_ALL_TOPICS
      });

      if(topic === 'all') { //*REFRESH ARTICLES AT ALL TOPIC
        //Refresh articles
        dispatch({
          type: Actions.articles.REFRESH_ARTICLES
        })

        //Refresh newsfeed
        dispatch({
          type: Actions.newsfeed.FETCH_NEWSFEED
        })
      }else{ //*REFRESH ARTICLES AT ANOTHER TOPIC
        //Refresh articles
        dispatch({
          type: Actions.articles.REFRESH_ARTICLES_OF_TOPIC,
          topic: topic
        })
      }
    }

    const handleChangeTopic = (topicId) => {
      setTopic(topicId);
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

      dispatch({ //Fetch Articles
          type: Actions.articles.REFRESH_ARTICLES_OF_TOPIC,
          topic: topicId,
          page: 1
      });
    }

    const handleFollowTopic = async(topicId) => {
      let rsses = await API.RSS.getByTopic(topicId);
      rsses = rsses.data;

      let usersFollowing = settings.usersFollowing || [];
      let topicsFollowing = settings.topicsFollowing || [];

      for(rss of rsses) {
        usersFollowing.push(rss._id);

        // Add topic to following
        topicsFollowing.push(topicId);

        //*FCM Subscribe
        await API.FcmTokens.subscribe(settings.fcmDeviceToken, settings.notification, [rss._id]);
      }

      //Update topics & users following
      dispatch({
          type: Actions.settings.UPDATE_SETTING,
          payload: {
              topicsFollowing,
              usersFollowing
          }
      });
    }

    if(isLoading && !newsfeed.length && !articles.length && !settings.length && !articlesState.length) return <LoadingScreen/>
    
    return (
      <SafeAreaView style={{
        width: '100%',
        backgroundColor: "#fff",
        paddingTop: 24
      }}>
        <StatusBar backgroundColor="#ffffff" barStyle="light-content"/>
        <FlatList
          data={articles}
          ref={flatListRef}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              handleLoadMore();
            }
          }}
          scrollEventThrottle={400}
          refreshing={isLoading && !articles.length && !articlesState.length && !stories.length && !newsfeed.length}
          onRefresh={handleRefresh}

          ListHeaderComponent={() => {
            return (
              <>
                <ScreenTitle titleTime>Chào mừng, bạn đã trở lại!</ScreenTitle>
                
                {/* Stories */}
                <FlatList
                  data={stories}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginBottom: stories ? 32 : 0, 
                  }}
                  contentContainerStyle={{
                    paddingLeft: 24,
                    paddingRight: 12
                  }}
                  renderItem={({ item, index }) => (
                    <StoryAvatar 
                      viewed={item.viewed} 
                      authorId={item.author._id} 
                      name={item.author.name} 
                      avatar={item.stories[0].thumbnail} 
                      onPress={() => onStorySelect(index)} 
                      key={`story-item-${index}`}/>
                  )}
                />

                {/* Topics */}
                <FlatList
                  data={topics}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginBottom: stories ? 32 : 0, 
                  }}
                  contentContainerStyle={{
                    paddingLeft: 24,
                    paddingRight: 14
                  }}
                  renderItem={({ item, index }) => {
                    let topicsFollowing = settings.topicsFollowing;

                    if(topicsFollowing.includes(item._id)) {
                      return (
                        <>
                          {index == 0 ? <SelectButton active={topic == 'all'} onPress={() => handleChangeTopic('all')}>Tất Cả</SelectButton> : null}
                          <SelectButton active={topic == item._id} onPress={() => handleChangeTopic(item._id)}>{item.icon} {item.title}</SelectButton>
                        </>
                      )
                    }
                  }}
                />

                {/* NEWSFEDD */}
                { topic === 'all' ?
                  <FlatList
                    data={newsfeed}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      if(item.title === "already-readed-break") {
                        return (
                          <SectionBreak
                            title="Bạn đã đọc tất cả bài viết mới"
                            description="Hãy xem thêm các topic khác nhé!"
                            icon="ios-checkmark-circle"
                            key={`section-break-${index}`}
                          />
                        )
                      }
                    
                      return (
                        //* FEED ARTICLES
                        <View key={`section-news-${index}`}>
                          <ArticlesGroup
                            subtitle={item.subtitle}
                            subtitleColor={item.subtitleColor}
                            title={item.title}
                            titleColor={item.titleColor}
                            description={
                              settings.topicsFollowing.includes(item.topic) ? 
                                item.description ? item.description : null : "Nhấn dấu + để theo dõi"
                            }
                            onPressArticle={handleReadArticle}
                            addActionDone={settings.topicsFollowing.includes(item.topic)}
                            articles={item.articles}
                            onPressMore={() => handleChangeTopic(item.topic)}
                            onPressAdd={
                              settings.topicsFollowing.includes(item.topic) ? null : () => handleFollowTopic(item.topic)
                            }
                          />
        
                          { //* MORE ARTILCLES
                            index == newsfeed.length - 1 ? 
                            <View>
                                <SectionTitle
                                  title="Dành Cho Bạn"
                                />
                            </View> : null
                          }
                        </View>
                      )
                    }}
                  /> : null
                }
              </>
            )
          }}

          renderItem={({ item, index }) => { //*NEWS FEED
            if(settings.cardStyle === 'detail') {
              return (
                <DetailPostCard 
                  key={`article-item-${index}`}
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
                key={`article-item-${index}`}
                onPress={() => handleReadArticle(item)}
                originIcon={item.author.avatar}
                originTitle={item.author.name}
                title={item.title}
                banner={item.thumbnail}
                date={item.dateAdded}
              />
            )
          }}
          
          ListFooterComponent={() => {
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