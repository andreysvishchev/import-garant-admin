import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openNewCountryModal} from "../../store/modalsReducer";
import {v1} from "uuid";
import {addNewCountry} from "../../store/additionalReducer";


type PropsType = {
    changeCountry: (data: any) => void
}
const CountryNewModal: React.FC<PropsType> = ({changeCountry}) => {
    const dispatch = useDispatch<AppDispatchType>()
    const open = useAppSelector(state => state.modals.newCountry)
    const [value, setValue] = useState('')
    const handleClose = () => dispatch(openNewCountryModal(false));
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addCountry = () => {
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
        dispatch(addNewCountry(data))
        changeCountry(data)
        setValue('')
        handleClose()
    }
    return (
        <BaseModal open={open} handleClose={handleClose} title={'Новая страна'}>
            <div className='input'>
                <div className='input__caption'>Название старны</div>
                <input className='input__field'
                       value={value}
                       onChange={onChangeHandler}/>
            </div>
            <div className="modal__buttons">
                <button style={{width: '100%'}} onClick={handleClose}
                        className="button light">Закрыть
                </button>
                <button style={{width: '100%'}} onClick={addCountry}
                        className="button">Добавить
                </button>
            </div>
        </BaseModal>
    );
};

export default CountryNewModal;