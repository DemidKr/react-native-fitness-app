export interface ICreateCategoryRequest {
    name: string,
    description?: string
}

export interface ICategory {
    id: number
    name: string,
    description?: string
}

export type ICategoryList = Array<ICategory>