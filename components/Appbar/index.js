import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

//*Styles
import {headerStyles, backActionStyles, contentStyles, actionStyles} from './styles';

const Header = ({style, children}) => {
    return (
        <View style={{
            ...headerStyles.container,
            ...style
        }}>
            {children}
        </View>
    )
}

const BackAction = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={backActionStyles.container}>
            <Icon
                name="chevron-back-outline"
                size={24}
                color="#222222"
            />
        </TouchableOpacity>
    )
}

const Content = ({children}) => {
    return (
        <View style={contentStyles.container}>
            {children}
        </View>
    )
}

const Action = ({icon, onPress, color}) => {
    return (
        <TouchableOpacity onPress={onPress} style={actionStyles.container}>
            <Icon
                name={icon}
                size={22}
                color={color || "#222222"}
            />
        </TouchableOpacity>
    )
}

const Appbar = {
    Header,
    BackAction,
    Content,
    Action
}

export default Appbar;