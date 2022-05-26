import React from 'react';
import {View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Feather";

//*Styles
import {headerStyles, backActionStyles, contentStyles, actionStyles} from './styles';

const Header = ({children}) => {
    return (
        <View style={headerStyles.container}>
            {children}
        </View>
    )
}

const BackAction = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={backActionStyles.container}>
            <Icon
                name="arrow-left"
                size={24}
                color="#000"
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
                size={24}
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