import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, Text, TouchableOpacity} from 'react-native';

//*Styles
import {listTilesStyles} from './styles';

const Tile = ({children, icon}) => {
    return (
        <TouchableOpacity style={listTilesStyles.container}>
            <View style={listTilesStyles.iconContainer}>
                <Icon name={icon} style={listTilesStyles.icon}/>
            </View>
            {children}
        </TouchableOpacity>
    );
}

const Content = ({children, column}) => {
    return (
        <View style={{
            ...listTilesStyles.contentContainer,
            flexDirection: column ? 'column' : 'row',
            alignItems: column ? 'flex-start' : 'center',
        }}>
            {children}
        </View>
    );
}

const Title = ({children, style}) => {
    return (
        <Text style={{
            ...listTilesStyles.contentTitle,
            ...style,
        }}>
            {children}
        </Text>
    );
}

const SubTitle = ({children, style}) => {
    return (
        <Text style={{
            ...listTilesStyles.subTitle,
            ...style,
        }}>
            {children}
        </Text>
    );
}

const Action = ({children}) => {
    return (
        <View style={listTilesStyles.actionContainer}>
            {children}
        </View>
    );
}

const ListTile = {
    Tile,
    Content,
    Title,
    SubTitle,
    Action
}

export default ListTile;