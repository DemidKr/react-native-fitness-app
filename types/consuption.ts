interface IConsumptionListRequest {
    date: Date,
}

interface IConsumptionResponse {
    id: number,
    name: string,
    date: Date,
    calories: number,
    fat: number | null,
    carbs: number | null,
    protein: number | null,
    categoryId: number,
}

interface ICreateConsumptionRequest {
    name: string,
    date: Date,
    calories: number,
    fat?: number,
    carbs?: number,
    protein?: number,
    categoryId: number,
}

type IConsumptionListResponse = Array<IConsumptionResponse>