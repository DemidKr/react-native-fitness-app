import React, {useEffect, useState} from 'react';
import {colors, styles} from "@/styles/commonStyles";
import {View, Text, TextInput, ScrollView} from "react-native";
import CustomButton from "@/components/CustomButton";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useFetch} from "@/hooks/useFetch";
import {ICategoryList} from "@/types/category";
import {getFormattedDate} from "@/uitils/getFormattedDate";
import {Clock} from "react-native-feather";
import {List, ProgressBar} from 'react-native-paper';
import {usePost} from "@/hooks/usePost";
import {router} from "expo-router";
import {useSnackbar} from "@/hooks/useSnackbar";

const AddConsumption = () => {
    const [name, setName] = useState<string>('')
    const [calories, setCalories] = useState<number>(0)
    const [carbs, setCarbs] = useState<number>(0)
    const [protein, setProtein] = useState<number>(0)
    const [fat, setFat] = useState<number>(0)
    const [categoryId, setCategoryId] = useState<number>(0)
    const [date, setDate] = useState<Date>(new Date(Date.now()));
    const [show, setShow] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const {
        data: categoriesList,
        isLoading: isCategoriesLoading,
        error: categoriesError,
    } = useFetch<
        null,
        ICategoryList
    >('categories', null)

    const {
        makeRequest,
        data,
        isLoading,
        error
    } = usePost<ICreateConsumptionRequest, unknown>('consumptions')

    const snackbar = useSnackbar(error)


    const onChange = (event: DateTimePickerEvent,  date?: Date) => {
        setShow(false);
        if(date) {
            setDate(date);
        }
    };

    const handleExpand = () => setIsExpanded(!isExpanded);

    const handleNameChange = (text: string) => setName(text)

    const handleCaloriesChange = (text: string) => {
        setCalories(parseInt(text.replace(/[^0-9]/g, '')));
        setCarbs(0)
        setProtein(0)
        setFat(0)
    };

    const handleCarbsChange = (text: string) => {
        const carbsInput = parseInt(text.replace(/[^0-9]/g, ''))
        setCarbs(carbsInput);
        setCalories(carbsInput * 4 + protein * 4 + fat * 9)
    };

    const handleProteinChange = (text: string) => {
        const proteinInput = parseInt(text.replace(/[^0-9]/g, ''))
        setProtein(proteinInput);
        setCalories(carbs * 4 + proteinInput * 4 + fat * 9)
    };

    const handleFatChange = (text: string) => {
        const fatInput = parseInt(text.replace(/[^0-9]/g, ''))
        setFat(fatInput);
        setCalories(carbs * 4 + protein * 4 + fatInput * 9)
    };

    const handleCategoryChange = (id: number) => setCategoryId(id)

    const getIsChecked = (id: number): boolean => id === categoryId


    const handleShow = () => {
        setShow(true)
    }

    const handleAddConsumption = () => {
        makeRequest({
            name,
            calories,
            date,
            carbs,
            fat,
            protein,
            categoryId
        })
    }

    const isEmptyData = !categoriesList && !isCategoriesLoading

    const isSubmitButtonDisabled = !name || !calories || !date || !categoryId

    useEffect(() => {
        if(data) {
            router.replace('/dairy');
        }
    }, [data])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Выбранная дата: {getFormattedDate(date)}
                    </Text>
                    <CustomButton onPress={handleShow}>
                        <View style={styles.row}>
                            <Clock color="white" height={16} width={16}/>
                            <Text style={{color: colors.textPrimary}}>
                                Выбрать дату
                            </Text>
                        </View>
                    </CustomButton>

                    <Text style={styles.label}>Название</Text>
                    <TextInput
                        defaultValue=''
                        style={styles.searchInput}
                        onChangeText={handleNameChange}
                        placeholder="Введите название"
                    />

                    <Text style={styles.title}>
                        Введите калории вручную, или заполните БЖУ и калории рассчитаются автоматически
                    </Text>

                    <Text style={styles.label}>Калории</Text>
                    <TextInput
                        value={calories.toString()}
                        style={styles.searchInput}
                        onChangeText={handleCaloriesChange}
                        keyboardType='numeric'
                        placeholder="Введите калории"
                    />

                    <Text style={styles.label}>Углеводы</Text>
                    <TextInput
                        value={carbs.toString()}
                        style={styles.searchInput}
                        onChangeText={handleCarbsChange}
                        keyboardType='numeric'
                        placeholder="Введите углеводы, г"
                    />

                    <Text style={styles.label}>Белки</Text>
                    <TextInput
                        value={protein.toString()}
                        style={styles.searchInput}
                        onChangeText={handleProteinChange}
                        keyboardType='numeric'
                        placeholder="Введите белок, г"
                    />

                    <Text style={styles.label}>Жиры</Text>
                    <TextInput
                        value={fat.toString()}
                        style={styles.searchInput}
                        onChangeText={handleFatChange}
                        keyboardType='numeric'
                        placeholder="Введите жиры, г"
                    />

                    <List.Section style={{width: 200}}>
                        <List.Accordion
                            title="Категория"
                            style={styles.select}
                            titleStyle={styles.selectTitle}
                            expanded={isExpanded}
                            onPress={handleExpand}
                        >
                            {categoriesList?.map((item) => {
                                return <List.Item
                                    key={item.id}
                                    title={item.name}
                                    onPress={() => handleCategoryChange(item.id)}
                                    right={props =>
                                        getIsChecked(item.id) && <List.Icon {...props} icon="check" />
                                    }
                                />
                            })}
                        </List.Accordion>
                    </List.Section>

                    <CustomButton onPress={handleAddConsumption} disabled={isSubmitButtonDisabled}>
                        Подтвердить
                    </CustomButton>

                    {isLoading && (
                        <ProgressBar indeterminate color={colors.primary} />
                    )}

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </View>

                {snackbar}
            </View>
        </ScrollView>
    );
};

export default AddConsumption;