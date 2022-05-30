import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 86,
        paddingTop: 26,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    }
});

export const backActionStyles = StyleSheet.create({
    container: {
    }
});

export const contentStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 28
    }
});

export const actionStyles = StyleSheet.create({
    container: {
        marginLeft: 24,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});