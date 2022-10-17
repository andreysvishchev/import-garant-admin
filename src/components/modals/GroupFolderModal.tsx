import React, {ChangeEvent, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openGroupFolderModal} from "../../store/modalsReducer";
import {createGroupFolder} from "../../store/additionalReducer";

const GroupFolderModal = () => {
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.groupFolder)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)

   const [value, setValue] = useState('')

   const handleClose = () => dispatch(openGroupFolderModal(false))

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

   const addNewGroupFolder = () => {
      const data = {Description: value, IsFolder: true, Parent_Key: "25e24bee-cfd0-11e5-8a17-74d435b03623",}
      dispatch(createGroupFolder(data))
   }


   return (
      <BaseModal open={open} handleClose={handleClose} title={'Новая папка'}>
         <div className='input'>
            <div className='input__caption'>Название папки</div>
            <input className='input__field' value={value} onChange={onChangeHandler}/>
         </div>
         <div className="modal__buttons">
            <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
            <button style={{width: '100%'}} onClick={addNewGroupFolder} disabled={buttonStatus === "loading"}
                    className={buttonStatus === 'loading' ? 'button load' : 'button'}>Добавить
            </button>
         </div>

      </BaseModal>
   );
};


export default GroupFolderModal;