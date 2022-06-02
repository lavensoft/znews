import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {WebView} from 'react-native-webview';
import Appbar from '../Appbar';
import Actions from '../../sagas/actions';
import { useDispatch } from 'react-redux';
import {Share} from 'react-native';
import CONFIG from '../../global/config';
import API from '../../api';

const StoryPopup = ({visible, onReadMoreClose, storyData, authorData}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {url, thumbnail, title, _id} = storyData;
    const author = authorData.author;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [articleData, setArticleData] = useState(null);

    useEffect(() => {
      //*Check bookmarks
      API.Bookmarks.isBookmarked(_id).then(res => {
          setIsBookmarked(res);
      });

      //*Fetch article data
      if(!(url && thumbnail && title && author)) {
        API.Articles.getId(_id).then(res => {
          let data = res.data;

          setArticleData({
            url: data.url,
            thumbnail: data.thumbnail,
            title: data.title,
            _id: _id,
            author: author
          });
        });
      }else{
        setArticleData({
          url: url,
          thumbnail: thumbnail,
          title: title,
          _id: _id,
          author: author
        });
      }

      //*Update view
      dispatch({type: Actions.articles.UPDATE_ARTICLES_VIEW, id: _id});
    }, [storyData]);


    const onShare = async () => {
    try {
      const result = await Share.share({
        message: CONFIG.DOMAIN + "article/" + _id,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
    };

    const handleBookMark = async () => {
      setIsBookmarked(!isBookmarked);
      dispatch({
          type: Actions.bookmarks.ADD_BOOKMARKS,
          payload: {
            articleData
          }
      })
    }

    const onClose = async() => {
        //Save article state
        dispatch({
          type: Actions.articles.SAVE_ARTICLE_STATE,
          payload: {
            articleData: {
              url,
              thumbnail,
              title,
              _id,
              author
            }
          },
          state: {}
        });

        onReadMoreClose();
    }

    if(!articleData) return null;

    return(
        <Modal animationType='slide' style={styles.container} visible={visible}>
          <Appbar.Header style={{paddingTop: 8, height: 64}}>
              <Appbar.BackAction onPress={onClose}/>
              <Appbar.Content/>
              <Appbar.Action 
                  icon="share-outline" 
                  onPress={
                      () => onShare()
                  }
              />
              <Appbar.Action 
                  icon={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  onPress={handleBookMark}
              />
          </Appbar.Header>

          <WebView onLoadEnd={() => setLoading(false)} source={{ uri: articleData.url }} />

          {loading ?
            <View style={{
                position: 'absolute',
                top: 86,
                bottom: 0,
                width: '100%',
                height: Dimensions.get('window').height - 140,
                paddingBottom: 48,
                backgroundColor: '#fff',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center'
            }}>
              <ActivityIndicator color="#222222"/>
            </View> : <></>
          }   
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default StoryPopup;