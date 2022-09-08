import React, {ReactNode} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
    children: ReactNode;
    open: boolean
    handleClose: () => void;
    title: string
}

const BaseModal: React.FC<PropsType> = (
    {children, open, handleClose, title}
) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <div className="modal">
                    <IconButton onClick={handleClose} sx={{
                        padding: '5px',
                        position: 'absolute',
                        top: '5px',
                        right: '5px'
                    }}>
                        <CloseIcon/>
                    </IconButton>
                    <div className='modal__title'>{title}</div>
                    {children}
                </div>
            </Box>
        </Modal>
    );
};

export default BaseModal;