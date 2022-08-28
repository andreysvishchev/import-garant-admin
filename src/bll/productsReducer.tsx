import {v1} from "uuid";
import {DATA_STATE} from "./Data";
import {Dispatch} from "redux";
import {api} from "../api/api";
import {log} from "util";


const initState: initStateType = {
    categories: [],
    groups: [],
    productsList: []

}
export const productsReducer = (state: initStateType = initState, action: ActionsType): initStateType => {
    switch (action.type) {
        case "ADD-PRODUCTS":
            return {...state, categories: action.data}
        case "ADD-GROUPS":
            return {...state, groups: action.data}
        case "ADD-PRODUCTS-LIST":
            return {...state, productsList: action.data}
        default:
            return state
    }


}

export const addCategoriesToState = (data: any[]) => {
    return {type: 'ADD-PRODUCTS', data} as const
}
export const addGroupsToState = (data: any[]) => {
    return {type: 'ADD-GROUPS', data} as const
}
export const addProductsListToState = (data: any[]) => {
    return {type: 'ADD-PRODUCTS-LIST', data} as const
}

export const fetchCategories = () => (dispatch: Dispatch) => {
    api.getCategories().then(res => {
        dispatch(addCategoriesToState(res.data.value))
    })
}
export const fetchGroups = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
    api.getGroups().then(res => {
        const groups = res.data.value.filter((el: { Parent_Key: any; }) => el.Parent_Key === Ref_Key)
        dispatch(addGroupsToState(groups))
    })
}
export const fetchProducts = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
    api.getProducts().then(res => {
        const products = res.data.value.filter((el: { ВидНоменклатуры_Key: string | undefined; }) => el.ВидНоменклатуры_Key === Ref_Key)
        dispatch(addProductsListToState(products))
    })
}


export type initStateType = {
    categories: any[]
    groups: any[]
    productsList: any []
}
export type ActionsType =
    | ReturnType<typeof addCategoriesToState>
    | ReturnType<typeof addGroupsToState>
    | ReturnType<typeof addProductsListToState>