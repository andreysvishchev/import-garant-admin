import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../../../components/modals/EditModal";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../bll/store";
import {openEditModal} from "../../../bll/modalsReducer";

type PropsType = {
    data: any
}
const GroupItem: React.FC<PropsType> = React.memo(({data}) => {
    const {id, groupId} = useParams()
    const dispatch = useDispatch<AppDispatchType>()
    const img = true;

    return (
        <div className={img ? 'content__item img' : 'content__item'} key={data.Ref_Key}>
            <div className='content__img'>картинка товара</div>
            <Link className='content__link'
                  to={`/products/${id}/${groupId}/${data.Ref_Key}`}>
                {data.Description}
            </Link>
            <div className='content__public content__col'>
                <Checkbox sx={{padding: '5px'}} color="success"/>
            </div>
            <div className='content__edit content__col'>
                <IconButton
                    onClick={() => dispatch(openEditModal(true, data.Ref_Key, data.Description, 'Название товара', 'product'))}
                    sx={{padding: '5px'}}>
                    <EditIcon/>
                </IconButton>
            </div>
            <div className='content__delete content__col'>
                <IconButton sx={{padding: '5px'}}>
                    <DeleteIcon/>
                </IconButton>
            </div>

        </div>
    );
});

export default GroupItem;