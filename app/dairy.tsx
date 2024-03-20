import {View, Text} from "react-native";
import {styles} from "@/styles/commonStyles";
import React, {useState} from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {Button, DataTable} from "react-native-paper";
import CustomButton from "@/components/CustomButton";
import dayjs from "dayjs";
import useFetch from "@/hooks/useFetch";

export default function Dairy() {
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);

    const { data, isLoading, error, refetch }
        = useFetch<
        IConsumptionListRequest,
        IConsumptionListResponse,
        Array<string>
    >('consumptions', {date}, false)
    console.log('data', data)

    const onChange = (event: DateTimePickerEvent,  date?: Date) => {
        setShow(false);
        if(date) {
            setDate(date);
            refetch({date})
        }
    };

    const handleShow = () => {
        setShow(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Выбранная дата: {dayjs(date).format('DD.MM.YYYY')}
                </Text>
                <CustomButton onPress={handleShow}>
                    Выбрать дату
                </CustomButton>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}

                {data && (
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Название</DataTable.Title>
                            <DataTable.Title numeric>Калории</DataTable.Title>
                            <DataTable.Title numeric>Белки</DataTable.Title>
                            <DataTable.Title numeric>Жиры</DataTable.Title>
                            <DataTable.Title numeric>Углеводы</DataTable.Title>
                            <DataTable.Title numeric>Категория</DataTable.Title>
                        </DataTable.Header>

                        {data.map((item) => (
                            <DataTable.Row key={item.id}>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.protein ?? 0}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.fat ?? 0}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.carbs ?? 0}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.categoryId}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                )}


            </View>
        </View>
    );
}