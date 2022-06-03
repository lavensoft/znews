import React from 'react';
import {View, Text} from 'react-native';

//*Styles
import {screenTitleStyles, sectionTitleStyles, blankTitleStyles} from './styles';

const viDayOfWeek = ['Chủ Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

export const ScreenTitle = ({ children, titleTime, style }) => {
    const dateNow = new Date();

    const dayOfWeek = (dateNow.getDay() + 1) >= 7 ? 0 : dateNow.getDay() + 1;
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

export const SectionTitle = ({ children, style }) => {
    return (
        <View style={{...sectionTitleStyles.container, ...style}}>
            <Text style={sectionTitleStyles.title}>{children}</Text>
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