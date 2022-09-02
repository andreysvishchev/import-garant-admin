import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "../input/Input";
import {useDispatch} from "react-redux";
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

const CountriesModal: React.FC<PropsType> = ({open, setOpen, data}) => {
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
                        <div className='modal__title'>Страны</div>
                        <div style={{marginTop: '0', marginBottom: '20px'}} className="modal__buttons">
                            <button style={{padding: '5px 15px'}} className='button'>Выбрать</button>
                            <button style={{padding: '5px 15px'}} className='button'>Создать</button>
                            <input type={"search"} className={'modal__search'} placeholder={'Поиск'}/>
                        </div>
                        <div className="modal__list">
                                <div className="modal__caption">Наименование</div>
                            <div className='modal__items'>
                                {data.map(el => {
                                    return (
                                        <div className={'modal-item'} key={el.Ref_Key}>
                                            <div className="modal-item__col"> {el.Description}</div>
                                            <div className="modal-item__col">
                                                <IconButton size={'small'} sx={{padding: '2px'}}>
                                                    <EditIcon style={{fontSize: '1.2rem'}}/>
                                                </IconButton>
                                            </div>
                                            <div className="modal-item__col">
                                                <IconButton size={'small'} sx={{padding: '2px'}}>
                                                    <DeleteIcon style={{fontSize: '1.2rem'}}/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default CountriesModal;