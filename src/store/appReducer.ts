const initState: InitStateType = {
    appStatus: 'loading' as AppStatusType,
    productPageStatus: 'loading' as ProductPageStatusType,
    groupPageStatus: 'loading' as GroupPageStatusType
}
export const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "CHANGE-APP-STATUS":
            return {...state, appStatus: action.status}
        case "CHANGE-PRODUCT-PAGE-STATUS":
            return {...state, productPageStatus: action.status}
        case "CHANGE-GROUP-PAGE-STATUS":
            return {...state, groupPageStatus: action.status}
        default:
            return state
    }
}

export const setAppStatus = (status: AppStatusType) => {
    return {type: 'CHANGE-APP-STATUS', status} as const
}
export const setProductPageStatus = (status: ProductPageStatusType) => {
    return {type: 'CHANGE-PRODUCT-PAGE-STATUS', status} as const
}
export const setGroupPageStatus = (status: GroupPageStatusType) => {
    return {type: 'CHANGE-GROUP-PAGE-STATUS', status} as const
}

type InitStateType = {
    appStatus: AppStatusType
    productPageStatus: ProductPageStatusType
    groupPageStatus: GroupPageStatusType
}
type ActionsType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setProductPageStatus>
    | ReturnType<typeof setGroupPageStatus>
export type AppStatusType = 'idle' | 'loading'
export type ProductPageStatusType = 'idle' | 'loading'
export type GroupPageStatusType = 'idle' | 'loading'

