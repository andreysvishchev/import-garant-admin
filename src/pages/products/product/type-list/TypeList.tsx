import React, {useState} from 'react';
import {SelectedType} from "../../../../components/modals/ManufacturersModal";

type PropsType = {
   data: any[]
   el: any
   open: boolean
   currentGroup: any
   selected: SelectedType
   setSelected: (id: string, title: string) => void
}
const TypeList = (props: PropsType) => {

   const [open, setOpen] = useState(false)

   const openListHandler = () => {
      setOpen(!open)
   }


   return (
      <>
         <div className={'modal-item-type'}>
            <div onClick={openListHandler} className="modal-item-type__caption"> {props.el.Description}</div>
            <div className="modal-item-type__list">
               {open &&
                  props.data.filter(item => item.Parent_Key === props.el.Ref_Key).map(elem => {
                     return (
                        <div key={elem.Ref_Key} id={elem.Ref_Key}
                             onClick={() => props.setSelected(elem.Ref_Key, elem.Description)}
                             className={props.selected.Ref_Key === elem.Ref_Key ? 'modal-item-type__element selected' : 'modal-item-type__element'}>{elem.Description}</div>
                     )
                  })
               }
            </div>
         </div>
      </>
   );
};

export default TypeList;
