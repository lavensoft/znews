import React from 'react';
import {View, Text} from 'react-native';

//*Styles
import {screenTitleStyles, sectionTitleStyles} from './styles';

export const ScreenTitle = ({ children, titleTime, style }) => {
    const dateNow = new Date();

    const dayOfWeek = dateNow.getDay() + 1;
    const day = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();

    return (
        <View style={{...screenTitleStyles.container, ...style}}>
            { titleTime ? 
                <Text style={screenTitleStyles.date}>{`Thứ ${dayOfWeek}, ${day} tháng ${month}, ${year}`}</Text>
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