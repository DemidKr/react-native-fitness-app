import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
    },
    content: {
        display: "flex",
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    searchInput: {
        width: "100%",
        height: 30,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    label: {
        fontSize: 12,
        fontWeight: '400',
    },
    radioButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginLeft: -8
    },
    resultButton: {
        backgroundColor: 'rgb(0, 122, 255)',
        marginBottom: 10
    },
    switch: {
        color: 'rgb(0, 122, 255)',
        marginBottom: 10
    }
});