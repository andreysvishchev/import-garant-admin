import {Dispatch} from "redux";
import {api as apiF, api} from "../api/api";
import {store} from "./store";

const initState = {
   manufacturer: [],
   marks: [],
   importers: [],
   countries: [],
   rates: [],
   classifiers: [],
   units: [],
   barcode: [],
}

export const additionalReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
   switch (action.type) {
      case "ADD-MANUFACTURER":
         return {...state, manufacturer: action.data}
      case "ADD-MARKS":
         return {...state, marks: action.data}
      case "ADD-COUNTRIES":
         return {...state, countries: action.data}
      case "ADD-IMPORTERS":
         return {...state, importers: action.data}
      case "ADD-NEW-MANUFACTURER":
         return {...state, manufacturer: [...state.manufacturer, action.data]}
      case "ADD-NEW-COUNTRY":
         return {...state, countries: [...state.countries, action.data]}
      case "ADD-NEW-MARK":
         return {...state, marks: [...state.marks, action.data]}
      case "ADD-RATES":
         return {...state, rates: action.data}
      case "ADD-CLASS":
         return {...state, classifiers: action.data}
      case "ADD-UNITS":
         return {...state, units: action.data}
      case "ADD-NEW-CLASSIFIER":
         return {...state, classifiers: [...state.classifiers, action.data]}
      case "ADD-BARCODE":
         return {...state, barcode: action.data}
      default:
         return state
   }
}

//action
export const addNewManufacturer = (data: any) => {
   return {type: 'ADD-NEW-MANUFACTURER', data} as const
}
export const addNewCountry = (data: any) => {
   return {type: 'ADD-NEW-COUNTRY', data} as const
}
export const addNewMark = (data: any) => {
   return {type: 'ADD-NEW-MARK', data} as const
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
export const addRatesToState = (data: any) => {
   return {type: 'ADD-RATES', data} as const
}
export const addClassifiersToState = (data: any) => {
   return {type: 'ADD-CLASS', data} as const
}
export const addUnitsToState = (data: any) => {
   return {type: 'ADD-UNITS', data} as const
}
export const addNewClassifier = (data: any) => {
   return {type: 'ADD-NEW-CLASSIFIER', data} as const
}
export const addBarcodeToState = (data: any) => {
   return {type: 'ADD-BARCODE', data} as const
}

//thunk
export const createManufacturer = (data: any,) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.createManufacturer(data).then(res => {
      console.log(res.data)
      dispatch(addNewManufacturer(res.data))
   })
}
export const createCountry = (data: any) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.createCountry(data).then(res => {
      console.log(res.data)
      dispatch(addNewCountry(res.data))
   })
}
export const createMark = (data: any) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.createMark(data).then(res => {
      console.log(res.data)
      dispatch(addNewMark(res.data))
   })
}
export const createClassifier = (data: any) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.createClassifiers(data).then(res => {
      console.log(res.data)
      dispatch(addNewClassifier(res.data))
   })
}

type InitStateType = {
   manufacturer: any[],
   marks: any[],
   importers: any[],
   countries: any[],
   rates: any[],
   classifiers: any[],
   units: any[],
   barcode: any[]
}
type ActionsType =
   | ReturnType<typeof addManufacturerToState>
   | ReturnType<typeof addMarksToState>
   | ReturnType<typeof addImportersToState>
   | ReturnType<typeof addCountriesToState>
   | ReturnType<typeof addNewManufacturer>
   | ReturnType<typeof addNewCountry>
   | ReturnType<typeof addNewMark>
   | ReturnType<typeof addRatesToState>
   | ReturnType<typeof addClassifiersToState>
   | ReturnType<typeof addUnitsToState>
   | ReturnType<typeof addNewClassifier>
   | ReturnType<typeof addBarcodeToState>

