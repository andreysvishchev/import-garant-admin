import React, {ChangeEvent, memo, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openNewManufacturerModal} from "../../store/modalsReducer";
import BaseModal from "./BaseModal";
import {createManufacturer} from "../../store/additionalReducer";

type PropsType = {
   changeManufacturer: (data: any) => void
}

const ManufacturerNewModal = memo((props: PropsType) => {
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.newManufacturer)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)

   const [value, setValue] = useState('')
   const [error, setError] = useState(false)

   const handleClose = () => dispatch(openNewManufacturerModal(false));

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
      setError(false)
   }

   const addManufacturer = () => {
      if (value !== '') {
         const data = {Parent_Key: "00000000-0000-0000-0000-000000000000", IsFolder: false, Description: value,}
         dispatch(createManufacturer(data))
         props.changeManufacturer(data)
         setValue('')
      } else {
         setError(true)
      }
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'Новый производитель'}>
         <div className='input'>
            <div className='input__caption'>Название производителя</div>
            <input className='input__field' value={value} onChange={onChangeHandler}/>
            {error && <div className='input__error'>Поле не может быть пустым</div>}
         </div>
         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose}
                    className="button light">Закрыть
            </button>
            <button style={{width: '100%'}} onClick={addManufacturer} disabled={buttonStatus === 'loading'}
                    className={buttonStatus === 'loading' ? 'button load' : 'button'}>Добавить
            </button>
         </div>
      </BaseModal>
   );
});

export default ManufacturerNewModal;