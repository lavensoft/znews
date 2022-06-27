import React, {useRef} from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

//*Styles
import { textboxStyles } from './styles';

export const TextBox = ({ style, onSubmit, isLoading, onChange, onChangeText, placeholder, icon }) => {
    const textInputRef = useRef();

    const handleClearTextbox = () => {
        textInputRef.current.clear();
        textInputRef.current.focus();
    }

    return(
        <View style={{...textboxStyles.container, ...style}}>
            {icon ? 
                <TouchableOpacity onPress={onSubmit} style={textboxStyles.action}>
                    <Icon name={icon} size={16} color="#222222"/>
                </TouchableOpacity> : null
            }
            <TextInput onChangeText={onChangeText} onChange={onChange} ref={textInputRef} style={{...textboxStyles.textInput, marginLeft: (icon ? 14 : 0)}} placeholder={placeholder}/>
            {
                !isLoading ? 
                <TouchableOpacity onPress={handleClearTextbox} style={textboxStyles.action}>
                    <Icon name="x" size={15} color="#555555"/>
                </TouchableOpacity> :
                <View style={textboxStyles.action}>
                    <ActivityIndicator size="small" color="#555555"/>
                </View>
            }
        </View>
    )
}