import { StyleSheet, Dimensions } from "react-native";

export const postCardStyles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 48,
        height: 250,
        borderRadius: 12,
        position: 'relative',
        marginBottom: 14,
        marginHorizontal: 24
    },

    //*Description
    descriptionContainer: {
        bottom: 14,
        left: 20,
        right: 20,
        position: 'absolute',
        maxWidth: '100%',
        zIndex: 2,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
        textShadowColor: 'rgba(0, 0, 0, .55)',
    },
    origin: {
        color: '#fff',
        fontSize: 14
    },  
    
    //*Tags
    tagsContainer: {
        zIndex: 2,
        position: 'absolute',
        top: 18,
        left: 20,
    },
    tagGroup: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 25,
    },
    tagIcon: {
        width: 14,
        height: 14,
        marginRight: 5
    },  
    tag: {
        color: '#222222',
        fontSize: 12
    },
    
    //*Banner
    bannerBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0, .2)',
        zIndex: 1
    },
    bannerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    }
});

export const detailPostCardStyles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 48,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 14,
        marginHorizontal: 24
    },
    bannerContainer: {
        width: 72,
        height: 72
    },
    banner: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        flex: 1,
        paddingTop: 6,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    title: {
        color: '#222222',
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        color: '#222222',
        fontSize: 12,
        marginTop: 8
    }
});