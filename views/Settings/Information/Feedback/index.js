import React, {useEffect, useState, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, LButton, SectionTitle, Appbar } from '../../../../components';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Text, TextInput, Dimensions, View, Linking, TouchableOpacity} from 'react-native';
import API from '../../../../api';

//*Views
const Stack = createNativeStackNavigator();

const InformationFeedbackScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen name="Main" component={Feedback} />
        </Stack.Navigator>
    )
}

const Feedback = ({navigation}) => {
    const dispatch = useDispatch();
    const textInputRef = useRef(null);
    const [textInputValue, setTextInputValue] = useState('');
    const [sendSuccess, setSendSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        textInputRef.current.focus();
    }, []);

    const handleSendFeedback = async() => {
        setLoading(true);

        await API.Analytics.sendFeedback(textInputValue);

        setLoading(false);
        setSendSuccess(true);
    }

    return (
        <ScreenView 
            loading={loading}
            contentStyle={{
                paddingTop: 0
            }}
        >
            {!sendSuccess ?
                <>
                    <SectionTitle style={{paddingBottom: 12}} subtitle="Nội dung góp ý"/>
                    <Text style={{
                        marginTop: 0, 
                        marginBottom: 24, 
                        marginHorizontal: 24,
                        color: "#a0a0a0",
                    }}>Rất hoang nghênh những ý kiến đóng góp của bạn 😍</Text>
                    <TextInput
                        ref={textInputRef}
                        onChangeText={(text) => setTextInputValue(text)}
                        multiline={true}
                        style={{
                            width: Dimensions.get('window').width - 48,
                            height: 300,
                            backgroundColor: "#ffffff",
                            borderColor: "#e0e0e0",
                            borderWidth: 1,
                            marginHorizontal: 24,
                            textAlignVertical: 'top',
                            padding: 16,
                            borderRadius: 12
                        }}
                    />
                    <TouchableOpacity onPress={() => Linking.openURL("mailto:lavensoftincs@gmail.com")}>
                        <Text style={{
                            marginTop: 12, 
                            marginHorizontal: 24,
                            color: "#a0a0a0",
                            fontSize: 12
                        }}>Liên hệ chi tiết qua mail: lavensoftincs@gmail.com</Text>
                    </TouchableOpacity>
                    <LButton style={{marginTop: 24}} onPress={handleSendFeedback}>Gửi</LButton>
                </> :
                <>
                    <View style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: Dimensions.get('window').height - 200
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: '#222222'
                        }}>Đã gửi thành công!</Text>
                        <Text style={{
                            marginTop: 20, 
                            marginBottom: 24, 
                            marginHorizontal: 24,
                            color: "#a0a0a0",
                            textAlign: 'center'
                        }}>Chúng mình rất cảm ơn những ý kiến đóng góp của bạn 😍</Text>
                        <LButton style={{marginTop: 32}} onPress={() => navigation.goBack()}>Trở lại</LButton>
                    </View>
                </>
            }
        </ScreenView>
    );
}

export default InformationFeedbackScreen;