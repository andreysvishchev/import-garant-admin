import {Typography} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addNewCategory} from "../../bll/productsReducer";
import Input from "../input/Input";
import {v1} from "uuid";
import {style} from "../../style/component-style";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
}

const CategoryModal: React.FC<PropsType> = ({open, setOpen}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false);

    const addNewCategoryHandler = () => {
        if (value !== '') {
            dispatch(addNewCategory({
                Description: value,
                IsFolder: true,
                Parent_Key: v1(),
                Ref_Key: v1(),
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
                        <div className='modal__title'>Новая категория</div>
                        <Input name={'Название категории'} value={value}
                               setValue={setValue}/>
                        <div className="modal__buttons">
                            <button style={{width: '100%'}}
                                    onClick={handleClose}
                                    className="button light">Закрыть
                            </button>
                            <button style={{ width: '100%'}}
                                    onClick={addNewCategoryHandler}
                                    className="button">Добавить
                            </button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    )
        ;
};

export default CategoryModal;