import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {openMarksModal, openNewMarkModal} from "../../store/modalsReducer";
import ModalItem from "../modal-item/ModalItem";
import {SelectedType} from "./ManufacturersModal";
import {updateManufacturer, updateMark} from "../../store/additionalReducer";

type PropsType = {
    changeMark: (data: any) => void
    currentManufacturer: string
}

const MarksModal = React.memo((props: PropsType) => {
    const dispatch = useDispatch<AppDispatchType>()
    const marks = useAppSelector(state => state.additionally.marks)
    const currentMarks = marks.filter(el=> el.Производитель_Key === props.currentManufacturer)
    const open = useAppSelector(state => state.modals.marks)
    const [selected, setSelected] = useState<SelectedType>({
        Ref_Key: '',
        Description: ''
    })
    /*  console.log(123)
      useEffect(() => {
          dispatch(fetchMarks())
      }, [])*/

    const handleClose = () => dispatch(openMarksModal(false));
    const selectedHandler = (id: string, title: string) => {
        setSelected({Ref_Key: id, Description: title})
    }
    const changeItemHandler = () => {
        if (selected.Ref_Key && selected.Description !== '') {
            props.changeMark(selected)
        }
        handleClose()
    }

    const updateMarkHandler = (data: any, id: string) => {
        dispatch(updateMark(data, id))
    }

    return (
        <BaseModal open={open} handleClose={handleClose} title={'Бренды'}>
            <div style={{marginTop: '0', marginBottom: '20px'}}
                 className="modal__buttons">
                <button style={{padding: '5px 15px'}} onClick={changeItemHandler} className='button'>Выбрать</button>
                <button style={{padding: '5px 15px'}} onClick={() => dispatch(openNewMarkModal(true))}
                        className='button'>Создать
                </button>
                <input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>
            </div>
            <div className="modal__list">
                <div className="modal__caption">Наименование</div>
                <div className='modal__items'>
                    {
                        currentMarks.map(el => {
                            return (
                                <ModalItem key={el.Ref_Key} data={el} selected={selected}
                                           setSelected={selectedHandler} changeTitle={updateMarkHandler}/>
                            )
                        })
                    }
                </div>
            </div>
        </BaseModal>

    )
});

export default MarksModal;