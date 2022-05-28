import { StyleSheet } from "react-native";

export const listTilesStyles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        marginBottom: 12
    },
    iconContainer: {
        width: 46,
        height: 46,
        backgroundColor: "#eaeaea",
        borderRadius: 23,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    icon: {
        fontSize: 18,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    contentTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222222'
    },
    subTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(0,0,0,.5)'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16
    }
});