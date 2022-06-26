import { StyleSheet } from "react-native";

export const articlesGroupStyles = StyleSheet.create({
    container: {
        marginBottom: 28
    },
});

export const sectionBreakStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 48
    },
    icon: {
        color: "#007bff",
        fontSize: 26,
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: "#222222",
        marginBottom: 5
    },
    description: {
        fontSize: 13,
        fontWeight: '600',
        opacity: .3,
    }
});