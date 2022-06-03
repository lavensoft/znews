import React from 'react';
import {ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';

import {loadingScreenStyles} from './styles';

export const LoadingScreen = () => {
    return (
        <SafeAreaView style={loadingScreenStyles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="light-content"/>
            <ActivityIndicator color="#222222"/>
        </SafeAreaView>
    )
}