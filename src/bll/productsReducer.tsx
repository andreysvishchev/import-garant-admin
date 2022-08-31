import {v1} from "uuid";
import {DATA_STATE} from "./Data";
import {Dispatch} from "redux";
import {api} from "../api/api";
import {log} from "util";
import {setAppStatus} from "./appReducer";


const initState: initStateType = {
    categories: [],
    groups: [],
    productsList: [],
    product: {},
    manufacturer: [],
    marks: [],
    importers: [],
    countries: []


}
export const productsReducer = (state: initStateType = initState, action: ActionsType): initStateType => {
    switch (action.type) {
        case "ADD-PRODUCTS":
            return {...state, categories: action.data}
        case "ADD-GROUPS":
            return {...state, groups: action.data}
        case "ADD-PRODUCTS-LIST":
            return {...state, productsList: action.data}
        case "ADD-PRODUCT":
            return {...state, product: action.data}
        case "ADD-MANUFACTURER":
            return {...state, manufacturer: action.data}
        case "ADD-MARKS":
            return {...state, marks: action.data}
        case "ADD-COUNTRIES":
            return {...state, countries: action.data}
        case "ADD-IMPORTERS":
            return {...state, importers: action.data}
        case "ADD-NEW-CATEGORY":
            return {...state, categories: [...state.categories, action.data]}
        case "ADD-NEW-GROUP":
            return {...state, groups: [...state.groups, action.data]}
        default:
            return state
    }
}

export const addNewCategory = (data: any) => {
    return {type: 'ADD-NEW-CATEGORY', data} as const
}
export const addNewGroup = (data: any) => {
    return {type: 'ADD-NEW-GROUP', data} as const
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
export const addProductToState = (data: any) => {
    return {type: 'ADD-PRODUCT', data} as const
}
export const addManufacturerToState = (data: any) => {
    return {type: 'ADD-MANUFACTURER', data} as const
}
export const addMarksToState = (data: any) => {
    return {type: 'ADD-MARKS', data} as const
}
export const addImportersToState = (data: any) => {
    return {type: 'ADD-IMPORTERS', data} as const
}
export const addCountriesToState = (data: any) => {
    return {type: 'ADD-COUNTRIES', data} as const
}


export const fetchCategories = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    api.getCategories().then(res => {
        dispatch(setAppStatus('idle'))
        dispatch(addCategoriesToState(res.data.value))
    })
}
export const fetchGroups = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    api.getGroups(Ref_Key).then(res => {
        dispatch(setAppStatus('idle'))
        dispatch(addGroupsToState(res.data.value))
    })
}
export const fetchProducts = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
    api.getProducts(Ref_Key).then(res => {
        dispatch(addProductsListToState(res.data.value))
    })
}
export const fetchProduct = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
    api.getProduct(Ref_Key).then(res => {
        dispatch(addProductToState(res.data))
    })
}
export const fetchManufacturer = () => (dispatch: Dispatch) => {
    api.getManufacturer().then(res => {
        dispatch(addManufacturerToState(res.data.value))
    })
}
export const fetchMarks = () => (dispatch: Dispatch) => {
    api.getMarks().then(res => {
        dispatch(addMarksToState(res.data.value))
    })
}
export const fetchImporters = () => (dispatch: Dispatch) => {
    api.getImporters().then(res => {
        dispatch(addImportersToState(res.data.value))
    })
}
export const fetchCountries = () => (dispatch: Dispatch) => {
    api.getCountries().then(res => {
        dispatch(addCountriesToState(res.data.value))
    })
}


export type initStateType = {
    categories: any[]
    groups: any[]
    productsList: any [],
    product: any,
    manufacturer: any[],
    marks: any[],
    importers: any[],
    countries: any[]
}
export type ActionsType =
    | ReturnType<typeof addCategoriesToState>
    | ReturnType<typeof addGroupsToState>
    | ReturnType<typeof addProductsListToState>
    | ReturnType<typeof addProductToState>
    | ReturnType<typeof addManufacturerToState>
    | ReturnType<typeof addMarksToState>
    | ReturnType<typeof addImportersToState>
    | ReturnType<typeof addCountriesToState>
    | ReturnType<typeof addNewCategory>
    | ReturnType<typeof addNewGroup>