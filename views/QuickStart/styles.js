import { StyleSheet, Dimensions } from "react-native";

export const topicsStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').height - 40,
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
    content: {
        width: '100%',
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
    }
});

export const topicTileStyles = StyleSheet.create({
    container: {
        width: 100,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#eaeaea",
        borderWidth: 2,
        borderRadius: 14,
        backgroundColor: "#fff",
        margin: 5,
    },
    containerActive: {
        borderColor: "#22222250",
        backgroundColor: "#22222210"
    },  
    icon: {
        fontSize: 32
    },
    title: {
        fontSize: 14,
        marginTop: 12,
        fontWeight: '500',
        color: '#acacac'
    },
    titleActive: {
        color: "#222222"
    }
});