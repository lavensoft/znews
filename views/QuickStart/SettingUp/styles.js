import { StyleSheet, Dimensions } from "react-native";

export const settingUpStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').height - 40,
        paddingTop: 0,
        backgroundColor: "#fff"
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').height - 128,
        paddingTop: 48,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        fontWeight: '600'
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: "#acacac",
        marginTop: 12
    },
    loadingTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: "#acacac",
        marginTop: 20
    },
    content: {
        width: '100%',
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
    }
});