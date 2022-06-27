import React from 'react';
import FastImage from 'react-native-fast-image'
import { View, Text, TouchableOpacity } from 'react-native';
import Helper from '../../helper';
import CONFIG from '../../global/config';

//*Styles
import { postCardStyles, detailPostCardStyles, imageCardStyles } from './styles';

//*Post Card
export const PostCard = ({subtitle, originIcon, originTitle, title, banner, onPress, date}) => {
    let dateAgo = date ? Helper.prettyDate(new Date(date).toString(), {
        lang: {
            seconds: ["giây", "giây"],
            minutes: ["phút", "phút"],
            hours: ["giờ", "giờ"],
            days: ["ngày", "ngày"],
            months: ["tháng", "tháng"],
            years: ["năm", "năm"],
            misc: ["trước", "Invalid input, please check formating"]
        }
    }) : null;

    if(Number(dateAgo?.value || -1) <= -1) dateAgo = null;

    const originLogo = originIcon;
    const bannerImage = banner.indexOf('http') === 0 ? banner : (CONFIG.CDN_DOMAIN + banner);

    return (
        <TouchableOpacity onPress={onPress} style={postCardStyles.container}>
            <View style={postCardStyles.tagsContainer}>
                <View style={postCardStyles.tagGroup}>
                    <FastImage source={{uri: originLogo}} style={postCardStyles.tagIcon}/>
                    <Text style={postCardStyles.tag}>{originTitle}</Text>
                </View>
            </View>
            <View style={postCardStyles.descriptionContainer}>
                {subtitle ? 
                    <Text style={postCardStyles.subtitle}>{subtitle}</Text> : null
                }
                <Text style={postCardStyles.title} numberOfLines={3}>{title}</Text>
                {dateAgo ? 
                    <Text style={postCardStyles.time}>
                        {
                            dateAgo.value + " " + dateAgo.lang + " " + dateAgo.misc
                        }
                    </Text> : null 
                }
            </View>
            <View style={postCardStyles.bannerBackdrop}></View>
            <View style={postCardStyles.bannerContainer}>
                <FastImage style={postCardStyles.banner} resizeMode="cover"  source={{uri: bannerImage}}/>
            </View>
        </TouchableOpacity>
    );
}

//*Detail
export const DetailPostCard = ({subtitle, originIcon, originTitle, title, banner, onPress, date}) => {
    let dateAgo = date ? Helper.prettyDate(new Date(date).toString(), {
        lang: {
            seconds: ["giây", "giây"],
            minutes: ["phút", "phút"],
            hours: ["giờ", "giờ"],
            days: ["ngày", "ngày"],
            months: ["tháng", "tháng"],
            years: ["năm", "năm"],
            misc: ["", "Invalid input, please check formating"]
        }
    }) : null;

    if(Number(dateAgo?.value || -1) <= -1) dateAgo = null;

    const bannerImage = banner.indexOf('http') === 0 ? banner : (CONFIG.CDN_DOMAIN + banner);

    return (
        <TouchableOpacity onPress={onPress} style={detailPostCardStyles.container}>
            <View style={detailPostCardStyles.bannerContainer}>
                <FastImage source={{uri: bannerImage}} style={detailPostCardStyles.banner}/>
            </View>
            <View style={detailPostCardStyles.descriptionContainer}>
                <Text numberOfLines={2} style={detailPostCardStyles.title}>{title}</Text>
                {subtitle ?
                    <Text style={detailPostCardStyles.subtitle}>
                        {subtitle + ( dateAgo ? "  •  " + dateAgo.value + " " + dateAgo.lang + " " + dateAgo.misc : "")}
                    </Text> : null
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