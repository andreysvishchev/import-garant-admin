import React, {ChangeEvent} from 'react';

type PropsType = {
    title: string
    name?: string
    value?: string | number
    onBlur?: (e: any) => void
    onChange?: (e: React.ChangeEvent<any>) => void
    placeholder: string
}

const Textarea: React.FC<PropsType> = (
    {
        title, value, name, onBlur, onChange, placeholder
    }
) => {

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <div className='textarea'>
            <div className='textarea__title'>{title}</div>
            <textarea className='textarea__field'
                      placeholder={placeholder}
                      onChange={onChangeHandler}
                      onBlur={onBlur}
                      value={value}
                      name={name}/>
        </div>


    );
};

export default Textarea;