import { StyleSheet, Dimensions } from "react-native";

export const buttonStyles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 48,
        marginLeft: 24,
        height: 48,
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

export const selectButtonStyles = StyleSheet.create({
    container: {
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 18,
        backgroundColor: "#f6f6f6",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#eaeaeb",
        borderWidth: 1,
        marginRight: 12,
    },
    containerActive: {
        backgroundColor: "#222222",
        borderColor: "#222222",
    },
    text: {
        color: "#555555",
        fontSize: 14,
        fontWeight: '400'
    },
    textActive: {
        color: "#fff",
    }
})