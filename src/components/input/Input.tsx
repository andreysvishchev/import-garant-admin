import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    name?: string
    value?: string | number
    onBlur?: (e: any) => void
    onChange?: (e: React.ChangeEvent<any>) => void
}

const Input: React.FC<PropsType> = (
    {
        title, value, name, onBlur, onChange
    }
) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e)
        }
    }


    return (
        <div className='input'>
            <div className='input__caption'>{title}</div>
            <input className='input__field'
                   onChange={onChangeHandler}
                   onBlur={onBlur}
                   value={value}
                   name={name}
            />
        </div>
    );
};

export default Input;