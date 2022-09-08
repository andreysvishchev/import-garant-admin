const initState: InitStateType = {
    status: 'loading' as RequestStatusType,
    status2: 'loading'
}
export const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "SET-STATUS":
            return {...state, status: action.status}
        case "SET-STATUS2":
            return {...state, status2: action.status}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => {
    return {type: 'SET-STATUS', status} as const
}
export const setAppStatus2= (status: RequestStatusType2) => {
    return {type: 'SET-STATUS2', status} as const
}

type InitStateType = {
    status: RequestStatusType
    status2: RequestStatusType2
}
type ActionsType = ReturnType<typeof setAppStatus> |ReturnType<typeof setAppStatus2>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'table-loading'
export type RequestStatusType2 = 'idle' | 'loading'