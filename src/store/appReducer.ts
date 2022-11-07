
const initState: InitStateType = {
   isLoggedIn: false,
   error: false,
   appStatus: 'true' as AppStatusType,
   productPageStatus: 'loading' as AppStatusType,
   groupPageStatus: 'loading' as AppStatusType,
   buttonStatus: 'idle' as AppStatusType,
   login: '',
   password: '',
   instance: {}
}

export const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
   switch (action.type) {
      case "APP-FETCH-DATA":
         return {...state, login: action.login, password: action.password, instance: action.instance}
      case "CHANGE-LOGIN-STATUS":
         return  {...state, isLoggedIn: action.status}
      case "CHANGE-APP-STATUS":
         return {...state, appStatus: action.status}
      case "CHANGE-PRODUCT-PAGE-STATUS":
         return {...state, productPageStatus: action.status}
      case "CHANGE-GROUP-PAGE-STATUS":
         return {...state, groupPageStatus: action.status}
      case "CHANGE-BUTTON-STATUS":
         return {...state, buttonStatus: action.status}
      case "CHANGE-ERROR-STATUS":
         return {...state, error: action.status}
      default:
         return state
   }
}

export const appFetchData = ( login: string, password: string, instance: any) => {
   return {type: 'APP-FETCH-DATA', login, password, instance} as const
}
export const changeLoginStatus = (status: boolean,)=> {
   return {type: 'CHANGE-LOGIN-STATUS' ,status} as const
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
export const changeErrorStatus = (status: boolean)=> {
   return {type: 'CHANGE-ERROR-STATUS', status} as const
}

type InitStateType = {
   isLoggedIn: boolean
   appStatus: AppStatusType
   productPageStatus: AppStatusType
   groupPageStatus: AppStatusType
   buttonStatus: AppStatusType
   login: string,
   password: string
   instance: any,
   error: boolean
}

type ActionsType =
   ReturnType<typeof setAppStatus>
   | ReturnType<typeof setProductPageStatus>
   | ReturnType<typeof setGroupPageStatus>
   | ReturnType<typeof setButtonStatus>
   | ReturnType<typeof appFetchData>
   | ReturnType<typeof changeLoginStatus>
   | ReturnType<typeof changeErrorStatus>

export type AppStatusType = 'idle' | 'loading'


