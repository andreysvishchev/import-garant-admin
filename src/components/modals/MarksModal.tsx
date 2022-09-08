import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import {openMarksModal, openNewMarkModal} from "../../bll/modalsReducer";
import {fetchMarks} from "../../bll/productsReducer";
import ModalItem from "../modal-item/ModalItem";


const MarksModal = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const marks = useAppSelector(state => state.products.marks)
    const open = useAppSelector(state => state.modals.marks)
    const [selected, setSelected] = useState('')

  /*  console.log(123)
    useEffect(() => {
        dispatch(fetchMarks())
    }, [])*/

    const handleClose = () => dispatch(openMarksModal(false));
    const selectedHandler = (id: string) => setSelected(id)

    return (
        <BaseModal open={open} handleClose={handleClose} title={'Бренды'}>
            <div style={{marginTop: '0', marginBottom: '20px'}}
                 className="modal__buttons">
  {/*              <button style={{padding: '5px 15px'}} className='button'>Выбрать</button>*/}
                <button style={{padding: '5px 15px'}} onClick={()=> dispatch(openNewMarkModal(true))} className='button'>Создать</button>
                <input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>
            </div>
            <div className="modal__list">
                <div className="modal__caption">Наименование</div>
                <div className='modal__items'>
                    {
                        marks.map(el => {
                            return (
                                <ModalItem key={el.Ref_Key} data={el} selected={selected}
                                           setSelected={selectedHandler}/>
                            )
                        })
                    }
                </div>
            </div>
        </BaseModal>

    )
};

export default MarksModal;