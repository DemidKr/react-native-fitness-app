import {Snackbar} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {Text} from "react-native";
import {colors} from "@/styles/commonStyles";


export const useSnackbar = (errorContent?: { [prop: string]: any } | null) => {
    const [isError, setIsError]
        = useState<boolean>(false)

    const onDismissSnackBar = () => setIsError(false);

    useEffect(() => {
        if(errorContent) {
            setIsError(!isError)
        }
    }, [errorContent]);

    return (
        <Snackbar
            visible={isError}
            onDismiss={onDismissSnackBar}
            duration={3000}
        >
            <Text style={{color: colors.textPrimary}}>
                Ошибка: {errorContent?.error ?? errorContent?.message}
            </Text>
        </Snackbar>
    )
}