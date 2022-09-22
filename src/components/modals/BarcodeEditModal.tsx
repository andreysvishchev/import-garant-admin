import React, {ChangeEvent, useEffect, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openBarcodeEditModal, openCountriesModal} from "../../store/modalsReducer";

type PropsType = {};

const BarcodeEditModal: React.FC<PropsType> = ({}) => {
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.barcodeEdit.status)
   const barcode = useAppSelector(state => state.modals.barcodeEdit.barcode)
   const productTitle = useAppSelector(state => state.modals.barcodeEdit.productTitle)
   const packageKey = useAppSelector(state => state.modals.barcodeEdit.packageKey)
   const productId = useAppSelector(state => state.modals.barcodeEdit.productId)
   const handleClose = () => dispatch(openBarcodeEditModal({status: false}))
   const [codeValue, setCodeValue] = useState('')

   useEffect(()=> {
      setCodeValue(barcode)
   },[barcode])

   const changeCodeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCodeValue(e.currentTarget.value)
   }


   console.log(codeValue)
   return (
      <BaseModal open={open} handleClose={handleClose} title={'Штрихкод'}>
         <div className="input">
            <div className="input__caption">Штрихкод</div>
            <input onChange={changeCodeValueHandler}
                   className='input__field'
                   placeholder='Введите штрихкод'
                   value={codeValue}/>
         </div>
         <div className="input">
            <div className="input__caption">Наименование продукции</div>
            <input disabled
                   className='input__field'
                   value={productTitle}/>
         </div>

         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose}
                    className="button light">Закрыть
            </button>
            <button style={{width: '100%'}}
                    className="button">Добавить
            </button>
         </div>
      </BaseModal>
   )
};


export default BarcodeEditModal;