import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = <Query, Response extends { [prop: string]: any }, Error = { [prop: string]: any }> (
    endpoint: string,
    query: Query,
    isRapidApi: boolean = false,
    isFetchByDefault: boolean = true
) => {
    const [data, setData]
        = useState<Response | null>(null);
    const [isLoading, setIsLoading]
        = useState(false);
    const [error, setError]
        = useState<Error | null>(null);

    const request: { method: string; url: string; params: Query; headers?: { [key: string]: string; }} = {
        method: "GET",
        url: isRapidApi
            ? `https://jsearch.p.rapidapi.com/${endpoint}`
            : process.env.API_BASE_URL + endpoint,
        params: { ...query },
    };

    if(isRapidApi) {
        request.headers = {
            'X-RapidAPI-Key': '713bcabd2amshf3ea4bf31ca0e5ap1a0cdfjsn32d724933827',
            'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
    }

    const fetchData = async (query?: Query) => {
        setIsLoading(true);

        if(query) {
            request.params = {...query}
        }

        try {
            const response = await axios.request(request);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error as Error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(isFetchByDefault) {
            fetchData();
        }
    }, []);

    const refetch = (query?: Query) => {
        setIsLoading(true);
        fetchData(query);
    };

    return { data, isLoading, error, refetch };
};