interface IBmiRequest {
    age: number,
    weight: number,
    height: number
}

interface IBmiResponse {
    status_code: number,
    request_result: string
    data: {
        bmi: number,
        health: string,
        healthy_bmi_range: string
    }
}