import React, {ChangeEvent, useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch} from "react-redux";
import Input from "../input/Input";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import {changeGroupTitle, changeProductTitle} from "../../bll/productsReducer";
import BaseModal from "./BaseModal";
import {openEditModal} from "../../bll/modalsReducer";


const EditModal = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const status = useAppSelector(state => state.modals.edit.status)
    const title = useAppSelector(state => state.modals.edit.title)
    const id = useAppSelector(state => state.modals.edit.id)
    const param = useAppSelector(state => state.modals.edit.param)
    const caption = useAppSelector(state => state.modals.edit.caption)
    const [value, setValue] = useState(title)

    useEffect(()=> {
        setValue(title)
    },[title])

    const handleClose = () => dispatch(openEditModal(false, '', '', '', ''));
    const onClickHandler = () => {
        if (param === "group") {
            dispatch(changeGroupTitle(value, id))
        }
        if (param === "product") {
            dispatch(changeProductTitle(value, id))
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
                <button style={{width: '100%'}}
                        onClick={handleClose}
                        className="button light">Закрыть
                </button>
                <button style={{width: '100%'}}
                        onClick={onClickHandler}
                        className="button">Сохранить
                </button>
            </div>
        </BaseModal>
    );
};

export default EditModal;