import React from 'react';
import BaseModal from "./BaseModal";
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openBarcodeModal, openClassifierModal} from "../../store/modalsReducer";

type PropsType = {};

const BarcodeModal: React.FC<PropsType> = ({}) => {
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.barcode)
   const handleClose = () => dispatch(openBarcodeModal(false))
   return (
      <BaseModal open={open} handleClose={handleClose} title={'Штриходы'}>

      </BaseModal>
   );
};


export default BarcodeModal;