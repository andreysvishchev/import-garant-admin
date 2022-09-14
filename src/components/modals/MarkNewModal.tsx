import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openNewMarkModal} from "../../store/modalsReducer";
import {v1} from "uuid";
import {addNewMark} from "../../store/additionalReducer";

type PropsType = {
    changeMark: (data: any) => void
}
const MarkNewModal: React.FC<PropsType> = ({changeMark}) => {
    const dispatch = useDispatch<AppDispatchType>()
    const open = useAppSelector(state => state.modals.newMark)
    const [value, setValue] = useState('')
    const handleClose = () => dispatch(openNewMarkModal(false));
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addMark = () => {
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
        dispatch(addNewMark(data))
        changeMark(data)
        setValue('')
        handleClose()
    }

    return (
        <BaseModal open={open} handleClose={handleClose} title={'Новый бренд'}>
            <div className='input'>
                <div className='input__caption'>Название бренда</div>
                <input className='input__field'
                       value={value}
                       onChange={onChangeHandler}
                />
            </div>
            <div className="modal__buttons">
                <button style={{width: '100%'}} onClick={handleClose}
                        className="button light">Закрыть
                </button>
                <button style={{width: '100%'}} onClick={addMark}
                        className="button">Добавить
                </button>
            </div>
        </BaseModal>
    );
};

export default MarkNewModal;