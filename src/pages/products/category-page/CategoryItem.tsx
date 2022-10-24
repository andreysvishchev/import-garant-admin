import React from 'react';
import {Link, useParams} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Checkbox} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PackIcon from '../../../img/pack.svg'
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../store/store";
import {openEditModal} from "../../../store/modalsReducer";

type PropsType = {
    data: any
}
const CategoryItem: React.FC<PropsType> = React.memo(({data}) => {
    const img = false
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatchType>()

    return (
        <div
            className={img ? 'content__item img' : 'content__item'}
            key={data.Ref_Key}>
            <Link className='content__link'
                  to={`/admin/${id}/${data.Ref_Key}`}>
                <img style={{marginRight: '15px'}} src={PackIcon} alt="icon"/>
                {data.Description}</Link>
            <div className='content__public content__col'>
                <Checkbox sx={{padding: '5px'}} color="success"/>
            </div>
            <div className='content__edit content__col'>
                <IconButton
                    onClick={() => dispatch(openEditModal(true, data.Ref_Key, data.Description, 'Название группы', 'group'))}
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

export default CategoryItem;