import {Dispatch} from "redux";
import {api} from "../api/api";
import {setAppStatus, setAppStatus2} from "./appReducer";
import {v1} from "uuid";
import exp from "constants";


const initState: initStateType = {
    categories: [],
    groups: [],
    productsList: [],
    product: null,
    manufacturer: [],
    marks: [],
    importers: [],
    countries: [],
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
        case "CHANGE-GROUP-TITLE":
            return {
                ...state,
                groups: state.groups.map(el => el.Ref_Key === action.id ? {
                    ...el,
                    Description: action.title
                } : el)
            }
        case "CHANGE-PRODUCT-TITLE":
            return {
                ...state,
                productsList: state.productsList.map(el => el.Ref_Key === action.id ? {
                    ...el,
                    Description: action.title
                } : el)
            }
        case "ADD-NEW-MANUFACTURER":
            return {...state, manufacturer: [...state.manufacturer, action.data]}
        case "ADD-NEW-COUNTRY":
            return {...state, countries: [...state.countries, action.data]}
        case "ADD-NEW-MARK":
            return {...state, marks: [...state.marks, action.data]}
        case "UPDATE-PRODUCT":
            return {
                ...state,
                productsList: state.productsList.map(el => el.Ref_Key === action.data.Ref_Key ? {
                    ...el,
                    Ref_Key: action.data.Ref_Key,
                    Description: action.data.Description,
                    НаименованиеПолное: action.data.НаименованиеПолное,
                    Артикул: action.data.Артикул,
                    Code: action.data.Code,
                    КодТНВЭД_Key: action.data.КодТНВЭД_Key,
                    Описание: action.data.Описание,
                    Производитель_Key: action.data.manufacturerKey,
                    СтранаПроисхождения_Key: action.data.countryKey,
                    ВидНоменклатуры_Key: action.data.groupKey,
                    Марка_Key: action.data.markKey
                } : el)
            }

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
export const addNewManufacturer = (data: any) => {
    return {type: 'ADD-NEW-MANUFACTURER', data} as const
}
export const addNewCountry = (data: any) => {
    return {type: 'ADD-NEW-COUNTRY', data} as const
}
export const addNewMark = (data: any) => {
    return {type: 'ADD-NEW-MARK', data} as const
}
export const updateProduct = (data: any) => {
    return {type: 'UPDATE-PRODUCT', data} as const
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
export const changeGroupTitle = (title: string, id: string) => {
    return {type: 'CHANGE-GROUP-TITLE', title, id} as const
}
export const changeProductTitle = (title: string, id: string) => {
    return {type: 'CHANGE-PRODUCT-TITLE', title, id} as const
}


export const baseDataLoading = () => (dispatch: Dispatch) => {
    const categoriesPromise = api.getCategories()
    const groupsPromise = api.getGroups()

    Promise.all([categoriesPromise, groupsPromise])
        .then(([categoriesPromise, groupsPromise]) => {
            dispatch(addCategoriesToState(categoriesPromise.data.value))
            dispatch(addGroupsToState(groupsPromise.data.value))
            dispatch(setAppStatus('idle'))
        }).catch(() => {
        console.log('error')
    })
}
export const fetchProducts = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
    api.getProducts(Ref_Key).then(res => {
        dispatch(addProductsListToState(res.data.value))
    })
}

export const fetchProduct = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
    dispatch(setAppStatus2('loading'))
    const product = api.getProduct(Ref_Key)
    const manufacturers = api.getManufacturer()
    const marks = api.getMarks()
    const importers = api.getImporters()
    const countries = api.getCountries()

    Promise.all([product, manufacturers, marks, importers, countries])
        .then(([product, manufacturers, marks, importers, countries]) => {
            dispatch(addProductToState(product.data))
            dispatch(addManufacturerToState(manufacturers.data.value))
            dispatch(addImportersToState(importers.data.value))
            dispatch(addMarksToState(marks.data.value))
            dispatch(addCountriesToState(countries.data.value))
            dispatch(setAppStatus2('idle'))
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
    product: any | null,
    manufacturer: any[],
    marks: any[],
    importers: any[],
    countries: any[],

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
    | ReturnType<typeof changeGroupTitle>
    | ReturnType<typeof changeProductTitle>
    | ReturnType<typeof addNewManufacturer>
    | ReturnType<typeof updateProduct>
    | ReturnType<typeof addNewCountry>
    | ReturnType<typeof addNewMark>

