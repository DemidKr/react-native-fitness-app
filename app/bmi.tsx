import React, {useState} from "react";
import {Text, TextInput, View} from "react-native";
import {styles} from "@/styles/commonStyles";
import CustomButton from "@/components/CustomButton";
import {useFetch} from "@/hooks/useFetch";

export default function BMI() {
    const [gender, setGender] = useState<string>('male');
    const [weight, setWeight] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [age, setAge] = useState<number>(0)
    const [isPhysical, setIsPhysical] = useState<boolean>(false)
    const [result, setResult] = useState<number | null>(null)

    const { data: response, isLoading, error, refetch }
        = useFetch<IBmiRequest, IBmiResponse, Array<string>>('bmi', {weight, age, height}, true,false)

    const handleWeightChange = (text: string) => {
        setWeight(parseInt(text.replace(/[^0-9]/g, '')));
    };

    const handleHeightChange = (text: string) => {
        setHeight(parseInt(text.replace(/[^0-9]/g, '')));
    };

    const handleAgeChange = (text: string) => {
        setAge(parseInt(text.replace(/[^0-9]/g, '')));
    };

    const handleIsPhysicalChange = (value: boolean) => {
        setIsPhysical(value)
    };

    const handleResultButtonClick = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/*1 radio button*/}
                {/*<Text style={styles.label}>Выберите пол</Text>*/}
                {/*<View style={styles.radioButtonWrapper}>*/}
                {/*    <RadioButton*/}
                {/*        value="male"*/}
                {/*        color='rgb(0, 122, 255)'*/}
                {/*        status={ gender === 'male' ? 'checked' : 'unchecked' }*/}
                {/*        onPress={() => setGender('male')}*/}
                {/*    />*/}
                {/*    <Text style={styles.label}>Мужской</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.radioButtonWrapper}>*/}
                {/*    <RadioButton*/}
                {/*        value="female"*/}
                {/*        color='rgb(0, 122, 255)'*/}
                {/*        status={ gender === 'female' ? 'checked' : 'unchecked' }*/}
                {/*        onPress={() => setGender('female')}*/}
                {/*    />*/}
                {/*    <Text style={styles.label}>Женский</Text>*/}
                {/*</View>*/}


                {/* 2 input*/}
                <Text style={styles.label}>Вес</Text>
                <TextInput
                    defaultValue=''
                    style={styles.searchInput}
                    onChangeText={handleWeightChange}
                    keyboardType='numeric'
                    placeholder="Введите ваш вес, кг"
                />

                {/*2 input*/}
                <Text style={styles.label}>Рост</Text>
                <TextInput
                    defaultValue=''
                    style={styles.searchInput}
                    onChangeText={handleHeightChange}
                    keyboardType='numeric'
                    placeholder="Введите ваш рост, см"
                />

                {/*2 input*/}
                <Text style={styles.label}>Возраст</Text>
                <TextInput
                    defaultValue=''
                    style={styles.searchInput}
                    onChangeText={handleAgeChange}
                    keyboardType='numeric'
                    placeholder="Введите ваш возраст"
                />

                {/*3 switch*/}
                {/*<Text style={styles.label}>Физическая активность</Text>*/}
                {/*<Switch*/}
                {/*    color={'rgb(0, 122, 255)'}*/}
                {/*    style={styles.switch}*/}
                {/*    value={isPhysical}*/}
                {/*    onValueChange={handleIsPhysicalChange}*/}
                {/*/>*/}

                <CustomButton onPress={() => refetch()}>
                    Рассчитать
                </CustomButton>

                {response?.data && (
                    <>
                        <Text style={styles.title}>Ваш индекс тела: {response?.data.bmi}</Text>
                        <Text style={styles.title}>Состояние здоровья: {response?.data.health}</Text>
                    </>
                )}

            </View>
        </View>
    );
}