import {useCallback, useState} from "react";
import axios from "axios";

export const usePost = <Query, Response, Error = { [prop: string]: any }>(
    endpoint: string
) => {
    const [data, setData]
        = useState<Response | null>(null);
    const [isLoading, setIsLoading]
        = useState<boolean>(false);
    const [error, setError]
        = useState<Error | null>(null);

    const makeRequest = useCallback(async (requestData: Query) => {
        setIsLoading(true);
        setError(null);
        const url = process.env.API_BASE_URL + endpoint
        try {
            const response = await axios.post(url, requestData);
            setData(response.data);
        } catch (err) {
            setError(err as Error);
        }
        setIsLoading(false);
    }, [endpoint]);

    return { makeRequest, data, isLoading, error };
}