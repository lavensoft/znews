import React, { Children } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

//*Styles
import { buttonStyles, selectButtonStyles } from './styles';

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

//Select Button
export const SelectButton = ({children, style, onPress, active}) => {
    return (
        <TouchableOpacity style={{
            ...selectButtonStyles.container,
            ...style,
            ...(active ? selectButtonStyles.containerActive : {})
        }} onPress={onPress}>
            <Text style={{
                ...selectButtonStyles.text,
                ...(active ? selectButtonStyles.textActive : {})
            }}>{children}</Text>
        </TouchableOpacity>
    )
};