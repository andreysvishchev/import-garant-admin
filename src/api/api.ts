import axios, {AxiosInstance} from "axios";
import {addFieldsValue, SiteInfoType} from "../store/siteReducer";


// const uName = 'adm'
//  const pass = 'Ufhfyn2022'
// //
// const instance = axios.create({
//    // baseURL: "/importgarant_ut/odata/standard.odata/",
//    headers: {
//       'Authorization': "Basic " + window.btoa(uName + ':' + pass),
//    },
// })

const baseId = '00000000-0000-0000-0000-000000000000'
const baseParams = 'Ref_Key,Description,IsFolder,Parent_Key'

export const api = (instance: AxiosInstance) => ({
   getCategories() {
      // return instance.get(`/Catalog_ВидыНоменклатуры?$filter=IsFolder?$format=json`)
      return instance.get(`/Catalog_ВидыНоменклатуры?$filter=IsFolder&$select=${baseParams}`)
   },
   getGroupFolder() {
      return instance.get(`/Catalog_Номенклатура?$filter=Parent_Key eq guid'25e24bee-cfd0-11e5-8a17-74d435b03623'&$format=json&$select=${baseParams}`)
   },
   getGroups() {
      return instance.get(`/Catalog_ВидыНоменклатуры?$format=json&$filter=IsFolder eq false and Parent_Key ne guid'${baseId}'&$select=${baseParams}`)
   },
   getUnits() {
      return instance.get(`/Catalog_УпаковкиЕдиницыИзмерения?$format=json&$select=Ref_Key,Description`)
   },
   getBarCode() {
      return instance.get(`/InformationRegister_ШтрихкодыНоменклатуры?$format=json`)
   },
   getManufacturer() {
      return instance.get(`/Catalog_Производители?$format=json`)
   },
   getMarks() {
      return instance.get('/Catalog_Марки?$format=json')
   },
   getImporters() {
      return instance.get(`/Catalog_Контрагенты?$format=json`)
   },
   getCountries() {
      return instance.get(`/Catalog_СтраныМира?$format=json`)
   },
   getRatesNDS() {
      return instance.get(`/Catalog_СтавкиНДС?$format=json`)
   },
   getClassifiers() {
      return instance.get(`/Catalog_КлассификаторТНВЭД?$format=json`)
   },
   getProducts(Ref_Key: string | undefined) {
      return instance.get(`/Catalog_Номенклатура?$filter=ВидНоменклатуры_Key eq guid'${Ref_Key}'?$format=json`)
   },
   getProduct(Ref_Key: string | undefined) {
      return instance.get(`/Catalog_Номенклатура(guid'${Ref_Key}')?$format=json`)
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
      // return axios.get(`/admin/get_data.ashx?id=${id}`)
   },
   addSiteInfo(data: SiteInfoType) {
      return axios.post('http://192.168.226.6/admin/get_data.ashx', {data})
      // return axios.post('/admin/get_data.ashx', {data})
   }
}



