import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import TypeList from "../../pages/products/product/type-list/TypeList";
import BaseModal from "./BaseModal";
import {openProductTypeModal} from "../../bll/modalsReducer";


const ProductTypeModal = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const open = useAppSelector(state => state.modals.productType)
    const groups = useAppSelector(state => state.products.groups)
    const handleClose = () => dispatch(openProductTypeModal(false));
    const categories = useAppSelector(state => state.products.categories)
    const [openList, setOpenList] = useState(false)



    return (
        <BaseModal open={open} handleClose={handleClose} title={'Виды продукции'}>
            <div style={{marginTop: '0', marginBottom: '20px'}}
                 className="modal__buttons">
                <button style={{padding: '5px 15px'}} className='button'>Выбрать</button>
                <button style={{padding: '5px 15px'}} className='button'>Создать</button>
                <input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>
            </div>
            <div className="modal__list">
                <div className="modal__caption">Наименование</div>
                <div className='modal__items'>
                    {categories.map(el => {
                        return (
                            <TypeList key={el.Ref_Key} open={openList} data={groups}
                                      el={el}/>
                        )
                    })}
                </div>
            </div>
        </BaseModal>
    );
};

export default ProductTypeModal;