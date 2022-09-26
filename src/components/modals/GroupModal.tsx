import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {createNewGroup} from "../../store/productsReducer";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openGroupModal} from "../../store/modalsReducer";
import BaseModal from "./BaseModal";


type PropsType = {
   categoryId: string
}

const GroupModal: React.FC<PropsType> = React.memo(({categoryId}) => {
   const open = useAppSelector(state => state.modals.group)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)
   const [value, setValue] = useState('')
   const dispatch = useDispatch<AppDispatchType>()

   const handleClose = () => dispatch(openGroupModal(false))

   const addNewGroupHandler = () => {
      if (value !== '') {
         const newGroup = {Description: value, IsFolder: false, Parent_Key: categoryId,}
         dispatch(createNewGroup(newGroup))
         setValue('')
      }
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'Новая группа'}>
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
