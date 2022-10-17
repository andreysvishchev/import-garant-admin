import React, {ChangeEvent, useRef, useState} from 'react';
import {useFormik} from "formik";
import Input from "../../../../components/input/Input";
import Textarea from "../../../../components/textarea/Textarea";
import {useAppSelector} from "../../../../store/store";

type PropsType = {
   productId?: string
}

const AddInfo = (props: PropsType) => {
   const inRef = useRef<HTMLInputElement>(null);
   const [file64, setFile64] = useState('')
   const productId = useAppSelector(state => state.siteInfo.id)
   console.log(productId)
   async function upload(e: ChangeEvent<HTMLInputElement>) {
      const newFile = e.target.files && e.target.files[0];
      if (newFile) {
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
         id: productId,
         image: file64,
         energy_value: '',
         proteins: '',
         fats: '',
         carbohydrates: '',
         expiration_date: '',
         composition: '',
         package: '',
         storage_conditions: '',
      },

      onSubmit: values => {
         values.image = file64
         const valueStr = window.btoa(unescape(encodeURIComponent(JSON.stringify(values))))
         console.log(valueStr)
         console.log(values)
      },
   })

   return (
      <form onSubmit={formik.handleSubmit}>
         <div className='input-file'>
            {
               file64 === ''
                  ? <div className='input-img-empty'>Добавьте изображение</div>
                  : <img src={file64} alt={'file'} className='input-img'/>
            }
            <input
               ref={inRef}
               accept='image/jpeg, image/png'
               type={'file'}
               style={{display: 'none'}}
               onChange={upload}
            />
            <div className='input-file__buttons'>
               <button className='button' style={{width: '190px'}} type={'button'}
                       onClick={() => inRef && inRef.current && inRef.current.click()}>Добавить картинку
               </button>
               <button style={{width: '190px'}} type={'button'} className='button' onClick={() => setFile64('')}>Удалить картинку</button>
            </div>

         </div>
         <Input title={'Энергетическая ценность'}
                placeholder={'Заполните поле'}
                name="energy_value"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.energy_value}/>
         <Input title={'Белки, г'}
                placeholder={'Заполните поле'}
                name="proteins"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.proteins}/>
         <Input title={'Жиры,г'}
                placeholder={'Заполните поле'}
                name="fats"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fats}/>
         <Input title={'Углеводы, г'}
                placeholder={'Заполните поле'}
                name="carbohydrates"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.carbohydrates}/>
         <Textarea title={'Состав'}
                   placeholder={'Заполните поле'}
                   name="composition"
                   onBlur={formik.handleBlur}
                   onChange={formik.handleChange}
                   value={formik.values.composition}/>
         <Input title={'Условия хранения'}
                placeholder={'Заполните поле'}
                name="storage_conditions"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.storage_conditions}/>
         <Input title={'Срок годности'}
                placeholder={'Заполните поле'}
                name="expiration_date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.expiration_date}/>
         <Input title={'Упаковка'}
                placeholder={'Заполните поле'}
                name="package"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.package}/>

         <button style={{marginTop: '40px'}} className='button' type='submit'>
            Сохранить
         </button>
      </form>

   );
};

export default AddInfo;
