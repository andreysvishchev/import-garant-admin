import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {createNewGroup} from "../../store/productsReducer";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openGroupModal} from "../../store/modalsReducer";
import BaseModal from "./BaseModal";
import {translit} from "../../functions/translit";

type PropsType = {
   categoryId: string
}

const GroupModal: React.FC<PropsType> = React.memo(({categoryId}) => {
   const open = useAppSelector(state => state.modals.group)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)
   const [value, setValue] = useState('')
   const [error, setError] = useState(false)
   const [errorText, setErrorText] = useState('')
   const dispatch = useDispatch<AppDispatchType>()
   const categories = useAppSelector(state => state.products.categories)
   const groups = useAppSelector(state => state.products.groups)

   const handleClose = () => {
      setError(false)
      setErrorText('')
      dispatch(openGroupModal(false))
   }

   const addNewGroupHandler = () => {
      const str = value.trim()
      const matchByCategories = categories.find(el => el.Description === str)
      const matchByGroup = groups.find(el => el.Description === str)
      if (str === '') {
         setError(true)
         setErrorText('Поле не может быть пустым')
      } else if (matchByGroup !== undefined) {
         setError(true)
         setErrorText('Название не может совпадать с названием группы')
      } else if (matchByCategories !== undefined) {
         setError(true)
         setErrorText('Название не может совпадать с названием категории')
      } else {
         const newGroup = {Description: str, IsFolder: false, Parent_Key: categoryId}
        dispatch(createNewGroup(newGroup))
         setValue('')
         handleClose()
      }
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setErrorText('')
      setValue(e.currentTarget.value)
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'Новая группа'}>
         {error && <div className='error'>{errorText}</div>}
         <div className='input'>
            <div className='input__caption'>Название группы</div>
            <input className='input__field' value={value} onChange={onChangeHandler}/>
         </div>
         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
            <button style={{width: '100%'}} onClick={addNewGroupHandler} disabled={buttonStatus === "loading"}
                    className={buttonStatus === 'loading' ? 'button load' : 'button'}>Добавить
            </button>
         </div>
      </BaseModal>
   );
});

export default GroupModal;
