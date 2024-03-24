import {View, Text} from "react-native";
import {colors, styles} from "@/styles/commonStyles";
import React, {useMemo, useState} from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {DataTable, ProgressBar} from "react-native-paper";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import {useFetch} from "@/hooks/useFetch";
import {Clock, List, Plus, Trash2} from "react-native-feather";
import {getFormattedDate} from "@/uitils/getFormattedDate";
import {ICategoryList} from "@/types/category";
import {useDelete} from "@/hooks/useDelete";
import {useSnackbar} from "@/hooks/useSnackbar";
import {DEFAULT_TOTAL_CONSUMPTION} from "@/constants";

export default function Dairy() {
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);

    const {
        data: consumptionList,
        isLoading: isConsumptionLoading,
        error: consumptionError,
        refetch: refetchConsumption
    } = useFetch<
        IConsumptionListRequest,
        IConsumptionListResponse
    >('consumptions', {date}, false)

    const {
        data: categoriesList,
        isLoading: isCategoriesLoading,
        error: categoriesError,
    } = useFetch<
        null,
        ICategoryList
    >('categories', null)

    const {
        makeRequest: deleteConsumption,
        isLoading: isDeleteLoading,
        error: deleteError
    } = useDelete('consumptions')

    const snackbar = useSnackbar(consumptionError)


    const handleDelete = (id: number) => {
        deleteConsumption(id).then(() => refetchConsumption())
    }

    const onChange = (event: DateTimePickerEvent,  date?: Date) => {
        setShow(false);
        if(date) {
            setDate(date);
            refetchConsumption({date})
        }
    };

    const handleShow = () => {
        setShow(true)
    }

    const getCategoryNameById = (id: number) => {
        const foundCategory = categoriesList?.find((category) => {
            return category.id === id
        })
        return foundCategory?.name ?? ''
    }

    const totalDayConsumption = useMemo(() => {
        return consumptionList?.reduce((result, consumption) => {
            return {
                ...result,
                calories: result.calories + consumption.calories,
                fat: result.fat + (consumption?.fat ?? 0),
                carbs: result.carbs + (consumption.carbs ?? 0),
                protein: result.protein + (consumption.protein ?? 0),
            }
        }, DEFAULT_TOTAL_CONSUMPTION) ?? DEFAULT_TOTAL_CONSUMPTION
    }, [consumptionList])

    const isEmptyData = !consumptionList?.length && !isConsumptionLoading

    const isLoading = isCategoriesLoading || isConsumptionLoading

    return (
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
                <View style={styles.row}>
                    <CustomButton>
                        <View style={styles.row}>
                            <Plus color="white" height={16} width={16}/>
                            <Link
                                href="/addConsumption"
                                style={{color: colors.textPrimary}}
                            >
                                Добавить запись
                            </Link>
                        </View>
                    </CustomButton>
                    <CustomButton>
                        <View style={styles.row}>
                            <List color="white" height={16} width={16}/>
                            <Link
                                href="/categories"
                                style={{color: colors.textPrimary}}
                            >
                                Категории
                            </Link>
                        </View>
                    </CustomButton>
                </View>


                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.wideCell}>Название</DataTable.Title>
                        <DataTable.Title>Калории</DataTable.Title>
                        <DataTable.Title>Белки</DataTable.Title>
                        <DataTable.Title>Жиры</DataTable.Title>
                        <DataTable.Title>Углеводы</DataTable.Title>
                        <DataTable.Title style={styles.wideCell}>Категория</DataTable.Title>
                        <DataTable.Title style={styles.deleteCell}>{''}</DataTable.Title>
                    </DataTable.Header>

                    {!isEmptyData && !isLoading && consumptionList?.map((item) => (
                        <DataTable.Row key={item.id}>
                            <DataTable.Cell style={styles.wideCell}>{item.name}</DataTable.Cell>
                            <DataTable.Cell>{item.calories}</DataTable.Cell>
                            <DataTable.Cell>{item.protein ?? 0}</DataTable.Cell>
                            <DataTable.Cell>{item.fat ?? 0}</DataTable.Cell>
                            <DataTable.Cell>{item.carbs ?? 0}</DataTable.Cell>
                            <DataTable.Cell style={styles.wideCell}>{getCategoryNameById(item.categoryId)}</DataTable.Cell>
                            <DataTable.Cell
                                numeric
                                style={styles.deleteCell}
                                onPress={() => handleDelete(item.id)}
                                disabled={isDeleteLoading}
                            >
                                <Trash2 color="red"/>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    {!isEmptyData && !isLoading && (
                        <DataTable.Row key={totalDayConsumption.id} style={styles.resultRow}>
                            <DataTable.Cell style={styles.wideCell}>{totalDayConsumption.name}</DataTable.Cell>
                            <DataTable.Cell>{totalDayConsumption.calories}</DataTable.Cell>
                            <DataTable.Cell>{totalDayConsumption.protein ?? 0}</DataTable.Cell>
                            <DataTable.Cell>{totalDayConsumption.fat ?? 0}</DataTable.Cell>
                            <DataTable.Cell>{totalDayConsumption.carbs ?? 0}</DataTable.Cell>
                            <DataTable.Cell style={styles.wideCell}>{''}</DataTable.Cell>
                            <DataTable.Cell style={styles.deleteCell}>{''}</DataTable.Cell>
                        </DataTable.Row>
                    )}

                    {isLoading && <ProgressBar indeterminate color={colors.primary} />}

                    {isEmptyData && (
                        <View style={styles.centeredContainer}>
                            <Text style={styles.title}>
                                Записей нет
                            </Text>
                        </View>
                    )}
                </DataTable>

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
    );
}