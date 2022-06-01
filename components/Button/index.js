import React, { Children } from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

//*Styles
import {buttonStyles} from './styles';

export const LButton = ({children, style, onPress, disabled}) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{
            ...buttonStyles.container,
            ...style,
            ...(disabled ? {opacity: .55} : {})
        }}>
            <Text style={buttonStyles.text}>{children}</Text>
        </TouchableOpacity>
    );
}