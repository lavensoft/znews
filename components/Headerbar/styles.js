import { StyleSheet, Dimensions } from "react-native";

export const headerbarStyles = StyleSheet.create({
    container: {
        paddingTop: 44,
        height: 65,
        backgroundColor: '#fff',
        //borderBottomColor: "#eaeaea",
        //borderBottomWidth: 1
    },
    title: {
        color: '#222222',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    }
});

export const searchHeaderStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    }
});