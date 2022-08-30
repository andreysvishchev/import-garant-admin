import axios, {AxiosProxyConfig} from "axios";


const uName = 'adm'
const pass = 'Ufhfyn2022'


const instance = axios.create({
    /*    baseURL: 'https://192.168.226.6/importgarant_ut/odata/standard.odata/',*/
    headers: {
        'Authorization': "Basic " + window.btoa(uName + ':' + pass),
    },


})

export const api = {
    getCategories() {
        return instance.get(`/Catalog_ВидыНоменклатуры?$filter=IsFolder?$format=json`)
    },
    getGroups(Ref_Key: string | undefined) {
        return instance.get(`/Catalog_ВидыНоменклатуры?$filter=Parent_Key eq guid'${Ref_Key}'?$format=json`)
    },
    getProducts(Ref_Key: string | undefined) {
        return instance.get(`/Catalog_Номенклатура?$filter=ВидНоменклатуры_Key eq guid'${Ref_Key}'?$format=json`)
    },
    getProduct(Ref_Key: string | undefined) {
        return instance.get(`/Catalog_Номенклатура(guid'${Ref_Key}')?$format=json`)
    },
    getManufacturer() {
        return instance.get(`/Catalog_Производители?$format=json`)
    },
    getMarks () {
        return instance.get('/Catalog_Марки?$format=json')
    },
    getImporters () {
        return instance.get(`/Catalog_Контрагенты?$format=json`)
    }

}