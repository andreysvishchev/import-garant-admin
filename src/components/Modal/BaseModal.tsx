import {Typography} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addSection} from "../../bll/productsReducer";

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

const BaseModal: React.FC<PropsType> = ({open, setOpen}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addNewSection = () => {
        dispatch(addSection(value))
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
                        <TextField sx={{marginBottom: '20px'}}
                                   id="outlined-basic" label="Название категории"
                                   variant="outlined"
                                   value={value}
                                   onChange={onChangeHandler}
                        />
                        <Button onClick={addNewSection} variant="contained">Добавить</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
        ;
};

export default BaseModal;