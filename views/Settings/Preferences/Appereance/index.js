import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ScreenView, ListTile, SectionTitle, Appbar } from '../../../../components';
import Actions from '../../../../sagas/actions';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

//*Views

const Stack = createNativeStackNavigator();

const PreferencesAppereanceScreen = ({route}) => {
    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen initialParams={route.params} name="Main" component={Appereance} />
        </Stack.Navigator>
    )
}

const Appereance = ({navigation, route}) => {
    const settings = route.params;
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(0);
    const [cardStyle, setCardStyle] = useState(0);

    useEffect(() => {
        setTheme(settings.theme || 0);
        setCardStyle(settings.cardStyle || 0);
    }, [settings]);

    const handleChangeSetting = (key, value) => {
        switch(key) {
            case "theme":
                setTheme(value);
                break;
            case "cardStyle":
                setCardStyle(value);
                break;
            default:
                break;
        }
    
        //Update settings
        dispatch({
            type: Actions.settings.UPDATE_SETTING,
            payload: {
                key: key,
                value: value
            }
        });
    }

    return (
        <ScreenView 
            appbar={{
                lead: <Appbar.BackAction onPress={() => navigation.goBack()} />,
            }}
            //loading={settings.isLoading && !settings}
        >
            <SectionTitle style={{marginTop: 0}}>Theme</SectionTitle>
            <SettingTile
                icon="sun"
                title="Light"
                active={theme === 'light'}
                settingKey="theme"
                value={'light'}
                onChange={handleChangeSetting}
            />
            <SettingTile
                icon="moon"
                title="Dark"
                settingKey="theme"
                value={'dark'}
                active={theme === 'dark'}
                onChange={handleChangeSetting}
            />
            <SettingTile
                icon="toggle-left"
                title="System"
                settingKey="theme"
                value={'system'}
                active={theme === 'system'}
                onChange={handleChangeSetting}
            />

            <SectionTitle style={{marginTop: 16}}>Card Style</SectionTitle>
            <SettingTile
                icon="grid"
                title="Card"
                settingKey="cardStyle"
                value={'card'}
                active={cardStyle === 'card'}
                onChange={handleChangeSetting}
            />
            <SettingTile
                icon="list"
                title="Detail"
                settingKey="cardStyle"
                value={'detail'}
                active={cardStyle === 'detail'}
                onChange={handleChangeSetting}
            />
        </ScreenView>
    );
}

const SettingTile = ({settingKey, value, title, subTitle, icon, onChange, active}) => {
    return (
        <ListTile.Tile 
            iconContainerStyle={
                active ? {
                    backgroundColor: "#222222"
                } : {}
            } 
            iconStyle={
                active ? {
                    color: "#fff"
                } : {}
            }
            onPress={() => onChange(settingKey, value)} 
            icon={icon}
        >
            <ListTile.Content column>
                <ListTile.Title>{title}</ListTile.Title>
                {
                    subTitle ?
                    <ListTile.SubTitle style={{marginTop: 8}}>{subTitle}</ListTile.SubTitle> : null
                }
            </ListTile.Content>
            <ListTile.Action>
                <Icon name="check" size={18} color={"#222"} style={{
                    opacity: active ? 1 : 0,
                }}/>
            </ListTile.Action>
        </ListTile.Tile>
    )
}

export default PreferencesAppereanceScreen;