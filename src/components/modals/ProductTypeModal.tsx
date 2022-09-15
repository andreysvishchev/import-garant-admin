import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatchType, useAppSelector } from "../../store/store";
import TypeList from "../../pages/products/product/type-list/TypeList";
import BaseModal from "./BaseModal";
import { openProductTypeModal } from "../../store/modalsReducer";
import { SelectedType } from './ManufacturersModal';

type PropsType = {
  currentGroup: any
  changeGroup: (data: any) => void
}

const ProductTypeModal = (props: PropsType) => {
  const dispatch = useDispatch<AppDispatchType>()
  const open = useAppSelector(state => state.modals.productType)
  const groups = useAppSelector(state => state.products.groups)
  const handleClose = () => dispatch(openProductTypeModal(false));
  const categories = useAppSelector(state => state.products.categories)
  const [openList, setOpenList] = useState(false)

  const [selected, setSelected] = useState<SelectedType>({
    Ref_Key: '',
    Description: '',
    Parent_Key: '',
  })

  const selectedHandler = (id: string, title: string, parentId: string) => {
    setSelected({ Ref_Key: id, Description: title, Parent_Key: parentId })
  }

  const changeItemHandler = () => {
    if (selected.Ref_Key && selected.Description !== '') {
      props.changeGroup(selected)
    }
    handleClose()
  }


  return (
    <BaseModal open={open} handleClose={handleClose} title={'Виды продукции'}>
      <div style={{ marginTop: '0', marginBottom: '20px' }}
        className="modal__buttons">
        <button style={{ padding: '5px 15px' }} onClick={changeItemHandler} className='button'>Выбрать</button>
        {/* <button style={{ padding: '5px 15px' }} className='button'>Создать</button> */}
        <input type={"search"} className={'modal__search'} placeholder={'Поиск'} />
      </div>
      <div className="modal__list">
        <div className="modal__caption">Наименование</div>
        <div className='modal__items'>
          {categories.map(el => {
            return (
              <TypeList selected={selected} setSelected={selectedHandler} key={el.Ref_Key} open={openList} data={groups}
                el={el} currentGroup={props.currentGroup} />
            )
          })}
        </div>
      </div>
    </BaseModal>
  );
};

export default ProductTypeModal;
