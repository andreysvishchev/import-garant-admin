import React, {ChangeEvent, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import Input from "../input/Input";
import {v1} from "uuid";
import {addNewGroup} from "../../bll/productsReducer";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";



type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
    categoryId: string
    /*  setRender: (render: boolean)=> void
      render: boolean*/
}

const GroupModal: React.FC<PropsType> = ({open, setOpen, categoryId}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false);
    const addNewGroupHandler = () => {
        if (value !== '') {
            dispatch(addNewGroup({
                Description: value,
                IsFolder: false,
                Parent_Key: categoryId,
                Ref_Key: v1()
            }))
            setValue('')
            handleClose()
        }
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
                        <IconButton onClick={handleClose} sx={{padding: '5px', position: 'absolute', top: '5px', right: '5px'}}>
                            <CloseIcon/>
                        </IconButton>
                        <div className='modal__title'>Новая группа</div>
                        <Input name={'Название группы'} value={value}
                               setValue={setValue}/>
                        <div className="modal__buttons">
                            <button style={{width: '100%'}}
                                    onClick={handleClose}
                                    className="button light">Закрыть
                            </button>
                            <button style={{ width: '100%'}}
                                    onClick={addNewGroupHandler}
                                    className="button">Добавить
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default GroupModal;