import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../style/component-style";

type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
    data: any[]
}


const ManufacturersModal: React.FC<PropsType> = ({open, setOpen, data}) => {
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
                        <div className='modal__title'>Производители</div>
                        {
                            data.map(el => {
                                return (
                                    <span key={el.Ref_Key}>{el.Description}</span>
                                )
                            })
                        }
                        <button style={{marginTop: '15px', width: '100%'}}
                                className="button">Добавить
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
};

export default ManufacturersModal;