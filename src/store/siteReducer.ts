import {Dispatch} from "redux";
import {siteApi} from "../api/odataApi";
import {openNoticeModal} from "./modalsReducer";

const initState = {
   id: '',
   energy_value: '',
   image: '',
   proteins: '',
   fats: '',
   carbohydrates: '',
   expiration_date: '',
   composition: '',
   package: '',
   storage_conditions: '',
}

export const siteReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
   switch (action.type) {
      case "ADD-PRODUCT-ID":
         return {...state, id: action.id}
      case "ADD-FIELDS-VALUES":
         return {
            ...state,
            fats: action.data.fats,
            package: action.data.package,
            composition: action.data.composition,
            carbohydrates: action.data.carbohydrates,
            energy_value: action.data.energy_value,
            expiration_date: action.data.expiration_date,
            proteins: action.data.proteins,
            image: action.data.image,
            storage_conditions: action.data.storage_conditions
         }
      default:
         return state
   }
}

export const addProductId = (id: string) => {
   return {type: 'ADD-PRODUCT-ID', id} as const
}
export const addFieldsValue = (data: SiteInfoType) => {
   return {type: 'ADD-FIELDS-VALUES', data} as const
}

export const getSiteInfo = (id: string | undefined) => (dispatch: Dispatch) => {
   siteApi.getSiteInfo(id)
      .then(res => {
         dispatch(addFieldsValue(res.data))
      })
}
export const postSiteInfo = (data: SiteInfoType) => (dispatch: Dispatch) => {
   siteApi.addSiteInfo(data)
      .then(res => {
         if (res.data.ret === 0) {
            dispatch(openNoticeModal(true, 'Информация о товаре сохранена'))
         } else {
            dispatch(openNoticeModal(true, 'Ошибка, просьба уведомить разработчиков сайта'))
         }
      })
}

type InitStateType = typeof initState
type ActionsType = ReturnType<typeof addProductId> | ReturnType<typeof addFieldsValue>

export  type SiteInfoType = {
   id: string
   image: string
   energy_value: string
   proteins: string
   fats: string
   carbohydrates: string
   expiration_date: string
   composition: string
   package: string
   storage_conditions: string
}