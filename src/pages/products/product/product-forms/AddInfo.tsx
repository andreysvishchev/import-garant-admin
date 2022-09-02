import React from 'react';
import Input from "../../../../components/input/Input";

const AddInfo = () => {
    return (
        <div>
            <div style={{
                width: '300px',
                height: '300px',
                backgroundColor: '#f1f1f1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                cursor: 'pointer'
            }}>
                Тут Будет фото
            </div>
            <Input name={'Доп поле для сайта'}/>
            <Input name={'Доп поле для сайта'}/>
            <Input name={'Доп поле для сайта'}/>
            <Input name={'Доп поле для сайта'}/>
            <Input name={'Доп поле для сайта'}/>
            <button style={{marginTop: '40px'}} className='button'>
                Сохранить
            </button>
        </div>
    );
};

export default AddInfo;