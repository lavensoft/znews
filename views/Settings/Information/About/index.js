import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, ListTile, SectionTitle, Appbar } from '../../../../components';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Text, TouchableOpacity, Linking} from 'react-native';

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
            <SectionTitle style={{paddingBottom: 0}} subtitle="Thông tin liên hệ"/>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:lavensoftincs@gmail.com")}>
                <Text style={{
                    marginLeft: 24, 
                    marginTop: 20
                }}>Email: lavensoftincs@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("tel:+84938415997")}>
                <Text style={{
                    marginLeft: 24, 
                    marginTop: 20
                }}>Số điện thoại: +84 938 415 997</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.lavenes.com/")}>
                <Text style={{
                    marginLeft: 24, 
                    marginTop: 20
                }}>Website: https://www.lavenes.com/</Text>
            </TouchableOpacity>
            <Text style={{marginLeft: 24, marginTop: 20}}>Địa chỉ liên hệ: 71 Tran Hung Dao, Cau Ong Lanh Ward, District 1, HCMC</Text>

            <SectionTitle style={{marginTop: 48, paddingBottom: 0}} subtitle="Thông tin ứng dụng"/>
            <Text style={{marginLeft: 24, marginTop: 20}}>Nhà phát triển: Lavenes</Text>
            <Text style={{marginLeft: 24, marginTop: 20}}>Phiên bản ứng dụng: 1.1.6</Text>
            
            <SectionTitle style={{marginTop: 48, paddingBottom: 0}} subtitle="Điều khoản và Chính sách"/>
            <TouchableOpacity onPress={() => Linking.openURL("https://znews.lavenes.com/privacy/")}>
                <Text style={{
                    marginLeft: 24, 
                    marginTop: 20,
                    fontWeight: '600'
                }}>Chính sách về quyền riêng tư</Text>
            </TouchableOpacity>
        </ScreenView>
    );
}

export default InformationAboutScreen;