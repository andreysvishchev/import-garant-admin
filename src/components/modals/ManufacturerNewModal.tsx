import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import {openNewManufacturerModal} from "../../bll/modalsReducer";
import BaseModal from "./BaseModal";
import {v1} from "uuid";
import {addNewManufacturer} from "../../bll/productsReducer";

type PropsType = {
    changeManufacturer: (data: any) => void
}

const ManufacturerNewModal = (props: PropsType) => {
    const dispatch = useDispatch<AppDispatchType>()
    const open = useAppSelector(state => state.modals.newManufacturer)
    const [value, setValue] = useState('')
    const handleClose = () => dispatch(openNewManufacturerModal(false));
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addManufacturer = () => {
        const data = {
            Ref_Key: v1(),
            DataVersion: "AAAAAAAAAAA=",
            DeletionMark: false,
            Parent_Key: "00000000-0000-0000-0000-000000000000",
            IsFolder: false,
            Description: value,
            Predefined: false,
            PredefinedDataName: ""
        }
        dispatch(addNewManufacturer(data))
        props.changeManufacturer(data)
        setValue('')
        handleClose()
    }


    return (
        <BaseModal open={open} handleClose={handleClose} title={'Новый производитель'}>
            <div className='input'>
                <div className='input__caption'>Название производителя</div>
                <input className='input__field'
                       value={value}
                       onChange={onChangeHandler}/>
            </div>
            <div className="modal__buttons">
                <button style={{width: '100%'}} onClick={handleClose}
                        className="button light">Закрыть
                </button>
                <button style={{width: '100%'}} onClick={addManufacturer}
                        className="button">Добавить
                </button>
            </div>
        </BaseModal>
    );
};

export default ManufacturerNewModal;