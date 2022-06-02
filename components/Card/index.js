import React from 'react';
import FastImage from 'react-native-fast-image'
import { View, Text, TouchableOpacity } from 'react-native';

//*Styles
import { postCardStyles, detailPostCardStyles, imageCardStyles } from './styles';

//*Post Card
export const PostCard = ({subtitle, originIcon, originTitle, title, banner, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={postCardStyles.container}>
            <View style={postCardStyles.tagsContainer}>
                <View style={postCardStyles.tagGroup}>
                    <FastImage source={{uri: originIcon}} style={postCardStyles.tagIcon}/>
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
                <FastImage style={postCardStyles.banner} resizeMode="cover"  source={{uri: banner}}/>
            </View>
        </TouchableOpacity>
    );
}

//*Detail
export const DetailPostCard = ({subtitle, originIcon, originTitle, title, banner, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={detailPostCardStyles.container}>
            <View style={detailPostCardStyles.bannerContainer}>
                <FastImage borderRadius={9} source={{uri: banner}} style={detailPostCardStyles.banner}/>
            </View>
            <View style={detailPostCardStyles.descriptionContainer}>
                <Text numberOfLines={2} style={detailPostCardStyles.title}>{title}</Text>
                {subtitle ?
                    <Text style={detailPostCardStyles.subtitle}>{subtitle}</Text> : null
                }
            </View>
        </TouchableOpacity>
    )
}

//*Image Card
export const ImageCard = ({style, title, titleStyle, subtitle, subtitleStyle, banner, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={{
            ...imageCardStyles.container,
            ...style
        }}>
            <View style={imageCardStyles.bannerContainer}>
                <FastImage source={{uri: banner}} style={imageCardStyles.banner}/>
            </View>
            <View style={imageCardStyles.descriptionContainer}>
                <Text style={{
                    ...imageCardStyles.title,
                    ...titleStyle
                }} numberOfLines={1}>{title}</Text>
                {subtitle ?
                    <Text numberOfLines={1} style={{
                        ...imageCardStyles.subtitle,
                        ...subtitleStyle
                    }}>{subtitle}</Text> : null
                }
            </View>
        </TouchableOpacity>
    )
}