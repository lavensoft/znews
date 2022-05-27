import { StyleSheet, Dimensions } from "react-native";

export const screenViewStyles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: '100%'
    },
    view: {
        boxSizing: 'border-box',
        //paddingHorizontal: 24
    },
    headerContainer: {
        height: Dimensions.get('window').height - 200,
        display: 'flex',
        flexDirection: 'column',
    },  
    loadingContainer : {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});