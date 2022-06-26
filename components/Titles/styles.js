import { StyleSheet, Dimensions } from "react-native";

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
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        display: 'flex',
        flexDirection: 'row'
    },
    titleContainer: {
        flex: 1
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '600',
        opacity: .75
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: "#222222",
        marginTop: 3
    },
    description: {
        fontSize: 12,
        fontWeight: '600',
        opacity: .3,
        marginTop: 4
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actionBtn: {
        width: 26,
        height: 26,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 50,
    },
    actionBtnIcon: {
        fontSize: 16,
    }
});

export const blankTitleStyles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        height: Dimensions.get('window').height - 186,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        color: 'rgba(0,0,0, .25)',
        fontWeight: 'bold'
    }
})