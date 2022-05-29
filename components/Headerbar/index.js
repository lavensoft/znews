import React from 'react';
import Appbar from '../Appbar';
import {Text} from 'react-native';

import {headerbarStyles} from './styles';

const Headerbar = ({navigation, title}) => {
    return (
        <Appbar.Header style={headerbarStyles.container}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content>
                <Text style={headerbarStyles.title}>{title}</Text>
            </Appbar.Content>
        </Appbar.Header>
    )
}

export default Headerbar;