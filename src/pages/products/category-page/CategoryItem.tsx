import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import {Checkbox} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../../../components/Modals/EditModal";

type PropsType = {
    data: any
}
const CategoryItem: React.FC<PropsType> = React.memo(({data}) => {
    const [editModal, setEditModal] = useState(false)
    const img = false
    const {id} = useParams()

    return (
        <div
            className={img ? 'content__item img' : 'content__item'}
            key={data.Ref_Key}>
            <Link className='content__link'
                  to={`/${id}/${data.Ref_Key}`}>
                <IconButton
                    sx={{padding: '5px', marginRight: '10px'}}>
                    <FolderIcon/>
                </IconButton>
                {data.Description}</Link>
            <div className='content__public content__col'>
                <Checkbox sx={{padding: '5px'}} color="success"/>
            </div>
            <div className='content__edit content__col'>
                <IconButton onClick={()=> setEditModal(true)} sx={{padding: '5px'}}>
                    <EditIcon/>
                </IconButton>
            </div>
            <div className='content__delete content__col'>
                <IconButton sx={{padding: '5px'}}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <EditModal id={data.Ref_Key} open={editModal} setOpen={setEditModal} title={data.Description} caption={'Название группы'} type={"group"}/>
        </div>
    );
});

export default CategoryItem;