import React, {ChangeEvent, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openCategoriesModal} from "../../store/modalsReducer";
import {createNewCategory} from "../../store/productsReducer";

const CategoryModal = () => {
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.category)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)

   const [value, setValue] = useState('')

   const handleClose = () => dispatch(openCategoriesModal(false))

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

   const addNewCategoryHandler = () => {
      if (value !== '') {
         const data = {Description: value, IsFolder: true}
         dispatch(createNewCategory(data))
         setValue('')
      }
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'Новая категория'}>
         <div className='input'>
            <div className='input__caption'>Название категории</div>
            <input className='input__field' value={value} onChange={onChangeHandler}/>
         </div>
         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
            <button style={{width: '100%'}} onClick={addNewCategoryHandler} disabled={buttonStatus === "loading"}
                    className={buttonStatus === 'loading' ? 'button load' : 'button'}>Добавить
            </button>
         </div>
      </BaseModal>
   );
};

export default CategoryModal;