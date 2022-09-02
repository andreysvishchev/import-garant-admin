import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "../input/Input";
import {useDispatch} from "react-redux";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Checkbox} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppSelector} from "../../bll/store";
import TypeList from "../../pages/products/product/type-list/TypeList";

type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
    data: any[]

}

const ProductTypeModal: React.FC<PropsType> = ({open, setOpen, data}) => {
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false);
    const categories = useAppSelector(state => state.products.categories)

    const [openList, setOpenList] = useState(false)


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal">
                        <IconButton onClick={handleClose}
                                    sx={{padding: '5px', position: 'absolute', top: '5px', right: '5px'}}>
                            <CloseIcon/>
                        </IconButton>
                        <div className='modal__title'>Виды продуцкии</div>
                        <div style={{marginTop: '0', marginBottom: '20px'}} className="modal__buttons">
                            <button style={{padding: '5px 15px'}} className='button'>Выбрать</button>
                            <button style={{padding: '5px 15px'}} className='button'>Создать</button>
                            <input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>
                        </div>
                        <div className="modal__list">
                            <div className="modal__caption">Наименование</div>
                            <div className='modal__items'>
                                {categories.map(el => {
                                    return (

                                        <TypeList key={el.Ref_Key} open={openList} data={data} el={el}/>

                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ProductTypeModal;