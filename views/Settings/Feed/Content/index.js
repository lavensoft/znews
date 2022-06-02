import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenView, ListTile, SectionTitle, ImageCard } from '../../../../components';
import Actions from '../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, View, ScrollView} from 'react-native';
import API from '../../../../api';
import Helper from '../../../../helper';

const Stack = createNativeStackNavigator();

//*VIEWS
import FeedContentRSSScreen from './RSS';

const FeedContentScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
        >
            <Stack.Screen 
                name="Main" 
                component={Topics}
            />
            <Stack.Screen 
                name="Users" 
                component={FeedContentRSSScreen}
            />
        </Stack.Navigator>
    )
}

const Topics = ({navigation}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.topics.isLoading);
    const topics = useSelector(state => state.topics.data);

    useEffect(() => {
        dispatch({type: Actions.topics.FETCH_ALL_TOPICS});
    }, []);

    const handleRefresh = () => {
        dispatch({type: Actions.topics.FETCH_ALL_TOPICS});
    }

    return (
        <ScreenView 
            loading={isLoading}
            scrollEventThrottle={400}
            refreshing={isLoading && !topics}
            onRefresh={handleRefresh}
            contentStyle={{
                paddingTop: 0
            }}
        >
            <SectionTitle style={{marginTop: 0, marginBottom: 20}}>Bạn đang quan tâm điều gì?</SectionTitle>
            
            <View style={{
                width: '100%',
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    marginLeft: 16,
                    marginRight: 5
                }}>
                    {topics.map((topic, index) => {
                        if(index % 2 === 0) {
                            return (
                                <ImageCard 
                                    titleStyle={{
                                        fontSize: 16
                                    }}
                                    key={`content-topic-card-${index}`}
                                    style={{
                                        height: Helper.randomNumber(150, 300),
                                        marginBottom: 8
                                    }} 
                                    title={topic.title}
                                    subtitle={topic.description}
                                    banner={topic.thumbnail}
                                    onPress={() => navigation.navigate('Users', {topic: topic._id, topicTitle: topic.title})}
                                    />
                            )
                        }
                    })}
                </View>
                <View style={{
                    flex: 1,
                    marginLeft: 5,
                    marginRight: 16
                }}>
                    {topics.map((topic, index) => {
                        if(index % 2 === 1) {
                            return (
                                <ImageCard 
                                    titleStyle={{
                                        fontSize: 16
                                    }}
                                    key={`content-topic-card-${index}`}
                                    style={{
                                        height: Helper.randomNumber(150, 300),
                                        marginBottom: 8
                                    }} 
                                    title={topic.title}
                                    subtitle={topic.description}
                                    banner={topic.thumbnail}
                                    onPress={() => navigation.navigate('Users', {topic: topic._id, topicTitle: topic.title})}
                                    />
                            )
                        }
                    })}
                </View>
            </View>
        </ScreenView>
    );
}

export default FeedContentScreen;