import React, {useEffect, useState, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, PostCard, DetailPostCard, StoryAvatar, StoryContainer } from '../../components';
import Actions from '../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Modal, StyleSheet, FlatList} from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
  
//*Views
import ArticleScreen from '../Article';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen  name="Main" component={Home} />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 256;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

const Home = ({navigation}) => {
    const dispatch = useDispatch();

    //*Story
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
                modalScroll.current.scrollTo(newIndex, true);
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
                modalScroll.current.scrollTo(newIndex, true);
            }
        }
    };
    
    const onScrollChange = (scrollValue) => {
        if (currentScrollValue > scrollValue) {
            onStoryNext(true);
            setCurrentScrollValue(scrollValue);
        }
        if (currentScrollValue < scrollValue) {
            onStoryPrevious();
            setCurrentScrollValue(scrollValue);
        }
      };
    //*---

    const articles = useSelector(state => state.articles.data);
    const stories = useSelector(state => state.articles.stories);
    const isLoading = useSelector(state => state.articles.isLoading);
    const page = useSelector(state => state.articles.page);

    useEffect(() => {
      dispatch({
          type: Actions.articles.FETCH_ALL_ARTICLES,
          page: 0
      });

      dispatch({
        type: Actions.articles.FETCH_STORIES
      })
    }, []);

    const handleReadArticle = (siteData) => {
        navigation.navigate("Article", {
            ...siteData
        });
    }

    return (
        <ScreenView 
            loading={isLoading && !articles.length}
            title="Welcome back, Nhats Devil" 
            titleTime 
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                if(!isLoading) {
                    dispatch({
                        type: Actions.articles.FETCH_ALL_ARTICLES,
                        page: page + 1
                    })
                }
              }
            }}
            scrollEventThrottle={400}
            refreshing={isLoading}
            onRefresh={() => {}}
        >
            <FlatList
              data={stories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 32}}
              renderItem={({ item, index }) => (
                <StoryAvatar name={item.title} avatar={item.stories[0].banner} onPress={() => onStorySelect(index)} key={`story-item-${index}`}/>
              )}
            />

            {articles?.map((item, index) => {
              if(!item.featured) {
                return (
                  <DetailPostCard 
                    key={`article-item-${index}`}
                    onPress={() => handleReadArticle(item)}
                    originIcon={item.originIcon}
                    subtitle={item.originTitle}
                    title={item.title}
                    banner={item.banner}
                  />
                )
              }

              return (
                  <PostCard 
                      originIcon={item.originIcon}
                      originTitle={item.originTitle}
                      title={item.title}
                      banner={item.banner}
                      key={`post-card2-${index}`}
                      onPress={() => handleReadArticle(item)}
                  />
              )
            })}
            <Modal
              animationType="slide"
              transparent={false}
              visible={isModelOpen}
              style={styles.modal}
              onShow={() => {
                if (currentUserIndex > 0) {
                  modalScroll.current.scrollTo(currentUserIndex, false);
                }
              }}
              onRequestClose={onStoryClose}
            >
              {/* eslint-disable-next-line max-len */}
              <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll} style={styles.container}>
                {stories?.map((item, index) => (
                  <StoryContainer
                    onClose={onStoryClose}
                    onStoryNext={onStoryNext}
                    onStoryPrevious={onStoryPrevious}
                    siteData={item}
                    isNewStory={index !== currentUserIndex}
                    key={`story-${index}`}
                  />
                ))}
              </CubeNavigationHorizontal>
            </Modal>
        </ScreenView>
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