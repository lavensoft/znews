import { StyleSheet } from "react-native";

export const storyAvatarStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        marginRight: 16,
    },
    avatarContainer: {
        width: 64,
        height: 64,
        backgroundColor: "#000",
        borderRadius: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    avatarContainerViewed: {
        backgroundColor: "#eaeaea",
    },  
    avatar: {
        width: 58,
        height: 58,
        backgroundColor: "#ffffff",
        borderRadius: 29,
        borderColor: "#fff",
        borderWidth: 2,
        borderStyle: "solid",
        boxSizing: "border-box"
    },
    img: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 13
    }
});