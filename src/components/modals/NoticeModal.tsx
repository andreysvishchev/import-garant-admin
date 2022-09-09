import React, {useState} from 'react';
import BaseModal from "./BaseModal";
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import {openMarksModal, openNoticeModal} from "../../bll/modalsReducer";

const NoticeModal = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const open = useAppSelector(state => state.modals.notice.status)
    const title = useAppSelector(state => state.modals.notice.title)
    const handleClose = () => dispatch(openNoticeModal(false, ''));


    return (
        <BaseModal open={open} handleClose={handleClose} title={title}>
            <button style={{margin: '10px auto 0'}} onClick={handleClose} className={'button'}>Закрыть</button>
        </BaseModal>
    );
};

export default NoticeModal;