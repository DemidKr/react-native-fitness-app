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
    // TODO: change to category
    categoryId: number,
}

type IConsumptionListResponse = Array<IConsumptionResponse>