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
    const {url, banner, originIcon, originTitle, title, _id} = route.params;
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        API.Bookmarks.isBookmarked(_id).then(res => {
            setIsBookmarked(res);
        });
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
                                    banner,
                                    originIcon,
                                    originTitle,
                                    title,
                                    _id
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