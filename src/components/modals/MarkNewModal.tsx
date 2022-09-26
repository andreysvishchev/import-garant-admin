import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openNewMarkModal} from "../../store/modalsReducer";
import {v1} from "uuid";
import {addNewMark, createMark} from "../../store/additionalReducer";

type PropsType = {
   changeMark: (data: any) => void
   manufacturer: any[]
}
const MarkNewModal: React.FC<PropsType> = React.memo(({changeMark, manufacturer}) => {
   const baseParam = '00000000-0000-0000-0000-000000000000';
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.newMark)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)

   const [value, setValue] = useState('')
   const [error, setError] = useState(false)
   const [selectValue, setSelectValue] = useState(baseParam)

   const handleClose = () => dispatch(openNewMarkModal(false));

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
      setError(false)
   }

   const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectValue(e.currentTarget.value)
   }

   const addMark = () => {
      if (value !== '') {
         const data = {DeletionMark: false, Производитель_Key: selectValue, IsFolder: false, Description: value}
         dispatch(createMark(data))
         changeMark(data)
         setValue('')
      } else {
         setError(true)
      }
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'Новый бренд'}>
         <div className='input'>
            <div className='input__caption'>Название бренда</div>
            <input className='input__field' value={value} onChange={onChangeHandler}/>
            {error && <div className='input__error'>Поле не может быть пустым</div>}
         </div>
         <div className="select">
            <div className="select__caption">Производитель</div>
            <select className='select__field' value={selectValue}
                    name='СтавкаНДС_Key' onChange={onSelectChange}>
               <option value={baseParam}>Выберете производителя</option>
               {manufacturer.map(el => {
                  return (
                     <option key={el.Ref_Key} id={el.Ref_Key}
                             value={el.Ref_Key}>{el.Description}</option>
                  )
               })}
            </select>
         </div>
         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose}
                    className="button light">Закрыть
            </button>
            <button style={{width: '100%'}} onClick={addMark} disabled={buttonStatus === 'loading'}
                    className={buttonStatus === 'loading' ? 'button load' : 'button'}>Добавить
            </button>
         </div>
      </BaseModal>
   );
});

export default MarkNewModal;