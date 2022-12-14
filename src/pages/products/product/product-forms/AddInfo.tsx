import React, {ChangeEvent, useRef, useState} from 'react';
import {useFormik} from "formik";
import Input from "../../../../components/input/Input";
import Textarea from "../../../../components/textarea/Textarea";
import {AppDispatchType, useAppSelector} from "../../../../store/store";
import {useDispatch} from "react-redux";
import {postSiteInfo} from "../../../../store/siteReducer";


const AddInfo = () => {
   const inRef = useRef<HTMLInputElement>(null);
   const dispatch = useDispatch<AppDispatchType>()
   const data = useAppSelector(state => state.siteInfo)
   const [file64, setFile64] = useState('')
   const [download, setDownload] = useState(false)
   const imgSrc = `http://192.168.226.6/admin/img.ashx?id=${data.id}`
   // const imgSrc = `/admin/img.ashx?id=${data.id}`

   async function upload(e: ChangeEvent<HTMLInputElement>) {
      const newFile = e.target.files && e.target.files[0];
      if (newFile) {
         setDownload(true)
         const base64: any = await convertBase64(newFile)
         setFile64(base64)
      }
   }

   const convertBase64 = (file: any) => {
      return new Promise(resolve => {
         const fileReader = new FileReader()
         fileReader.readAsDataURL(file)
         fileReader.onload = () => {
            resolve(fileReader.result)
         }
      })
   }


   const formik = useFormik({
      initialValues: {
         id: data.id,
         image: file64,
         energy_value: data.energy_value,
         proteins: data.proteins,
         fats: data.fats,
         carbohydrates: data.carbohydrates,
         expiration_date: data.expiration_date,
         composition: data.composition,
         package: data.package,
         storage_conditions: data.storage_conditions,
      },
      onSubmit: values => {
         if (download) {
            values.image = file64
            console.log(values.image)
         } else {
            values.image = ''
         }
         dispatch(postSiteInfo(values))
      },
   })


   return (
      <form onSubmit={formik.handleSubmit}>
         <img src={download ? file64 : imgSrc} alt={'file'} className='input-img'/>
         <input
            ref={inRef}
            accept='image/jpeg, image/png'
            type={'file'}
            style={{display: 'none'}}
            onChange={upload}
         />
         <button className='button' style={{width: '190px', marginBottom: '30px'}} type={'button'}
                 onClick={() => inRef && inRef.current && inRef.current.click()}>???????????????? ????????????????
         </button>
         <Input title={'???????????????????????????? ????????????????'}
                placeholder={'?????????????????? ????????'}
                name="energy_value"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.energy_value}/>
         <Input title={'??????????, ??'}
                placeholder={'?????????????????? ????????'}
                name="proteins"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.proteins}/>
         <Input title={'????????,??'}
                placeholder={'?????????????????? ????????'}
                name="fats"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fats}/>
         <Input title={'????????????????, ??'}
                placeholder={'?????????????????? ????????'}
                name="carbohydrates"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.carbohydrates}/>
         <Textarea title={'????????????'}
                   placeholder={'?????????????????? ????????'}
                   name="composition"
                   onBlur={formik.handleBlur}
                   onChange={formik.handleChange}
                   value={formik.values.composition}/>
         <Input title={'?????????????? ????????????????'}
                placeholder={'?????????????????? ????????'}
                name="storage_conditions"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.storage_conditions}/>
         <Input title={'???????? ????????????????'}
                placeholder={'?????????????????? ????????'}
                name="expiration_date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.expiration_date}/>
         <Input title={'????????????????'}
                placeholder={'?????????????????? ????????'}
                name="package"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.package}/>
         <button style={{marginTop: '40px'}} className='button' type='submit'>
            ??????????????????
         </button>
      </form>

   );
};

export default AddInfo;
