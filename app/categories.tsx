import {View, Text} from "react-native";
import {colors, styles} from "@/styles/commonStyles";
import React from "react";
import {DataTable, ProgressBar} from "react-native-paper";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import {useFetch} from "@/hooks/useFetch";
import {ICategoryList} from "@/types/category";
import {Plus, Trash2} from "react-native-feather";
import {useDelete} from "@/hooks/useDelete";
import {useSnackbar} from "@/hooks/useSnackbar";

export default function categories ()  {
    const {
        data,
        isLoading: isCategoriesLoading,
        error: categoriesError,
        refetch
    } = useFetch<
        null,
        ICategoryList
    >('categories', null)

    const {
        makeRequest: deleteCategory,
        isLoading: isDeleteLoading,
        error: deleteError
    } = useDelete('categories')

    const snackbar = useSnackbar(categoriesError)

    const handleDelete = (id: number) => {
        deleteCategory(id).then(() => refetch())
    }

    const isEmptyData = !data?.length && !isCategoriesLoading

    const isLoading = isCategoriesLoading || isDeleteLoading

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <CustomButton>
                    <View style={styles.row}>
                        <Plus color="white" height={16} width={16}/>
                        <Link
                            style={{color: colors.textPrimary}}
                            href="/addCategory"
                        >
                            Добавить категорию
                        </Link>
                    </View>
                </CustomButton>

                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Название</DataTable.Title>
                        <DataTable.Title>Описание</DataTable.Title>
                        <DataTable.Title>{''}</DataTable.Title>
                    </DataTable.Header>

                    {!isEmptyData && !isLoading && data?.map((item) => (
                        <DataTable.Row key={item.id}>
                            <DataTable.Cell>{item.name}</DataTable.Cell>
                            <DataTable.Cell>{item.description}</DataTable.Cell>
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

                    {isLoading && <ProgressBar indeterminate color={colors.primary} />}

                    {isEmptyData && (
                        <View style={styles.centeredContainer}>
                            <Text style={styles.title}>
                                Категорий нет
                            </Text>
                        </View>
                    )}
                </DataTable>
            </View>
            {snackbar}
        </View>
    );
}