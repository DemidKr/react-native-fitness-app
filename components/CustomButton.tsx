import React, {FC} from 'react';
import {colors, styles} from "@/styles/commonStyles";
import {Button} from "react-native-paper";
import {GestureResponderEvent} from "react-native";

interface ICustomButtonProps {
    children: React.ReactNode,
    onPress?: ((e: GestureResponderEvent) => void),
    disabled?: boolean
}

const CustomButton: FC<ICustomButtonProps> = ({children, onPress, disabled}) => {
    return (
        <Button
            textColor={colors.textPrimary}
            style={disabled ? styles.disabledButton : styles.resultButton}
            onPress={onPress}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default CustomButton;