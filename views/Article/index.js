import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { Appbar } from '../../components';
import Actions from '../../sagas/actions';
import { useDispatch } from 'react-redux';
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
    }, []);

    return(
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <StatusBar style="auto"/>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.pop()}/>
                <Appbar.Content/>
                <Appbar.Action 
                    icon="bookmark" 
                    color={isBookmarked ? '#ff0000' : null}
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