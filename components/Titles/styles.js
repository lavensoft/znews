import { StyleSheet } from "react-native";

export const screenTitleStyles = StyleSheet.create({
    container: {
        maxWidth: '60%',
        marginBottom: 32,
        marginTop: 32,
        marginHorizontal: 24
    },
    date: {
        fontSize: 15,
        fontWeight: '600',
        opacity: .75
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 6,
        color: "#222222"
    }
});

export const sectionTitleStyles = StyleSheet.create({
    container: {
        maxWidth: '60%',
        marginBottom: 16,
        marginTop: 16,
        marginHorizontal: 24
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 6,
        color: "#222222"
    }
});