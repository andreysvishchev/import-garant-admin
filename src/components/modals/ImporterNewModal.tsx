import React, {ChangeEvent, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch} from "react-redux";

type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
}

const ImporterNewModal: React.FC<PropsType> = ({open, setOpen, }) => {

    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
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
                        <div className='modal__title'>Новый импортер</div>
                        <div className='input'>
                            <div className='input__caption'>Название импортера</div>
                            <input className='input__field'
                                   value={value}
                                   onChange={onChangeHandler}
                            />
                        </div>
                        <div className="modal__buttons">
                            <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
                            <button style={{width: '100%'}} className="button">Добавить</button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ImporterNewModal;