import React, {ChangeEvent, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openBarcodeEditModal} from "../../store/modalsReducer";
import {createBarcode, updateBarcode} from "../../store/additionalReducer";


const BarcodeEditModal = () => {
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.barcodeEdit.status)
   const barcode = useAppSelector(state => state.modals.barcodeEdit.barcode)
   const productTitle = useAppSelector(state => state.modals.barcodeEdit.productTitle)
   const packageKey = useAppSelector(state => state.modals.barcodeEdit.packageKey)
   const typeModal = useAppSelector(state => state.modals.barcodeEdit.typeModal)
   const productId = useAppSelector(state => state.modals.barcodeEdit.productId)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)

   const [codeValue, setCodeValue] = useState<string>('')
   const [error, setError] = useState(false)

   const handleClose = () => dispatch(openBarcodeEditModal({status: false}))

   const changeCodeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCodeValue(e.currentTarget.value)
      setError(false)
   }

   const onClickHandler = () => {
      if (codeValue === '') {
         setError(true)
      } else {
         switch (typeModal) {
            case "new":
               return dispatch(createBarcode(codeValue, productId))
            case "edit":
               return dispatch(updateBarcode(codeValue, barcode))
         }
      }
   }


   return (
      <BaseModal open={open} handleClose={handleClose} title={'Штрихкод'}>
         <div className="input">
            <div className="input__caption">Штрихкод</div>
            <input onChange={changeCodeValueHandler} className='input__field' placeholder='Введите штрихкод' value={codeValue}/>
            {error && <div className='input__error'>Поле штрихкод не может быть пустым</div>}
         </div>
         <div className="input">
            <div className="input__caption">Наименование продукции</div>
            <div className='input__field'>
               {productTitle}
            </div>
         </div>
         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
            <button style={{width: '100%'}} disabled={buttonStatus === 'loading'} onClick={onClickHandler}
                    className={buttonStatus === 'loading' ? 'button load' : 'button'}>Добавить
            </button>
         </div>
      </BaseModal>
   )
};


export default BarcodeEditModal;