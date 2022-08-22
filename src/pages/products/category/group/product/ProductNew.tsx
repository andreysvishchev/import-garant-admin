import React from 'react';
import {Button, TextField} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../../bll/store";

const ProductNew = () => {
    const {id, groupId} = useParams()
    const state = useAppSelector(state => state.products)
    const catIndex = state.findIndex(i => i.id === id)
    const groupIndex = state[catIndex].categories.findIndex(i => i.id === groupId)
    const fields = state[catIndex].categories[groupIndex].list[0].fields

    return (
        <div className='content'>
            <div className="content__top">
                    <Link className='content__back'
                          to={`/products/${id}/${groupId}`}>Назад</Link>
            </div>
            <div className="content__fields">
                {fields.map((el, i) => {
                    return (
                        <TextField key={i} id="outlined-basic" label={el.name}
                                   variant="outlined"
                        />
                    )
                })}

            </div>

            <button className='button'>
                Сохранить
            </button>
        </div>
    );
};

export default ProductNew;