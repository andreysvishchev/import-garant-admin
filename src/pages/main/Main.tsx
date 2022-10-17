import React, {useState} from 'react';
import axios from "axios";
import {useAppSelector} from "../../store/store";

const Main = () => {
   let headers: any = {}
   const uName = 'adm'
   const pass = 'Ufhfyn2022'
   const str = window.btoa(uName + ':' + pass)
   headers['Authorization'] = "Basic " + window.btoa(uName + ':' + pass);
   const [state, setState] = useState<any[]>()
   const groups = useAppSelector(state => state.products.groups)
   const test = () => {
      axios.get("Catalog_Номенклатура?$filter=Parent_Key eq guid'25e24bee-cfd0-11e5-8a17-74d435b03623' and IsFolder?$format=json", {
         headers: headers
      })
         .then((r) => {
            console.log(r.data.value)

            setState(r.data.value)
         })
   }

   const test2 = () => {
      axios.get("Catalog_Номенклатура?$format=json", {
         headers: headers
      })
         .then((r) => {
            setState(r.data.value)
         })
   }
   const productsId = state?.map(el => el.Ref_Key)
   console.log(productsId)
   // const products = state?.filter(el=> el.Parent_Key === groups)


   return (
      <div>
         <button onClick={test}>123</button>
         <button onClick={test2}>125</button>

         {state?.map((el, i) => {
            return (
               <div style={{display: 'grid', gap: '20px', fontSize: '14px', gridTemplateColumns: '30px 1fr 1fr 1fr'}} key={el.Ref_Key}>
                  <div>{i}</div>
                  <div>{el.Description}</div>
                  <div style={{color: 'red'}}>{el.Ref_Key}</div>
                  <div style={{color: 'green'}}>{el.Parent_Key}</div>

               </div>

            )
         })}
      </div>
   );
};

export default Main;
