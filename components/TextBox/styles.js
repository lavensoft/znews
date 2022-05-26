import { StyleSheet } from "react-native";

export const textboxStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 46,
        backgroundColor: '#eaeaea',
        paddingHorizontal: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: '100%',
        height: '100%',
        flex: 1,
        marginRight: 6,
        fontSize: 14
    },
    action: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});