import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {SelectedType} from "../modals/ManufacturersModal";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../store/store";
import {updateManufacturer} from "../../store/additionalReducer";

type PropsType = {
   data: any
   selected: SelectedType
   setSelected: (id: string, title: string) => void
   changeTitle: (data: any, id: string) => void
   country?: boolean
}

const ModalItem: React.FC<PropsType> = ({data, selected, setSelected, changeTitle, country}) => {
   const dispatch = useDispatch<AppDispatchType>()
   let [value, setValue] = useState(data.Description);
   const [editMode, setEditMode] = useState(false)
   const editModeOn = () => setEditMode(true)
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

   const activateViewMode = () => {
      setValue(value)
      changeTitle({Description: value}, data.Ref_Key)
      setEditMode(false);
      setSelected(data.Ref_Key, value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         setValue(value)
         changeTitle({Description: value}, data.Ref_Key)
         setEditMode(false);
         setSelected(data.Ref_Key, value)
      }
   }

   return (
      <div onClick={() => setSelected(data.Ref_Key, value)}
           className={selected.Ref_Key === data.Ref_Key ? 'modal-item active' : 'modal-item'}>
         {editMode ?
            <input className='edit-input' value={value} autoFocus onKeyPress={onKeyPressHandler}
                   onBlur={activateViewMode} onChange={onChangeHandler}/>
            :
            <div className="modal-item__col"> {value}</div>}
         {!country && <div className="modal-item__col">
            <IconButton onClick={editModeOn} size={'small'}
                        sx={{padding: '2px'}}>
               <EditIcon style={{fontSize: '1.2rem'}}/>
            </IconButton>
         </div>}
         {!country && <div className="modal-item__col">
            <IconButton size={'small'} sx={{padding: '2px'}}>
               <DeleteIcon style={{fontSize: '1.2rem'}}/>
            </IconButton>
         </div>}
      </div>

   );
};

export default ModalItem;
