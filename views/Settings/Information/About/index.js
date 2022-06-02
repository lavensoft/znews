import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, ListTile, SectionTitle, Appbar } from '../../../../components';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Text} from 'react-native';

//*Views
const Stack = createNativeStackNavigator();

const InformationAboutScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen name="Main" component={About} />
        </Stack.Navigator>
    )
}

const About = ({navigation}) => {
    const dispatch = useDispatch();

    return (
        <ScreenView   
            contentStyle={{
                paddingTop: 0
            }}
        >
            <SectionTitle style={{marginTop: 0}}>Thông tin ứng dụng</SectionTitle>
            <Text>Nhà phát triển: Lavenes</Text>
        </ScreenView>
    );
}

export default InformationAboutScreen;