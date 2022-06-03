import React from 'react';

import {ScreenTitle} from '../Titles';
import Appbar from '../Appbar';
import {StatusBar} from 'expo-status-bar';
import {Text, ActivityIndicator, SafeAreaView, View, ScrollView, RefreshControl} from 'react-native';
import {TextBox} from '../TextBox';

//*Styles
import {screenViewStyles} from './styles';
import { Dimensions } from 'react-native-web';

//*ScreenView
export const ScreenView = ({contentStyle, blankTitle, blankTitleStyle, loading, onSearch, refreshing, onRefresh, children, title, titleTime, onScroll, scrollEventThrottle}) => {
    return (
        <SafeAreaView style={screenViewStyles.container}>
            <ScrollView 
                onScroll={onScroll} 
                scrollEventThrottle={scrollEventThrottle}
                refreshControl={
                    onRefresh ? <RefreshControl
                      refreshing={refreshing || false}
                      onRefresh={onRefresh}
                    /> : null
                }
            >
                <View style={{
                    ...screenViewStyles.view,
                    ...contentStyle
                }}>
                    <View style={loading ? screenViewStyles.headerContainer : null}>
                        {title ? 
                            <ScreenTitle style={{marginBottom: onSearch ? 16 : 32}} titleTime={titleTime}>
                                {title}
                            </ScreenTitle> : <View style={{height: 16}}></View>
                        }
                        { onSearch ?
                            <TextBox style={{marginHorizontal: 24, marginBottom: 32, width: Dimensions.get('window').width - 48}} onChangeText={onSearch} placeholder={"Hãy nhập gì đó..."} icon={"search"}/> : null
                        }
                        {
                            blankTitle ?
                            <View style={screenViewStyles.blankPage}>
                                <Text style={{
                                    ...screenViewStyles.blankTitle,
                                    ...blankTitleStyle
                                }}>{blankTitle}</Text>
                            </View> : null
                        }
                        {loading ? 
                            <View style={screenViewStyles.loadingContainer}>
                                <ActivityIndicator color="#222222" />
                            </View> : null
                        }   
                    </View>
                    {!loading ? children : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}