import React, { ChangeEvent, useEffect, useState } from 'react';

type PropsType = {
  title: string
  name?: string
  value?: string | number
  onBlur?: (e: any) => void
  onChange?: (e: React.ChangeEvent<any>) => void
  disabled?: boolean
  placeholder?: string
}

const Input: React.FC<PropsType> = ({ title, value, name, onBlur, onChange, disabled, placeholder }) => {

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
        placeholder={value === '' ? placeholder : undefined}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;


