import React, {useEffect, useState} from 'react';
import {  View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, LButton } from '../../components';
import {useSelector, useDispatch} from 'react-redux';
import Actions from '../../sagas/actions';

//*Styles
import {topicsStyles, topicTileStyles} from './styles';

//*Views
import SettingUpScreen from './SettingUp';

const Stack = createNativeStackNavigator();

const QuickStartScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen name="Main" component={Topics} />
            <Stack.Screen name="SettingUp" component={SettingUpScreen} />
        </Stack.Navigator>
    )
}

const Topics = ({navigation}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.rss.isLoading);
    const rsses = useSelector(state => state.rss.data);
    const [rssSelected, setRssSelected] = useState([]);

    useEffect(() => {
        dispatch({type: Actions.rss.FETCH_ALL_RSS});
    });

    const handleSelect = (rss) => {
        if(rssSelected.includes(rss)){
            let newRssList = rssSelected.filter(rssId => rssId !== rss);

            setRssSelected(newRssList);
        }else{
            setRssSelected([...rssSelected, rss]);
        }
    }

    const handleSubmit = () => {
        let data = [];
        let idList = [];

        rsses.map((item) => {
            if(rssSelected.includes(item._id)){
                data.push(item.rsses)
            }
        })

        data.map((item) => {
            item.map((rss) => {
                idList.push(rss._id)
            })
        })

        navigation.navigate('SettingUp', {
            rssSubscribed: idList
        });
    }

    return (
        <ScreenView loading={isLoading && !rsses}>
            <View style={topicsStyles.container}>
                <Text style={topicsStyles.title}>Chào Mừng!</Text>
                <Text style={topicsStyles.subTitle}>Hãy chọn những mục bạn thấy hứng thú</Text>

                <View style={topicsStyles.content}>
                    {rsses.map((rss, index) => {
                        return(
                            <TopicTile 
                                icon={rss.icon}
                                title={rss.title}
                                key={`topic-${index}`}
                                active={rssSelected.includes(rss._id)}
                                onPress={handleSelect}
                                value={rss._id}
                            />
                        )
                    })}
                </View>

                <LButton style={{marginBottom: 32}} disabled={!rssSelected.length} onPress={handleSubmit}>Tiếp Tục</LButton>
            </View>
        </ScreenView>
    );
}

const TopicTile = ({topic, value, icon, title, onPress, active}) => {
    return(
        <TouchableOpacity
            style={{
            ...topicTileStyles.container,
            ...(active ? topicTileStyles.containerActive : {})
            }}
            onPress={() => onPress(value)}
        >
            <Text style={topicTileStyles.icon}>{icon}</Text>
            <Text style={{
                ...topicTileStyles.title,
                ...(active ? topicTileStyles.titleActive : {})
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default QuickStartScreen;