import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    name: string
    value?: string
    setValue?: (value: string) => void
    error?: boolean
    errorText?: string
}

const Input: React.FC<PropsType> = (
    {
        name, value, setValue,
        error, errorText
    }
) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (setValue) {
            setValue(e.currentTarget.value)
        }
    }
    return (
        <div className='input'>
            <div className='input__caption'>{name}</div>
            <input onChange={onChangeHandler} className='input__field' type="text"
                   value={value}/>
        </div>
    );
};

export default Input;