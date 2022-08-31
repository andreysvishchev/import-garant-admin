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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

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
                        <div className='modal__title'>Новая категория</div>

                        <Input name={'Название категории'} value={value}
                               setValue={setValue}/>
                        <button style={{marginTop: '25px', width: '100%'}}
                                onClick={addNewCategoryHandler}
                                className="button">Добавить
                        </button>

                    </div>
                </Box>
            </Modal>
        </>
    )
        ;
};

export default CategoryModal;