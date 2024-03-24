import React from "react";
import {Text, View} from "react-native";
import {Link} from "expo-router";
import {colors, styles} from "@/styles/commonStyles";
import CustomButton from "@/components/CustomButton";
import {List, Sliders} from "react-native-feather";
import Main from '../assets/images/main.svg';


export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.mainMenu}>
                <Main width={350} height={350} style={{marginBottom: 20, marginTop: 20}}/>
                <CustomButton>
                    <View style={styles.row}>
                        <List color="white" height={16} width={16}/>
                        <Link
                            href="/dairy"
                            style={{color: colors.textPrimary}}
                        >
                            Дневник калорий
                        </Link>
                    </View>
                </CustomButton>
                <CustomButton>
                    <View style={styles.row}>
                        <Sliders color="white" height={16} width={16}/>
                        <Link
                            href="/bmi"
                            style={{color: colors.textPrimary}}
                        >
                            Калькулятор ИМТ
                        </Link>
                    </View>
                </CustomButton>
            </View>
        </View>
    );
}
