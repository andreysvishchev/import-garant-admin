import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import {openManufacturersModal, openNewManufacturerModal} from "../../bll/modalsReducer";
import ModalItem from "../modal-item/ModalItem";


const ManufacturersModal = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const open = useAppSelector(state => state.modals.manufacturers)
    const manufacturers = useAppSelector(state => state.products.manufacturer)
    const [selected, setSelected] = useState('')

  /*  useEffect(() => {
        dispatch(fetchManufacturer())
    }, [])*/

    const handleClose = () => dispatch(openManufacturersModal(false));
    const selectedHandler = (id: string) => setSelected(id)


    return (
        <BaseModal open={open} handleClose={handleClose} title={'Производители'}>
            <div style={{marginTop: '0', marginBottom: '20px'}}
                 className="modal__buttons">
   {/*             <button style={{padding: '5px 15px'}} className='button'>Выбрать</button>*/}
                <button style={{padding: '5px 15px'}}
                        onClick={() => dispatch(openNewManufacturerModal(true))}
                        className='button'>Создать
                </button>
                <input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>
            </div>
            <div className="modal__list">
                <div className="modal__caption">Наименование</div>
                <div className='modal__items'>
                    {
                        manufacturers.map(el => {
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

export default ManufacturersModal;