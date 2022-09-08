import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "../input/Input";
import {useDispatch} from "react-redux";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Checkbox} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import {openCountriesModal, openNewCountryModal} from "../../bll/modalsReducer";
import {fetchCountries} from "../../bll/productsReducer";
import ModalItem from "../modal-item/ModalItem";

const CountriesModal = () => {
    const countries = useAppSelector(state => state.products.countries)
    const open = useAppSelector(state => state.modals.countries)
    const dispatch = useDispatch<AppDispatchType>()
    const handleClose = () => dispatch(openCountriesModal(false))
    const [selected, setSelected] = useState('')
    const selectedHandler = (id: string) => setSelected(id)
/*    useEffect(()=> {
        dispatch(fetchCountries)
    },[])*/

    return (
        <BaseModal open={open} handleClose={handleClose} title={'Страны'}>
            <div style={{marginTop: '0', marginBottom: '20px'}}
                 className="modal__buttons">
   {/*             <button style={{padding: '5px 15px'}} className='button'>Выбрать</button>*/}
                <button style={{padding: '5px 15px'}} onClick={()=> dispatch(openNewCountryModal(true))} className='button'>Создать</button>
                <input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>
            </div>
            <div className="modal__list">
                <div className="modal__caption">Наименование</div>
                <div className='modal__items'>
                    {countries.map(el => {
                        return (
                            <ModalItem key={el.Ref_Key} data={el} selected={selected}
                                       setSelected={selectedHandler}/>
                        )
                    })}
                </div>
            </div>
        </BaseModal>
    );
};

export default CountriesModal;