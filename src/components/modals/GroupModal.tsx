import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import Input from "../input/Input";
import {v1} from "uuid";
import {addNewGroup} from "../../bll/productsReducer";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import {openGroupModal} from "../../bll/modalsReducer";
import BaseModal from "./BaseModal";


type PropsType = {
    categoryId: string
}

const GroupModal: React.FC<PropsType> = ({categoryId}) => {
    const open = useAppSelector(state => state.modals.group)
    const [value, setValue] = useState('')
    const dispatch = useDispatch<AppDispatchType>()
    const handleClose = () => dispatch(openGroupModal(false))

    const addNewGroupHandler = () => {
        if (value !== '') {
            dispatch(addNewGroup({
                Description: value,
                IsFolder: false,
                Parent_Key: categoryId,
                Ref_Key: v1()
            }))
            setValue('')
            handleClose()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <BaseModal open={open} handleClose={handleClose} title={'Новая группа'}>
            <div className='input'>
                <div className='input__caption'>Название группы</div>
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
                        onClick={addNewGroupHandler}
                        className="button">Добавить
                </button>
            </div>
        </BaseModal>

    );
};

export default GroupModal;