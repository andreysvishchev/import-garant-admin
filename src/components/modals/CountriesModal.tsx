import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openCountriesModal, openNewCountryModal} from "../../store/modalsReducer";
import ModalItem from "../modal-item/ModalItem";
import {SelectedType} from "./ManufacturersModal";
import {updateCountry, updateManufacturer} from "../../store/additionalReducer";

type PropsType = {
    changeCountry: (data: any) => void
}

const CountriesModal = React.memo((props: PropsType) => {
    const countries = useAppSelector(state => state.additionally.countries)
    const open = useAppSelector(state => state.modals.countries)
    const dispatch = useDispatch<AppDispatchType>()
    const handleClose = () => dispatch(openCountriesModal(false))
    const [selected, setSelected] = useState<SelectedType>({
        Ref_Key: '',
        Description: ''
    })
    const selectedHandler = (id: string, title: string) => {
        setSelected({Ref_Key: id, Description: title})
    }
    const changeItemHandler = () => {
        if (selected.Ref_Key && selected.Description !== '') {
            props.changeCountry(selected)
        }
        handleClose()
    }

    const updateCountryHandler = (data: any, id: string) => {
        dispatch(updateCountry(data, id))
    }

    return (
        <BaseModal open={open} handleClose={handleClose} title={'Страны'}>
            <div style={{marginTop: '0', marginBottom: '20px'}}
                 className="modal__buttons">
                <button style={{padding: '5px 15px'}} onClick={changeItemHandler} className='button'>Выбрать</button>
                {/*<button style={{padding: '5px 15px'}} onClick={() => dispatch(openNewCountryModal(true))}*/}
                {/*        className='button'>Создать*/}
                {/*</button>*/}
                {/*<input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>*/}
            </div>
            <div className="modal__list">
                <div className="modal__caption">Наименование</div>
                <div className='modal__items'>
                    {countries.map(el => {
                        return (
                            <ModalItem key={el.Ref_Key} data={el} selected={selected} country={true}
                                       setSelected={selectedHandler} changeTitle={updateCountryHandler}/>
                        )
                    })}
                </div>
            </div>
        </BaseModal>
    );
});

export default CountriesModal;