import {StyleSheet} from "react-native";

export const colors = {
    primary: 'rgb(0, 122, 255)',
    disabledPrimary: 'rgba(0, 122, 255, 0.4)',
    textPrimary: 'rgb(255, 255, 255)',
    textSecondary: 'rgb(0,0,0)',
    background: 'rgb(240,240,240)',
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 8,
    },
    content: {
        display: "flex",
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10
    },
    searchInput: {
        width: "100%",
        height: 30,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    centeredContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10
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
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: colors.disabledPrimary,
        borderRadius: 8,
    },
    switch: {
        color: colors.primary,
        // marginBottom: 10
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    wideCell: {
        flex: 2
    },
    deleteCell: {
        flex: 0.5
    },
    select: {
        backgroundColor: colors.background,
        padding: 0,
        marginLeft: -16,
        minWidth: 50,
    },
    selectTitle: {
        backgroundColor: colors.background,
        padding: 0,
        color: colors.textSecondary
    }
});