import React from 'react';
import {Button, TextField} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../../bll/store";

const ProductNew = () => {
    const {id, groupId} = useParams()


    return (
        <div className='content'>
            <div className="content__top">
                    <Link className='content__back'
                          to={`/${id}/${groupId}`}>Назад</Link>
            </div>
            <div className="content__fields">
              1

            </div>

            <button className='button'>
                Сохранить
            </button>
        </div>
    );
};

export default ProductNew;