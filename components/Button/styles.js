import { StyleSheet, Dimensions } from "react-native";

export const buttonStyles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 48,
        marginLeft: 24,
        height: 50,
        backgroundColor: "#222222",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '500'
    },
});