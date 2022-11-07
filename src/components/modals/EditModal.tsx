import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {updateGroupTitle, updateProductTitle} from "../../store/productsReducer";
import BaseModal from "./BaseModal";
import {openEditModal} from "../../store/modalsReducer";
import {translit} from "../../functions/translit";


const EditModal = () => {
   const dispatch = useDispatch<AppDispatchType>()
   const status = useAppSelector(state => state.modals.edit.status)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)
   const title = useAppSelector(state => state.modals.edit.title)
   const id = useAppSelector(state => state.modals.edit.id)
   const param = useAppSelector(state => state.modals.edit.param)
   const caption = useAppSelector(state => state.modals.edit.caption)
   const [value, setValue] = useState(title)
   const [error, setError] = useState(false)
   const [errorText, setErrorText] = useState('')
   const categories = useAppSelector(state => state.products.categories)
   const groups = useAppSelector(state => state.products.groups)

   useEffect(() => {
      setValue(title)
   }, [title])

   const handleClose = () => {
      setError(false)
      setErrorText('')
      dispatch(openEditModal(false, '', '', '', ''));
   }

   const onClickHandler = () => {
      const str = value.trim()
      if (param === "group") {
         const matchByCategories = categories.find(el => el.Description === str)
         const matchByGroup = groups.find(el => el.Description === str)
         if (str === '') {
            setError(true)
            setErrorText('Поле не может быть пустым')
         } else if (str === title) {
            setError(true)
            setErrorText('Название не изменилось, просто нажмите крестик')
         } else if (matchByGroup !== undefined) {
            setError(true)
            setErrorText('Название не может совпадать с названием группы')
         } else if (matchByCategories !== undefined) {
            setError(true)
            setErrorText('Название не может совпадать с названием категории')
         } else {
            const group = {Description: str}
            console.log(group)
            // dispatch(updateGroupTitle(group, id))
            handleClose()
         }

      }
      if (param === "product") {
         if (str !== '') {
            const data = {Description: value}
            dispatch(updateProductTitle(data, id))
         }
      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
   }

   return (
      <BaseModal open={status} handleClose={handleClose} title={caption}>
         {error && <div className='error'>{errorText}</div>}
         <div className='input'>
            <div className='input__caption'>Введите название</div>
            <input className='input__field' value={value} onChange={onChangeHandler}/>
         </div>
         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
            <button style={{width: '100%'}} onClick={onClickHandler} disabled={buttonStatus === "loading"}
                    className={buttonStatus === 'loading' ? 'button load' : 'button'}>Сохранить
            </button>
         </div>
      </BaseModal>
   );
};

export default EditModal;
