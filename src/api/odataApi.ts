import axios, {AxiosInstance} from "axios";
import {SiteInfoType} from "../store/siteReducer";

export const odataApi = (instance: AxiosInstance) => ({
    getCategories() {
        return instance.get(`/Catalog_ВидыНоменклатуры?$filter=IsFolder?$select=Ref_Key,Description,IsFolder,Parent_Key`)
    },
    getGroupFolder() {
        return instance.get(`/Catalog_Номенклатура?$filter=Parent_Key eq guid'25e24bee-cfd0-11e5-8a17-74d435b03623'?$format=json`)
    },
    getGroups() {
        return instance.get(`/Catalog_ВидыНоменклатуры?$select=Ref_Key,Description,IsFolder,Parent_Key`)
    },
    getProducts(Ref_Key: string | undefined) {
        return instance.get(`/Catalog_Номенклатура?$filter=ВидНоменклатуры_Key eq guid'${Ref_Key}'?$format=json`)
    },
    getProductsForCategory(id: string) {
        return instance.get(`/Catalog_Номенклатура?$filter=Parent_Key eq guid'${id}' and IsFolder ne true?$format=json`)
    },
    getProduct(Ref_Key: string | undefined) {
        return instance.get(`/Catalog_Номенклатура(guid'${Ref_Key}')?$format=json`)
    },
    getUnits() {
        return instance.get(`/Catalog_УпаковкиЕдиницыИзмерения?$format=json`)
    },
    getBarCode() {
        return instance.get(`/InformationRegister_ШтрихкодыНоменклатуры?$format=json`)
    },
    getManufacturer() {
        return instance.get<BaseResponseType<BaseType[]>>(`/Catalog_Производители?$select=Ref_Key,Description`)
    },
    getMarks() {
        return instance.get<BaseResponseType<BaseType[]>>('/Catalog_Марки?$select=Ref_Key,Description')
    },
    getCountries() {
        return instance.get<BaseResponseType<BaseType[]>>(`/Catalog_СтраныМира?$select=Ref_Key,Description`)
    },
    getRatesNDS() {
        return instance.get(`/Catalog_СтавкиНДС?$format=json`)
    },
    getClassifiers() {
        return instance.get(`/Catalog_КлассификаторТНВЭД?$format=json`)
    },
    createCategory(data: any) {
        return instance.post(`/Catalog_ВидыНоменклатуры`, data)
    },
    createProduct(product: any) {
        return instance.post(`/Catalog_Номенклатура`, product)
    },
    updateProduct(data: any, id: string) {
        return instance.patch(`/Catalog_Номенклатура(guid'${id}')?$format=json`, data)
    },
    createGroup(data: any) {
        return instance.post(`/Catalog_ВидыНоменклатуры`, data)
    },
    updateGroup(data: any, id: string) {
        return instance.patch(`/Catalog_ВидыНоменклатуры(guid'${id}')?$format=json`, data)
    },
    createManufacturer(data: any) {
        return instance.post(`/Catalog_Производители`, data)
    },
    updateManufacturer(data: any, id: string) {
        return instance.put(`/Catalog_Производители(guid'${id}')`, data)
    },
    createCountry(data: any) {
        return instance.post(`/Catalog_СтраныМира`, data)
    },
    updateCountry(data: any, id: string) {
        return instance.put(`/Catalog_СтраныМира(guid'${id}')`, data)
    },
    createMark(data: any) {
        return instance.post(`/Catalog_Марки`, data)
    },
    updateMark(data: any, id: string) {
        return instance.put(`/Catalog_Марки(guid'${id}')`, data)
    },
    createClassifiers(data: any) {
        return instance.post(`/Catalog_КлассификаторТНВЭД`, data)
    },
    updateClassifier(data: any, id: string) {
        return instance.put(`/Catalog_КлассификаторТНВЭД(guid'${id}')`, data)
    },
    createBarcode(barcode: string, id: string) {
        return instance.post(`/InformationRegister_ШтрихкодыНоменклатуры`, {Штрихкод: barcode, Номенклатура_Key: id})
    },
    updateBarcode(barcode: string, id: string) {
        return instance.put(`/InformationRegister_ШтрихкодыНоменклатуры(guid'${id}')?$format=json`, {Штрихкод: barcode})
    },
    createGroupFolder(data: any) {
        return instance.post(`/Catalog_Номенклатура`, data)
    },
})

export const siteApi = {
    getSiteInfo(id: string | undefined) {
        return axios.get(`http://192.168.226.6/admin/get_data.ashx?id=${id}`)
    },
    addSiteInfo(data: SiteInfoType) {
        return axios.post('http://192.168.226.6/admin/get_data.ashx', {data})
    }
}

type BaseType = {
    Ref_Key: string
    Description: string
}

type BaseResponseType<V> = {
   ['odata.metadata']: string
   value: V
}

type BarcodeType = {
    ['Штрихкод']: string
    ['Номенклатура_Key']: string
}

