import { Dispatch } from "redux";
import { api } from "../api/api";
import { setAppStatus, setGroupPageStatus, setProductPageStatus } from "./appReducer";
import { openNoticeModal } from "./modalsReducer";
import {
  addClassifiersToState,
  addCountriesToState,
  addImportersToState,
  addManufacturerToState,
  addMarksToState,
  addRatesToState,
  addUnitsToState
} from "./additionalReducer";

const initState: initStateType = {
  categories: [],
  groups: [],
  productsList: [],
  product: null,
}

export const productsReducer = (state: initStateType = initState, action: ActionsType): initStateType => {
  switch (action.type) {
    case "ADD-PRODUCTS":
      return { ...state, categories: action.data }
    case "ADD-GROUPS":
      return { ...state, groups: action.data }
    case "ADD-PRODUCTS-LIST":
      return { ...state, productsList: action.data }
    case "ADD-PRODUCT":
      return { ...state, product: action.data }
    case "ADD-NEW-CATEGORY":
      return { ...state, categories: [...state.categories, action.data] }
    case "ADD-NEW-GROUP":
      return { ...state, groups: [...state.groups, action.data] }
    case "CHANGE-GROUP-TITLE":
      return {
        ...state,
        groups: state.groups.map(el => el.Ref_Key === action.id ? {
          ...el,
          Description: action.data.Description
        } : el)
      }
    case "CHANGE-PRODUCT-TITLE":
      return {
        ...state,
        productsList: state.productsList.map(el => el.Ref_Key === action.id ? {
          ...el,
          Description: action.data.Description
        } : el)
      }
    case "UPDATE-PRODUCT":
      return {
        ...state,
        productsList: state.productsList.map(el => el.Ref_Key === action.id ? {
          ...el,
          Ref_Key: action.data.Ref_Key,
          Description: action.data.Description,
          НаименованиеПолное: action.data.НаименованиеПолное,
          Артикул: action.data.Артикул,
          Code: action.data.Code,
          КодТНВЭД_Key: action.data.КодТНВЭД_Key,
          Описание: action.data.Описание,
          Производитель_Key: action.data.manufacturerKey,
          СтранаПроисхождения_Key: action.data.countryKey,
          ВидНоменклатуры_Key: action.data.groupKey,
          Марка_Key: action.data.markKey
        } : el)
      }
    case "ADD-NEW-PRODUCT":
      return { ...state, productsList: [...state.productsList, action.product] }

    default:
      return state
  }
}

export const addNewCategory = (data: any) => {
  return { type: 'ADD-NEW-CATEGORY', data } as const
}
export const addNewGroup = (data: any) => {
  return { type: 'ADD-NEW-GROUP', data } as const
}
export const addNewProductToState = (product: any) => {
  return { type: 'ADD-NEW-PRODUCT', product } as const
}
export const changeDataProduct = (data: any, id: string) => {
  return { type: 'UPDATE-PRODUCT', data, id } as const
}
export const addCategoriesToState = (data: any[]) => {
  return { type: 'ADD-PRODUCTS', data } as const
}
export const addGroupsToState = (data: any[]) => {
  return { type: 'ADD-GROUPS', data } as const
}
export const addProductsListToState = (data: any[]) => {
  return { type: 'ADD-PRODUCTS-LIST', data } as const
}
export const addProductToState = (data: any) => {
  return { type: 'ADD-PRODUCT', data } as const
}
export const changeGroupTitle = (data: any, id: string) => {
  return { type: 'CHANGE-GROUP-TITLE', data, id } as const
}
export const changeProductTitle = (data: any, id: string) => {
  return { type: 'CHANGE-PRODUCT-TITLE', data, id } as const
}

export const baseDataLoading = () => (dispatch: Dispatch) => {
  const categories = api.getCategories()
  const groups = api.getGroups()
  const manufacturers = api.getManufacturer()
  const marks = api.getMarks()
  const importers = api.getImporters()
  const countries = api.getCountries()
  const rates = api.getRatesNDS()
  const classifiers = api.getClassifiers()
  const units = api.getUnits()

  Promise.all([categories, groups, manufacturers, marks, importers, countries, rates, classifiers, units])
    .then(([categories, groups, manufacturers,
             marks, importers, countries,
             rates, classifiers, units]) => {
      dispatch(addCategoriesToState(categories.data.value))
      dispatch(addGroupsToState(groups.data.value))
      dispatch(setAppStatus('idle'))
      dispatch(addManufacturerToState(manufacturers.data.value))
      dispatch(addImportersToState(importers.data.value))
      dispatch(addMarksToState(marks.data.value))
      dispatch(addCountriesToState(countries.data.value))
      dispatch(addRatesToState(rates.data.value))
      dispatch(addClassifiersToState(classifiers.data.value))
      dispatch(addUnitsToState(units.data.value))
    }).catch(() => {
      console.log('error')
    })
}
export const fetchProducts = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
  dispatch(setGroupPageStatus('loading'))
  api.getProducts(Ref_Key).then(res => {
    dispatch(addProductsListToState(res.data.value))
    dispatch(setGroupPageStatus('idle'))
  })
}
export const fetchProduct = (Ref_Key: string | undefined) => (dispatch: Dispatch) => {
  dispatch(setProductPageStatus('loading'))
  /*    const product = api.getProduct(Ref_Key)
      const manufacturers = api.getManufacturer()
      const marks = api.getMarks()
      const importers = api.getImporters()
      const countries = api.getCountries()

      Promise.all([product, manufacturers, marks, importers, countries])
          .then(([product, manufacturers, marks, importers, countries]) => {
              dispatch(addProductToState(product.data))
              dispatch(addManufacturerToState(manufacturers.data.value))
              dispatch(addImportersToState(importers.data.value))
              dispatch(addMarksToState(marks.data.value))
              dispatch(addCountriesToState(countries.data.value))
              dispatch(setAppStatus2('idle'))
          })*/
  api.getProduct(Ref_Key).then((res) => {
    dispatch(addProductToState(res.data))
    dispatch(setProductPageStatus('idle'))
  })
}
export const addNewProduct = (product: any) => (dispatch: Dispatch) => {
  api.postNewProduct(product).then(res => {
    dispatch(addNewProductToState(product))
    dispatch(openNoticeModal(true, `Товар ${product.Description} добавлен`))
  })
}
export const updateProduct = (product: any, id: string) => (dispatch: Dispatch) => {
  api.updateProduct(product, id).then(res => {
    dispatch(changeDataProduct(product, id))
    dispatch(openNoticeModal(true, `Товар ${product.Description} изменен`))
  })
}
export const createNewGroup = (data: any) => (dispatch: Dispatch) => {
  api.createNewGroup(data).then(res => {
    dispatch(addNewGroup(res.data))
  })
}
export const updateGroupTitle = (data: any, id: string) => (dispatch: Dispatch) => {
  api.updateGroup(data, id).then(res => {
    dispatch(changeGroupTitle(res.data, id))
  })
}
export const updateProductTitle = (data: any, id: string) => (dispatch: Dispatch) => {
  api.updateProduct(data, id).then(res => {
    dispatch(changeProductTitle(res.data, id))
  })
}

export type initStateType = {
  categories: any[]
  groups: any[]
  productsList: any[],
  product: any | null,
}

export type ActionsType =
  | ReturnType<typeof addCategoriesToState>
  | ReturnType<typeof addGroupsToState>
  | ReturnType<typeof addProductsListToState>
  | ReturnType<typeof addProductToState>
  | ReturnType<typeof addNewCategory>
  | ReturnType<typeof addNewGroup>
  | ReturnType<typeof changeGroupTitle>
  | ReturnType<typeof changeProductTitle>
  | ReturnType<typeof changeDataProduct>
  | ReturnType<typeof addNewProductToState>
