import React, { Children } from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

//*Styles
import {buttonStyles} from './styles';

export const LButton = ({children, style}) => {
    return (
        <TouchableOpacity style={{
            ...buttonStyles.container,
            ...style
        }}>
            <Text style={buttonStyles.text}>{children}</Text>
        </TouchableOpacity>
    );
}