import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

//*Styles
import {storyAvatarStyles} from './styles';

export const StoryAvatar = ({style, onPress, avatar, name, viewed}) => {
    return(
        <TouchableOpacity onPress={onPress} style={{...storyAvatarStyles.container, ...style}}>
            <View style={{...storyAvatarStyles.avatarContainer, 
                ...(viewed ? storyAvatarStyles.avatarContainerViewed : {})
            }}>
                <View style={storyAvatarStyles.avatar}>
                    <Image borderRadius={30} source={{uri: avatar}} style={storyAvatarStyles.img}/>
                </View>
            </View>
            <Text numberOfLines={1} style={storyAvatarStyles.title}>{name}</Text>
        </TouchableOpacity>
    )
}