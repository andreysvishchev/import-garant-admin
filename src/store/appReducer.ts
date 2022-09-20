const initState: InitStateType = {
    appStatus: 'loading' as AppStatusType,
    productPageStatus: 'loading' as AppStatusType,
    groupPageStatus: 'loading' as AppStatusType,
    buttonStatus: 'idle' as AppStatusType
}
export const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "CHANGE-APP-STATUS":
            return {...state, appStatus: action.status}
        case "CHANGE-PRODUCT-PAGE-STATUS":
            return {...state, productPageStatus: action.status}
        case "CHANGE-GROUP-PAGE-STATUS":
            return {...state, groupPageStatus: action.status}
        case "CHANGE-BUTTON-STATUS":
            return  {...state, buttonStatus: action.status}
        default:
            return state
    }
}

export const setAppStatus = (status: AppStatusType) => {
    return {type: 'CHANGE-APP-STATUS', status} as const
}
export const setProductPageStatus = (status: AppStatusType) => {
    return {type: 'CHANGE-PRODUCT-PAGE-STATUS', status} as const
}
export const setGroupPageStatus = (status: AppStatusType) => {
    return {type: 'CHANGE-GROUP-PAGE-STATUS', status} as const
}
export const setButtonStatus = (status: AppStatusType) => {
    return {type: 'CHANGE-BUTTON-STATUS', status} as const
}

type InitStateType = {
    appStatus: AppStatusType
    productPageStatus: AppStatusType
    groupPageStatus: AppStatusType
    buttonStatus: AppStatusType
}
type ActionsType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setProductPageStatus>
    | ReturnType<typeof setGroupPageStatus>
    | ReturnType<typeof setButtonStatus>
export type AppStatusType = 'idle' | 'loading'


