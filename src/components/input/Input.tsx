import React from 'react';

type PropsType = {
    name: string
    value?: string
    error?: boolean
    errorText?: string
}

const Input: React.FC<PropsType> = (
    {
        name, value,
        error, errorText
    }
) => {
    return (
        <div className='input'>
                <div className='input__caption'>{name}</div>
                <input className='input__field' type="text" value={value}/>
        </div>
    );
};

export default Input;