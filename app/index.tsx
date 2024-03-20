import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";
import {Button, RadioButton, Switch} from "react-native-paper";
import {Link} from "expo-router";
import {styles} from "@/styles/commonStyles";

export default function Home() {

    return (
        <View style={styles.container}>
            <Link href='/dairy'>Details</Link>
            <Link href='/bmi'>Калькулятор индекс массы тела</Link>
        </View>
    );
}
