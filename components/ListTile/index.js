import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, Text, TouchableOpacity, Image} from 'react-native';

//*Styles
import {listTilesStyles} from './styles';

const Tile = ({children, icon, onPress, avatar, style, iconContainerStyle, iconStyle}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            ...listTilesStyles.container,
            ...style,
        }}>
            {
                avatar ?
                <View style={listTilesStyles.avatarContainer}>
                    <Image resizeMode='cover' source={{uri: avatar}} style={listTilesStyles.avatar}/>
                </View> : null
            }
            {icon ? 
                <View style={{
                    ...listTilesStyles.iconContainer,
                    ...iconContainerStyle,
                }}>
                    <Icon name={icon} style={{
                        ...listTilesStyles.icon,
                        ...iconStyle,
                    }}/>
                </View> : null
            }
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
    Action,
}

export default ListTile;