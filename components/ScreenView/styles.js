import { StyleSheet, Dimensions } from "react-native";

export const screenViewStyles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: '100%',
        paddingTop: 24,
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
    },
    blankPage: {
        width: '100%',
        flex: 1,
        height: Dimensions.get('window').height - 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    blankTitle: {
        fontSize: 16,
        color: 'rgba(0,0,0, .25)',
        fontWeight: 'bold'
    }
});