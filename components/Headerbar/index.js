import React from 'react';
import Appbar from '../Appbar';
import { Text, View, Dimensions } from 'react-native';
import { ScreenTitle } from '../Titles';
import { TextBox } from '../TextBox';

import { headerbarStyles, searchHeaderStyles } from './styles';

export const Headerbar = ({navigation, title}) => {
    return (
        <Appbar.Header style={headerbarStyles.container}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content>
                <Text style={headerbarStyles.title}>{title}</Text>
            </Appbar.Content>
        </Appbar.Header>
    )
}

export const SearchHeader = ({ onSearch, title, placeholder, isLoading }) => {
    return (
        <View style={searchHeaderStyles.container}>
            <ScreenTitle 
                style={{marginBottom: 16}} 
            >
                {title}
            </ScreenTitle>
            <TextBox 
                style={{
                    marginHorizontal: 24, 
                    marginBottom: 32, 
                    width: Dimensions.get('window').width - 48
                }} 
                onChangeText={onSearch} 
                placeholder={placeholder} 
                icon={"search"}
                isLoading={isLoading}
            />
        </View>
    )
}