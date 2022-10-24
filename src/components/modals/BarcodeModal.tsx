import React from 'react';
import BaseModal from "./BaseModal";
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openBarcodeEditModal, openBarcodeModal} from "../../store/modalsReducer";
import BarcodeItem from "../barcode-item/BarcodeItem";
import BarcodeEditModal from "./BarcodeEditModal";

type PropsType = {
   productId: string
   productTitle: string
};

const BarcodeModal: React.FC<PropsType> = ({productId, productTitle}) => {
   const dispatch = useDispatch<AppDispatchType>()
   const barcodes = useAppSelector(state => state.additionally.barcode)
   const open = useAppSelector(state => state.modals.barcode)
   const currentBarcodes = barcodes.filter(el => el.Номенклатура_Key === productId)
   const handleClose = () => dispatch(openBarcodeModal(false))

   const editBarcodeHandler = (barcode: string, productTitle: string, packageKey: string, productId: string) => {
      const data = {status: true, barcode, productTitle, packageKey, productId, typeModal: 'edit'}
      dispatch(openBarcodeEditModal(data))
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'Штриходы'}>
         <div style={{minWidth: '80vw'}}>
            <div style={{marginTop: '0', marginBottom: '20px'}}
                 className="modal__buttons">
               <button style={{padding: '5px 15px'}} onClick={() => dispatch(openBarcodeEditModal({status: true, productTitle, productId, typeModal: 'new' }))}
                       className='button'>Создать штрихкод
               </button>
            </div>
            <div className="modal__list">
               <div className="modal__captions">
                  <div className="modal__caption">Штрихкод</div>
                  <div className="modal__caption">Наименование продукта</div>
               </div>
               <div className='modal__items'>
                  {currentBarcodes !== undefined &&
                     currentBarcodes.map(el => {
                        return (
                           <BarcodeItem key={el.Штрихкод}
                                        barcode={el.Штрихкод}
                                        productTitle={productTitle}
                                        productId={productId}
                                        editBarcode={editBarcodeHandler}
                           />
                        )
                     })
                  }
               </div>
            </div>
            <BarcodeEditModal/>
         </div>

      </BaseModal>
   );
};


export default BarcodeModal;