import { useState, useEffect } from "react";
import axios from "axios";



const useFetch = <Query, Response extends { [prop: string]: any }, Error> (
    endpoint: string,
    query: Query,
    isRapidApi: boolean = true,
    isFetchByDefault: boolean = true
) => {
    const [data, setData] = useState<Response | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const request: { method: string; url: string; params: Query; headers?: { [key: string]: string; }} = {
        method: "GET",
        url: isRapidApi
            ? `https://jsearch.p.rapidapi.com/${endpoint}`
            : `http://192.168.3.77:5000/${endpoint}`,
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
            console.log('response', response)

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

export default useFetch;