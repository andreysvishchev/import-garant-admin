import axios, { AxiosProxyConfig } from "axios";


const uName = 'adm'
const pass = 'Ufhfyn2022'


const instance = axios.create({
  // baseURL: "/importgarant_ut/odata/standard.odata/",

  headers: {
    'Authorization': "Basic " + window.btoa(uName + ':' + pass),
  },
})

const filt = 'Товар'

export const api = {
  getCategories() {
    return instance.get(`/Catalog_ВидыНоменклатуры?$filter=IsFolder?$format=json`)
  },
  getGroups() {
    return instance.get(`/Catalog_ВидыНоменклатуры?$format=json`)
  },
  getProducts(Ref_Key: string | undefined) {
    return instance.get(`/Catalog_Номенклатура?$filter=ВидНоменклатуры_Key eq guid'${Ref_Key}'?$format=json`)
  },
  test(id: string) {
    // return instance.get(`/Catalog_Номенклатура?$filter=Parent_Key eq guid'71c5584e-02cb-11ed-801e-e0d55e051ed2'?$format=json`)
    return instance.get(`/Catalog_Номенклатура?$filter=Parent_Key eq guid'${id}'?$format=json`)
  },
  getProduct(Ref_Key: string | undefined) {
    return instance.get(`/Catalog_Номенклатура(guid'${Ref_Key}')?$format=json`)
  },
  getUnits() {
    return instance.get(`/Catalog_УпаковкиЕдиницыИзмерения?$format=json`)
  },
  getBarCode () {
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
  postNewProduct(product: any) {
    return instance.post(`/Catalog_Номенклатура`, product)
  },
  updateProduct(data: any, id: string) {
    return instance.patch(`/Catalog_Номенклатура(guid'${id}')?$format=json`, data)
  },
  createNewGroup(data: any) {
    return instance.post(`/Catalog_ВидыНоменклатуры`, data)
  },
  updateGroup(data: any, id: string) {
    return instance.patch(`/Catalog_ВидыНоменклатуры(guid'${id}')?$format=json`, data)
  },
  createNewManufacturer() {

  },
  createNewCountry() {

  },
  createNewMark() {
  },




}
