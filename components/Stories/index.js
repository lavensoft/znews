import React from 'react';
import FastImage from 'react-native-fast-image'
import {View, Text, TouchableOpacity} from 'react-native';
import CONFIG from '../../global/config';

//*Styles
import {storyAvatarStyles} from './styles';

export const StoryAvatar = ({style, onPress, avatar, name, viewed}) => {
    const avatarImage = avatar.indexOf('http') === 0 ? avatar : (CONFIG.CDN_DOMAIN + avatar);
    
    return(
        <TouchableOpacity onPress={onPress} style={{...storyAvatarStyles.container, ...style}}>
            <View style={{...storyAvatarStyles.avatarContainer, 
                ...(viewed ? storyAvatarStyles.avatarContainerViewed : {})
            }}>
                <View style={storyAvatarStyles.avatar}>
                    <FastImage source={{uri: avatarImage}} style={storyAvatarStyles.img}/>
                </View>
            </View>
            <Text numberOfLines={1} style={storyAvatarStyles.title}>{name}</Text>
        </TouchableOpacity>
    )
}