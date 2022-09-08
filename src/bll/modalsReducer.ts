const initState = {
    category: false,
    group: false,
    countries: false,
    newCountry: false,
    edit: {
        status: false,
        id: '',
        title: '',
        caption: '',
        param: ''

    },
    manufacturers: false,
    newManufacturer: false,
    marks: false,
    newMark: false,
    productType: false

}
export const modalsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "MODAL/CATEGORY":
            return {...state, category: action.status}
        case "MODAL/GROUP":
            return {...state, group: action.status}
        case "MODAL/COUNTRIES":
            return {...state, countries: action.status}
        case "MODAL/NEW-COUNTRY":
            return {...state, newCountry: action.status}
        case "MODAL/EDIT":
            return {
                ...state,
                edit: {
                    status: action.status,
                    id: action.id,
                    title: action.title,
                    caption: action.caption,
                    param: action.param
                }
            }
        case "MODAL/MANUFACTURERS":
            return {...state, manufacturers: action.status}
        case "MODAL/NEW-MANUFACTURER":
            return {...state, newManufacturer: action.status}
        case "MODAL/MARKS":
            return {...state, marks: action.status}
        case "MODAL/NEW-MARK":
            return {...state, newMark: action.status}
        case "MODAL/PRODUCT-TYPE":
            return {...state, productType: action.status}
        default:
            return state
    }
}

export const openCategoriesModal = (status: boolean) => {
    return {type: 'MODAL/CATEGORY', status} as const
}
export const openGroupModal = (status: boolean) => {
    return {type: 'MODAL/GROUP', status} as const
}
export const openCountriesModal = (status: boolean) => {
    return {type: 'MODAL/COUNTRIES', status} as const
}
export const openNewCountryModal = (status: boolean) => {
    return {type: 'MODAL/NEW-COUNTRY', status} as const
}
export const openEditModal = (status: boolean, id: string, title: string, caption: string, param: string) => {
    return {type: 'MODAL/EDIT', status, id, title, caption, param} as const
}
export const openNewManufacturerModal = (status: boolean) => {
    return {type: 'MODAL/NEW-MANUFACTURER', status} as const
}
export const openManufacturersModal = (status: boolean) => {
    return {type: 'MODAL/MANUFACTURERS', status} as const
}
export const openMarksModal = (status: boolean) => {
    return {type: 'MODAL/MARKS', status} as const
}
export const openNewMarkModal = (status: boolean) => {
    return {type: 'MODAL/NEW-MARK', status} as const
}
export const openProductTypeModal = (status: boolean) => {
    return {type: 'MODAL/PRODUCT-TYPE', status} as const
}


type InitStateType = typeof initState
type ActionsType =
    | ReturnType<typeof openCategoriesModal>
    | ReturnType<typeof openGroupModal>
    | ReturnType<typeof openCountriesModal>
    | ReturnType<typeof openNewCountryModal>
    | ReturnType<typeof openEditModal>
    | ReturnType<typeof openNewManufacturerModal>
    | ReturnType<typeof openManufacturersModal>
    | ReturnType<typeof openMarksModal>
    | ReturnType<typeof openNewMarkModal>
    | ReturnType<typeof openProductTypeModal>