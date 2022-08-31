import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../style/component-style";
import Input from "../input/Input";

type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
}

const ManufacturerNewModal: React.FC<PropsType> = ({open, setOpen}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false);
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
                        <div className='modal__title'>Добавить производителя</div>
                        <Input name={'Название производителя'} value={value}
                               setValue={setValue}/>
                        <button style={{marginTop: '15px', width: '100%'}}
                                className="button">Добавить
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
};

export default ManufacturerNewModal;