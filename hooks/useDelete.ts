import {useCallback, useState} from "react";
import axios from "axios";

export const useDelete = <Error = { [prop: string]: any }>(
    endpoint: string,
) => {
    const [data, setData]
        = useState<Response | null>(null);
    const [isLoading, setIsLoading]
        = useState<boolean>(false);
    const [error, setError]
        = useState<Error | null>(null);

    const makeRequest = useCallback(async (id: string | number) => {
        setIsLoading(true);
        setError(null);
        const url = `${process.env.API_BASE_URL}${endpoint}/${id}`
        try {
            const response = await axios.delete(url);
            setData(response.data);
        } catch (err) {
            setError(err as Error);
        }
        setIsLoading(false);
    }, [endpoint]);

    return { makeRequest, data, isLoading, error };
}