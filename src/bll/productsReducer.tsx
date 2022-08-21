import {v1} from "uuid";
import {DATA_STATE} from "./Data";


const initState: initStateType = DATA_STATE
export const productsReducer = (state: initStateType = initState, action: ActionsType): initStateType => {
    switch (action.type) {
        case "ADD-SECTION": {
            const newSection = {id: action.id, name: action.title, categories: []}
            return [...state, newSection]
        }
        case "ADD-CATEGORY": {
            /*   const copyState = state
               const newCategory = {id: action.id, name: action.title, list: []}
               const index = copyState.findIndex(i => i.id === action.sectionId)
               if (index > -1) copyState[index].categories.push(newCategory)
               return copyState*/
            const newCategory = {id: action.id, name: action.title, list: []}
            const index = state.findIndex(i => i.id === action.sectionId)
            const copy = state
            copy[index].categories.push(newCategory)
            return copy
        }


        default:
            return state
    }
}

export const addSection = (title: string) => {
    return {type: 'ADD-SECTION', id: v1(), title} as const
}
export const addCategory = (title: string, sectionId: string) => {
    return {type: 'ADD-CATEGORY', id: v1(), title, sectionId} as const
}

export type FieldsType = {}

export type ProductType = {
    id: string
    name: string
    fields: any[]
}
export type CategoryType = {
    id: string
    name: string
    list: ProductType[]
}
export type ProductsType = {
    id: string
    name: string
    categories: CategoryType[]
}
export type initStateType = ProductsType[]
export type ActionsType =
    ReturnType<typeof addSection> |
    ReturnType<typeof addCategory>
