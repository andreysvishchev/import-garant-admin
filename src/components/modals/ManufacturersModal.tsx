import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import BaseModal from "./BaseModal";
import { AppDispatchType, useAppSelector } from "../../store/store";
import { openManufacturersModal, openNewManufacturerModal } from "../../store/modalsReducer";
import ModalItem from "../modal-item/ModalItem";
import { Description } from "@mui/icons-material";

type PropsType = {
  changeManufacturer: (data: any) => void
}

export type SelectedType = {
  Ref_Key: string,
  Description: string,
  Parent_Key?: string
}

const ManufacturersModal = (props: PropsType) => {
  const dispatch = useDispatch<AppDispatchType>()
  const open = useAppSelector(state => state.modals.manufacturers)
  const manufacturers = useAppSelector(state => state.additionally.manufacturer)
  const [selected, setSelected] = useState<SelectedType>({
    Ref_Key: '',
    Description: ''
  })

  /*  useEffect(() => {
        dispatch(fetchManufacturer())
    }, [])*/

  const handleClose = () => dispatch(openManufacturersModal(false));

  const selectedHandler = (id: string, title: string) => {
    setSelected({ Ref_Key: id, Description: title })
  }
  const changeItemHandler = () => {
    if (selected.Ref_Key && selected.Description !== '') {
      props.changeManufacturer(selected)
    }
    handleClose()
  }

  return (
    <BaseModal open={open} handleClose={handleClose} title={'Производители'}>
      <div style={{ marginTop: '0', marginBottom: '20px' }}
        className="modal__buttons">
        <button style={{ padding: '5px 15px' }} onClick={changeItemHandler} className='button'>Выбрать</button>
        <button style={{ padding: '5px 15px' }}
          onClick={() => dispatch(openNewManufacturerModal(true))}
          className='button'>Создать
        </button>
        <input type={"search"} className={'modal__search'} placeholder={'Поиск'} />
      </div>
      <div className="modal__list">
        <div className="modal__caption">Наименование</div>
        <div className='modal__items'>
          {
            manufacturers.map(el => {
              return (
                <ModalItem key={el.Ref_Key} data={el} selected={selected}
                  setSelected={selectedHandler} />
              )
            })
          }
        </div>
      </div>
    </BaseModal>
  )
};

export default ManufacturersModal;
