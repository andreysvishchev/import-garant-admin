import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch} from "react-redux";
import Input from "../input/Input";
import {AppDispatchType} from "../../bll/store";
import {changeGroupTitle, changeProductTitle} from "../../bll/productsReducer";

type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    caption: string
    type: 'group' | 'product',
    id: string
}

const EditModal: React.FC<PropsType> = ({open, setOpen, title, caption, type, id}) => {

    const [value, setValue] = useState(title)
    const dispatch = useDispatch<AppDispatchType>()
    const handleClose = () => setOpen(false);

    const onClickHandler = () => {
        if (type === "group") {
            dispatch(changeGroupTitle(value, id))
        }
        if (type === "product") {
            dispatch(changeProductTitle(value, id))
        }
        handleClose()
    }
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
                        <div className='modal__title'>{caption}</div>
                        <Input name={'Введите название'} value={value} setValue={setValue}/>
                        <div className="modal__buttons">
                            <button style={{width: '100%'}}
                                    onClick={handleClose}
                                    className="button light">Закрыть
                            </button>
                            <button style={{width: '100%'}}
                                    onClick={onClickHandler}
                                    className="button">Сохранить
                            </button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default EditModal;