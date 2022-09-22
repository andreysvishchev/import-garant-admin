import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatchType, useAppSelector } from "../../store/store";
import { updateGroupTitle, updateProductTitle } from "../../store/productsReducer";
import BaseModal from "./BaseModal";
import { openEditModal } from "../../store/modalsReducer";


const EditModal = () => {
  const dispatch = useDispatch<AppDispatchType>()
  const status = useAppSelector(state => state.modals.edit.status)
  const title = useAppSelector(state => state.modals.edit.title)
  const id = useAppSelector(state => state.modals.edit.id)
  const param = useAppSelector(state => state.modals.edit.param)
  const caption = useAppSelector(state => state.modals.edit.caption)
  const [value, setValue] = useState(title)

  useEffect(() => {
    setValue(title)
  }, [title])

  const handleClose = () => dispatch(openEditModal(false, '', '', '', ''));
  const onClickHandler = () => {
    if (param === "group") {
      const group = {
        Description: value
      }
      dispatch(updateGroupTitle(group, id))
    }
    if (param === "product") {
      const data = {
        Description: value
      }
      dispatch(updateProductTitle(data, id))
    }
    handleClose()
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <BaseModal open={status} handleClose={handleClose} title={caption}>
      <div className='input'>
        <div className='input__caption'>Введите название</div>
        <input className='input__field'
          value={value}
          onChange={onChangeHandler}
        />
      </div>
      <div className="modal__buttons">
        <button style={{ width: '100%' }}
          onClick={handleClose}
          className="button light">Закрыть
        </button>
        <button style={{ width: '100%' }}
          onClick={onClickHandler}
          className="button">Сохранить
        </button>
      </div>
    </BaseModal>
  );
};

export default EditModal;
