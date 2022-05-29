import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modalbox';
import GestureRecognizer from 'react-native-swipe-gestures';
import Story from './Story';
import UserView from './UserView';
import Readmore from './Readmore';
import ProgressArray from './ProgressArray';

const SCREEN_WIDTH = Dimensions.get('window').width;

const StoryContainer = (props) => {
  const { siteData, title } = props;
  const { stories = [] } = siteData || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(3);
  const story = stories.length ? stories[currentIndex] : {};
  const { isReadMore, url } = story || {};
  const [storyTitle, setStoryTitle] = useState(story.title);

  // const onVideoLoaded = (length) => {
  //   props.onVideoLoaded(length.duration);
  // };

  const changeStory = (evt) => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = async() => {
    if (stories.length - 1 > currentIndex) {
      //*Go next
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(25);
    
      setStoryTitle(stories[currentIndex + 1].title);
    } else {
      //*save to viewed
      let dateNow = new Date();
      dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()).getTime().toString()
      
      let storiesViewed = JSON.parse(await AsyncStorage.getItem('@storiesViewed')) || {};
      
      if(!storiesViewed[dateNow]) storiesViewed[dateNow] = [];
      storiesViewed[dateNow].push(siteData.author._id);

      await AsyncStorage.setItem('@storiesViewed', JSON.stringify(storiesViewed));

      setCurrentIndex(0);
      setStoryTitle(stories[0].title);
      props.onStoryNext();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setStoryTitle(stories[currentIndex - 1].title);
      setLoaded(false);
      setDuration(25);
    } else {
      setCurrentIndex(0);
      setStoryTitle(stories[0].title);
      props.onStoryPrevious();
    }
  };

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onVideoLoaded = (length) => {
    setLoaded(true);
    setDuration(length.duration);
  };

  const onPause = (result) => {
    setIsPause(result);
  };

  const onReadMoreOpen = () => {
    setIsPause(true);
    setModel(true);
  };
  const onReadMoreClose = () => {
    setIsPause(false);
    setModel(false);
  };

  const loading = () => {
    if (!isLoaded) {
      return (
        <View style={styles.loading}>
          <View style={{ width: 1, height: 1 }}>
            <Story onImageLoaded={onImageLoaded} pause onVideoLoaded={onVideoLoaded} story={story} />
          </View>
          <ActivityIndicator color="white" />
        </View>
      );
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      setModel(true);
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        delayLongPress={500}
        onPress={e => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}
      >
        <View style={styles.container}>
          <Story onImageLoaded={onImageLoaded} pause={isPause} isNewStory={props.isNewStory} onVideoLoaded={onVideoLoaded} story={story} />

          {loading()}

          <UserView name={siteData.author.name} profile={siteData.author.avatar} onClosePress={props.onClose} />

          <Readmore title={storyTitle} onReadMore={onReadMoreOpen} />

          <ProgressArray
            next={nextStory}
            isLoaded={isLoaded}
            duration={duration}
            pause={isPause}
            isNewStory={props.isNewStory}
            stories={stories}
            currentIndex={currentIndex}
            currentStory={stories[currentIndex]}
            length={stories.map((_, i) => i)}
            progress={{ id: currentIndex }}
          />

        </View>

        <Modal style={styles.modal} position="bottom" isOpen={isModelOpen} onClosed={onReadMoreClose}>
          <View style={styles.bar} />
          <WebView source={{ uri: stories[currentIndex].url }} />
        </Modal>

      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingTop: 30,
    backgroundColor: 'red',
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  content: { width: '100%',
    height: '100%',
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  bar: {
    width: 50,
    height: 5,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 5
  },
});

export default StoryContainer;
