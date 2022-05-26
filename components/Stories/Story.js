/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
// import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';

const ScreenWidth = Dimensions.get('window').width;

const Story = (props) => {
  const { story } = props;
  const { banner, type = 'image' } = story || {};

  return (
    <View style={styles.container}>
      {/* {!props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      )} */}
      {type === 'image' ? (
        <Image
          source={{ uri: banner }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="contain"
          // width={ScreenWidth}
        />
      )
        : (
          <Video
            source={{ uri: banner }}
            paused={props.pause || props.isNewStory}
            onLoad={item => props.onVideoLoaded(item)}
            style={styles.content}
          />
        )}
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { width: '100%',
    height: '100%',
    flex: 1,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Story;
