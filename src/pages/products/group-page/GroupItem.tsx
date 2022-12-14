import React from 'react';
import {Link, useParams} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../store/store";
import {openEditModal} from "../../../store/modalsReducer";

type PropsType = {
   data: any
}

const GroupItem: React.FC<PropsType> = React.memo(({data}) => {
   const {id, groupId} = useParams()
   const dispatch = useDispatch<AppDispatchType>()
   const img = true;

   return (
      <div className={img ? 'content__item img' : 'content__item'} key={data.Ref_Key}>
         <div className='content__img'>
            <img src={`http://192.168.226.6/admin/img.ashx?id=${data.Ref_Key}`} alt="картинка"/>
            {/*<img src={`/admin/img.ashx?id=${data.Ref_Key}`} alt="картинка"/>*/}
         </div>
         <Link className='content__link'
               to={`/admin/${id}/${groupId}/${data.Ref_Key}`}>
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