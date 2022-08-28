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
        return instance.get(`/importgarant_ut/odata/standard.odata/Catalog_ВидыНоменклатуры?$filter=IsFolder?$format=json`)
    },
    getGroups() {
        return instance.get(`/importgarant_ut/odata/standard.odata/Catalog_ВидыНоменклатуры?$format=json`)
    },
    getProducts() {
        return instance.get(`/importgarant_ut/odata/standard.odata/Catalog_Номенклатура?$format=json`)
    }

}