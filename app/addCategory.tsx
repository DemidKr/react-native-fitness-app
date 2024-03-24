import React, {useEffect, useState} from 'react';
import {colors, styles} from "@/styles/commonStyles";
import {Text, TextInput, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {usePost} from "@/hooks/usePost";
import {ICreateCategoryRequest} from "@/types/category";
import {router} from "expo-router";
import {ProgressBar} from "react-native-paper";
import {useSnackbar} from "@/hooks/useSnackbar";

const AddCategory = () => {
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { makeRequest, data, isLoading, error} = usePost<ICreateCategoryRequest, unknown>('categories')

    const snackbar = useSnackbar(error)

    const handleCategoryChange = (text: string) => {
        setCategory(text);
    };

    const handleDescriptionChange = (text: string) => {
        setDescription(text);
    };

    const handleAddCategoryClick = () => {
        makeRequest({
            name: category,
            description,
        })
    }

    useEffect(() => {
        if(data) {
            router.replace('/categories');
        }
    }, [data])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Название</Text>
                <TextInput
                    value={category}
                    style={styles.searchInput}
                    onChangeText={handleCategoryChange}
                    placeholder="Введите название"
                />

                <Text style={styles.label}>Описание (опционально)</Text>
                <TextInput
                    value={description}
                    style={styles.searchInput}
                    onChangeText={handleDescriptionChange}
                    placeholder="Введите описание"
                />

                <CustomButton
                    onPress={handleAddCategoryClick}
                    disabled={isLoading || !category}
                >
                    Подтвердить
                </CustomButton>

                {isLoading && (
                    <ProgressBar indeterminate color={colors.primary} />
                )}

                {snackbar}
            </View>
        </View>
    );
};

export default AddCategory;