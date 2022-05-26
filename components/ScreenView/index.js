import React from 'react';

import {ScreenTitle} from '../Titles';
import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, SafeAreaView, View, ScrollView, RefreshControl} from 'react-native';
import {TextBox} from '../TextBox';

//*Styles
import {screenViewStyles} from './styles';

export const ScreenView = ({loading, onSearch, refreshing, onRefresh, children, title, titleTime, onScroll, scrollEventThrottle}) => {
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
                <View style={screenViewStyles.view}>
                    <View style={loading ? screenViewStyles.headerContainer : null}>
                        <ScreenTitle style={{marginBottom: onSearch ? 16 : 32}} titleTime={titleTime}>
                            {title}
                        </ScreenTitle>
                        { onSearch ?
                            <TextBox style={{marginBottom: 32}} onChangeText={onSearch} placeholder={"Search..."} icon={"search"}/> : null
                        }
                        <StatusBar style="auto"/>
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