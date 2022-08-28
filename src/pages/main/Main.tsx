import React, {useState} from 'react';
import axios from "axios";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {unescape} from "querystring";
import set = Reflect.set;

const Main = () => {
    let headers: any = {}
    const uName = 'adm'
    const pass = 'Ufhfyn2022'
    const str = window.btoa(uName + ':' + pass)
    headers['Authorization'] = "Basic " + window.btoa(uName + ':' + pass);
    const [state, setState] = useState<any[]>()

    const test = () => {
  /*      axios.get("Catalog_Номенклатура?$format=json", {
            headers: headers
        })
            .then((r) => {
                console.log(r.data)

                setState( r.data.value)
            })*/
        axios.get("Catalog_ВидыНоменклатуры?$format=json", {
            headers: headers
        })
            .then((r) => {
                console.log(r.data.value)

                setState( r.data.value)
            })
    }


    return (
        <div>
            <button onClick={test}>123</button>


            {state?.map((el, i)=> {
                return (
                    <div style={{display: 'grid', gap: '20px', fontSize: '14px', gridTemplateColumns: '30px 1fr 1fr 1fr'}} key={el.Ref_Key}>
                        <div>{i}</div>
                        <div>{el.Description}</div>
                        <div style={{color: 'red'}}>{el.Ref_Key}</div>
                        <div style={{color: 'green'}}>{el. Parent_Key}</div>

                    </div>

                )
            })}
        </div>
    );
};

export default Main;