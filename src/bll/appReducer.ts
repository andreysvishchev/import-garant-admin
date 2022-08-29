const initState: InitStateType = {
    status: 'idle' as RequestStatusType,
}
export const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => {
    return {type: 'SET-STATUS', status} as const
}


type InitStateType = {
    status: RequestStatusType
}
type ActionsType = ReturnType<typeof setAppStatus>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'