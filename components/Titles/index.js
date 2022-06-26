import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//*Styles
import {screenTitleStyles, sectionTitleStyles, blankTitleStyles} from './styles';

const viDayOfWeek = ['Chủ Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

export const ScreenTitle = ({ children, titleTime, style }) => {
    const dateNow = new Date();

    const dayOfWeek = (dateNow.getDay()) >= 7 ? 0 : dateNow.getDay();
    const day = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();

    return (
        <View style={{...screenTitleStyles.container, ...style}}>
            { titleTime ? 
                <Text style={screenTitleStyles.date}>{`${viDayOfWeek[dayOfWeek]}, ${day} tháng ${month}, ${year}`}</Text>
            : null }
            <Text style={screenTitleStyles.title}>{children}</Text>
        </View>
    );
}

export const SectionTitle = ({ style, subtitle, subtitleColor, title, titleColor, description, onPressAdd, addActionDone, onPressMore }) => {
    return (
        <View style={{
            ...sectionTitleStyles.container,
            ...style
        }}>
            <TouchableOpacity style={sectionTitleStyles.titleContainer} onPress={onPressMore}>
                {
                    subtitle ?
                    <Text style={{
                        ...sectionTitleStyles.subtitle,
                        color: subtitleColor
                    }}>{subtitle}</Text> : null
                }
                {
                    title ?
                    <Text style={{
                        ...sectionTitleStyles.title,
                        color: titleColor
                    }}>{title}</Text> : null
                }
                {
                    description ?
                    <Text 
                        style={sectionTitleStyles.description}
                    >{description}</Text> : null
                }
            </TouchableOpacity>
            <View style={sectionTitleStyles.actionContainer}>
                {   onPressAdd ? 
                    <TouchableOpacity 
                        onPress={onPressAdd}
                        style={sectionTitleStyles.actionBtn}
                    >
                        <Icon
                            style={{
                                ...sectionTitleStyles.actionBtnIcon,
                                color: titleColor
                            }} 
                            name={addActionDone ? "ios-checkmark" : "ios-add"} 
                        />
                    </TouchableOpacity> : null 
                }
            </View>
        </View>
    );
}

export const BlankTitle = ({ children, style }) => {
    return(
        <View style={blankTitleStyles.container}>
            <Text style={{
                ...blankTitleStyles.title,
                ...style
            }}>{children}</Text>
        </View>
    )
};