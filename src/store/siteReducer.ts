const initState = {
   id: ''
}

export const siteReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
   switch (action.type) {
      case "ADD-PRODUCT-ID":
         return {...state, id: action.id}
      default:
         return state
   }
}

export const addProductId = (id: string) => {
   return {type: 'ADD-PRODUCT-ID', id} as const
}

type InitStateType = typeof initState
type ActionsType = ReturnType<typeof addProductId>