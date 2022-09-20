import React, {ChangeEvent, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openCategoriesModal} from "../../store/modalsReducer";
import Input from "../input/Input";
import {addNewCategory, createNewCategory} from "../../store/productsReducer";
import {v1} from "uuid";

const CategoryModal = () => {
    const open = useAppSelector(state => state.modals.category)
    const dispatch = useDispatch<AppDispatchType>()
    const [value, setValue] = useState('')
    const handleClose = () => dispatch(openCategoriesModal(false))

    const addNewCategoryHandler = () => {
        if (value !== '') {
            const data = {
                Description: value,
                IsFolder: true
            }
            dispatch(createNewCategory(data))
            setValue('')
            handleClose()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <BaseModal open={open} handleClose={handleClose} title={'Новая категория'}>
            <div className='input'>
                <div className='input__caption'>Название категории</div>
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
                        onClick={addNewCategoryHandler}
                        className="button">Добавить
                </button>
            </div>
        </BaseModal>
    );
};

export default CategoryModal;