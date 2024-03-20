import React, {FC} from 'react';
import {styles} from "@/styles/commonStyles";
import {Button} from "react-native-paper";
import {GestureResponderEvent} from "react-native";

interface ICustomButtonProps {
    children: React.ReactNode,
    onPress: ((e: GestureResponderEvent) => void)
}

const CustomButton: FC<ICustomButtonProps> = ({children, onPress}) => {
    return (
        <Button
            textColor={'rgb(255, 255, 255)'}
            style={styles.resultButton}
            onPress={onPress}
        >
            {children}
        </Button>
    );
};

export default CustomButton;