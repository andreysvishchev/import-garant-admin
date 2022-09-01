import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../style/component-style";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Checkbox} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type PropsType = {
    open: boolean
    setOpen: (open: boolean) => void
    data: any[]
}

const MarksModal: React.FC<PropsType> = ({open, setOpen, data}) => {
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
                        <IconButton onClick={handleClose}
                                    sx={{padding: '5px', position: 'absolute', top: '5px', right: '5px'}}>
                            <CloseIcon/>
                        </IconButton>
                        <div className='modal__title'>Бренды</div>
                        <div className="modal__list">
                            <div className="modal__captions">
                                <div className="modal__caption">Наименование</div>
                                <div className="modal__caption"></div>
                                <div className="modal__caption"></div>
                                <div className="modal__caption"></div>
                            </div>
                            <div className='modal__items'>
                                {
                                    data.map(el => {
                                        return (

                                            <div className={'modal-item'} key={el.Ref_Key}>
                                                <div className="modal-item__col"> {el.Description}</div>
                                                <div className="modal-item__col">
                                                    <Checkbox size='small' sx={{padding: '5px'}} color="success"/>
                                                </div>
                                                <div className="modal-item__col">
                                                    <IconButton size='small' sx={{padding: '2px'}}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                                <div className="modal-item__col">
                                                    <IconButton size='small' sx={{padding: '2px'}}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="modal__buttons">
                            <button style={{width: '100%'}}
                                    onClick={handleClose}
                                    className="button light">Закрыть
                            </button>
                            <button style={{width: '100%'}}
                                    className="button">Сохранить
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
};

export default MarksModal;