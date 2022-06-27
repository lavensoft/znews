/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import FastImage from 'react-native-fast-image'
import { Dimensions, StyleSheet, View, Image } from 'react-native';
// import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';
import CONFIG from '../../global/config';

const ScreenWidth = Dimensions.get('window').width;

const Story = (props) => {
  const { story } = props;
  const { thumbnail, type = 'image' } = story || {};

  const image = thumbnail.indexOf('http') === 0 ? thumbnail : (CONFIG.CDN_DOMAIN + thumbnail);

  return (
    <View style={styles.container}>
      {/* {!props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      )} */}
      {type === 'image' ? (
        <Image
          source={{ uri: image }}
          style={styles.backdrop}
          resizeMode="cover"
          blurRadius={20}
          // width={ScreenWidth}
        />
      )
        : (
          <>
          </>
        )}
      {type === 'image' ? (
        <FastImage
          source={{ uri: image }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="contain"
          // width={ScreenWidth}
        />
      )
        : (
          <>
          </>
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
  content: { 
    width: '100%',
    height: '100%',
    flex: 1,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute'
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
