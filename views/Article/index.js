import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { Appbar } from '../../components';
import Actions from '../../sagas/actions';
import { useDispatch } from 'react-redux';
import {Share} from 'react-native';
import CONFIG from '../../global/config';
import API from '../../api';

const ArticleScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {url, thumbnail, title, _id, author} = route.params;
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

      return () => {
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
      }
    }, []);


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

    if(!articleData) return null;

    return(
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <StatusBar style="auto"/>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
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

            <WebView source={{ uri: articleData.url }} style={{width: '100%', height: '100%'}} />
        </SafeAreaView>
    )
}

export default ArticleScreen;