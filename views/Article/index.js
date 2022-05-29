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
    const {url, thumbnail, originIcon, originTitle, title, _id, author} = route.params;
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        //*Check bookmarks
        API.Bookmarks.isBookmarked(_id).then(res => {
            setIsBookmarked(res);
        });

        //*Update view
        dispatch({type: Actions.articles.UPDATE_ARTICLES_VIEW, id: _id});

        return () => {
          //Save article state
          dispatch({
            type: Actions.articles.SAVE_ARTICLE_STATE, id: _id, 
            state: {}
          });
        }
    }, []);


  const onShare = async () => {
    try {
      const result = await Share.share({
        url: url //CONFIG.DOMAIN + "articles/" + _id,
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

    return(
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <StatusBar style="auto"/>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.pop()}/>
                <Appbar.Content/>
                <Appbar.Action 
                    icon="share-outline" 
                    onPress={
                        () => onShare()
                    }
                />
                <Appbar.Action 
                    icon={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    onPress={
                        () => {
                            setIsBookmarked(!isBookmarked);
                            dispatch({
                                type: Actions.bookmarks.ADD_BOOKMARKS,
                                siteData: {
                                    url,
                                    thumbnail,
                                    originIcon,
                                    originTitle,
                                    title,
                                    _id,
                                    author
                                }
                            })
                        }
                    }
                />
            </Appbar.Header>

            <WebView source={{ uri: url }} style={{width: '100%', height: '100%'}} />
        </SafeAreaView>
    )
}

export default ArticleScreen;