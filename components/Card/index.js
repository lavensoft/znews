import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';

//*Styles
import { postCardStyles } from './styles';

//*Post Card
export const PostCard = ({subtitle, originIcon, originTitle, title, banner, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={postCardStyles.container}>
            <View style={postCardStyles.tagsContainer}>
                <View style={postCardStyles.tagGroup}>
                    <Image source={{uri: originIcon}} style={postCardStyles.tagIcon}/>
                    <Text style={postCardStyles.tag}>{originTitle}</Text>
                </View>
            </View>
            <View style={postCardStyles.descriptionContainer}>
                <Text style={postCardStyles.title} numberOfLines={3}>{title}</Text>
                {subtitle ? 
                    <Text style={postCardStyles.origin}>{subtitle}</Text> : null
                }
            </View>
            <View style={postCardStyles.bannerBackdrop}></View>
            <View style={postCardStyles.bannerContainer}>
                <ImageBackground imageStyle={{borderRadius: 12}} resizeMode="cover"  source={{uri: banner}} style={postCardStyles.banner}/>
            </View>
        </TouchableOpacity>
    );
}