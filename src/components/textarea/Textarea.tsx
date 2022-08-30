import React, {ChangeEvent} from 'react';

type PropsType = {
    name: string
    value?: string
    setValue?: (value: string) => void
    error?: boolean
    errorText?: string
}

const Textarea: React.FC<PropsType> = (
    {
        name, value, setValue,
        error, errorText
    }
) => {
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (setValue) {
            setValue(e.currentTarget.value)
        }
    }
    return (
        <div className='textarea'>
            <div className='textarea__title'>{name}</div>
            <textarea onChange={onChangeHandler} className='textarea__field'
                      value={value}/>
        </div>


    );
};

export default Textarea;