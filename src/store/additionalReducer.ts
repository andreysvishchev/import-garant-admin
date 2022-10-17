import {Dispatch} from "redux";
import {api as apiF} from "../api/api";
import {store} from "./store";
import {setButtonStatus} from "./appReducer";
import {openBarcodeEditModal, openClassifierModal, openGroupFolderModal, openNewManufacturerModal, openNewMarkModal} from "./modalsReducer";

const initState = {
   manufacturer: [],
   marks: [],
   importers: [],
   countries: [],
   rates: [],
   classifiers: [],
   units: [],
   barcode: [],
   groupFolder: []
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
      case "ADD-NEW-BARCODE":
         return {...state, barcode: [...state.barcode, {Номенклатура_Key: action.id, Штрихкод: action.barcode}]}
      case "ADD-GROUP-FOLDER":
         return {...state, groupFolder: action.data}
      case "ADD-NEW-GROUP-FOLDER":
         return {...state, groupFolder: [...state.groupFolder, action.data]}
      case "UPDATE-MANUFACTURER":
         return {
            ...state, manufacturer:
               state.manufacturer.map(el => el.Ref_Key === action.data.Ref_Key ? {
                  ...el,
                  Description: action.data.Description
               } : el)
         }
      case "UPDATE-CLASSIFIER":
         return {
            ...state, classifiers: state.classifiers.map(el => el.Ref_Key === action.data.Ref_Key ? {
               ...el,
               Description: action.data.Description,
               НаименованиеПолное: action.data.НаименованиеПолное,
               ЕдиницаИзмерения_Key: action.data.ЕдиницаИзмерения_Key
            } : el)
         }
      case "UPDATE-COUNTRY":
         return {
            ...state, countries:
               state.countries.map(el => el.Ref_Key === action.data.Ref_Key ? {
                  ...el,
                  Description: action.data.Description
               } : el)
         }
      case "UPDATE-MARK":
         return {
            ...state, marks:
               state.marks.map(el => el.Ref_Key === action.data.Ref_Key ? {
                  ...el,
                  Description: action.data.Description
               } : el)
         }
      case "UPDATE-BARCODE":
         return {
            ...state, barcode:
               state.barcode.map(el => el.Номенклатура_Key === action.id ? {
                  ...el,
                  Штрихкод: action.barcode
               } : el)
         }

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
export const updateManufacturerAction = (data: any) => {
   return {type: 'UPDATE-MANUFACTURER', data} as const
}
export const updateCountryAction = (data: any) => {
   return {type: 'UPDATE-COUNTRY', data} as const
}
export const updateMarkAction = (data: any) => {
   return {type: 'UPDATE-MARK', data} as const
}
export const updateClassifierAction = (data: any) => {
   return {type: 'UPDATE-CLASSIFIER', data} as const
}
export const addNewBarcode = (barcode: string, id: string) => {
   return {type: 'ADD-NEW-BARCODE', barcode, id} as const
}
export const updateBarcodeAction = (barcode: string, id: string) => {
   return {type: 'UPDATE-BARCODE', barcode, id} as const
}
export const addGroupFolderToState = (data: any) => {
   return {type: 'ADD-GROUP-FOLDER', data} as const
}
export const addNewGroupFolder = (data: any) => {
   return {type: 'ADD-NEW-GROUP-FOLDER', data} as const
}

//thunk
export const createManufacturer = (data: any,) => (dispatch: Dispatch) => {
   dispatch(setButtonStatus('loading'))
   const api = apiF(store.getState().app.instance)
   api.createManufacturer(data).then(res => {
      dispatch(addNewManufacturer(res.data))
      dispatch(openNewManufacturerModal(false));
   })
      .finally(() => {
         dispatch(setButtonStatus('idle'))
      })
}
export const createCountry = (data: any) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.createCountry(data).then(res => {
      dispatch(addNewCountry(res.data))
   })
}
export const createMark = (data: any) => (dispatch: Dispatch) => {
   dispatch(setButtonStatus('loading'))
   const api = apiF(store.getState().app.instance)
   api.createMark(data).then(res => {
      dispatch(addNewMark(res.data))
      dispatch(openNewMarkModal(false));
   })
      .finally(() => {
         dispatch(setButtonStatus('idle'))
      })
}
export const createClassifier = (data: any) => (dispatch: Dispatch) => {
   dispatch(setButtonStatus('loading'))
   const api = apiF(store.getState().app.instance)
   api.createClassifiers(data).then(res => {
      dispatch(addNewClassifier(res.data))
      dispatch(openClassifierModal(false))
   })
      .finally(() => {
         dispatch(setButtonStatus('idle'))
      })
}
export const updateManufacturer = (data: any, id: string) => (dispatch: Dispatch) => {
   dispatch(setButtonStatus('loading'))
   const api = apiF(store.getState().app.instance)
   api.updateManufacturer(data, id).then(res => {
      dispatch(updateManufacturerAction(res.data))
      dispatch(openClassifierModal(false))
   })
      .finally(() => {
         dispatch(setButtonStatus('idle'))
      })
}
export const updateCountry = (data: any, id: string) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.updateCountry(data, id).then(res => {
      console.log(res.data)
      dispatch(updateCountryAction(res.data))
   })
}
export const updateClassifier = (data: any, id: string) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.updateClassifier(data, id).then(res => {
      console.log(res.data)
      dispatch(updateClassifierAction(res.data))
   })
}
export const updateMark = (data: any, id: string) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.updateMark(data, id).then(res => {
      console.log(res.data)
      dispatch(updateMarkAction(res.data))
   })
}
export const createBarcode = (barcode: string, id: string) => (dispatch: Dispatch) => {
   dispatch(setButtonStatus('loading'))
   const api = apiF(store.getState().app.instance)
   api.createBarcode(barcode, id).then(res => {
      dispatch(addNewBarcode(res.data.Штрихкод, res.data.Номенклатура_Key))
      dispatch(openBarcodeEditModal({status: false}))
   })
      .finally(() => {
         dispatch(setButtonStatus('idle'))
      })
}
export const updateBarcode = (barcode: string, id: string) => (dispatch: Dispatch) => {
   const api = apiF(store.getState().app.instance)
   api.updateBarcode(barcode, id).then(res => {
      dispatch(updateBarcodeAction(res.data.Штрихкод, res.data.Номенклатура_Key))
   })
}
export const createGroupFolder = (data: any) => (dispatch: Dispatch) => {
   dispatch(setButtonStatus('loading'))
   const api = apiF(store.getState().app.instance)
   api.createGroupFolder(data).then(res => {
      dispatch(addNewGroupFolder(res.data))
      dispatch(openGroupFolderModal(false))
   })
      .finally(() => {
         dispatch(setButtonStatus('idle'))
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
   barcode: any[],
   groupFolder: any[]
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
   | ReturnType<typeof updateManufacturerAction>
   | ReturnType<typeof updateCountryAction>
   | ReturnType<typeof updateMarkAction>
   | ReturnType<typeof updateClassifierAction>
   | ReturnType<typeof addNewBarcode>
   | ReturnType<typeof updateBarcodeAction>
   | ReturnType<typeof addGroupFolderToState>
   | ReturnType<typeof addNewGroupFolder>

