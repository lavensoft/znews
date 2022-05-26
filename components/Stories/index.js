import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

//*Styles
import {storyAvatarStyles} from './styles';

export const StoryAvatar = ({onPress, avatar, name}) => {
    return(
        <TouchableOpacity onPress={onPress} style={storyAvatarStyles.container}>
            <View style={storyAvatarStyles.avatarContainer}>
                <View style={storyAvatarStyles.avatar}>
                    <Image borderRadius={30} source={{uri: avatar}} style={storyAvatarStyles.img}/>
                </View>
            </View>
            <Text numberOfLines={1} style={storyAvatarStyles.title}>{name}</Text>
        </TouchableOpacity>
    )
}