import React, {ChangeEvent, useState} from 'react';
import {v1} from "uuid";

type PropsType = {
    data: any []
    title: string
    value: string
    handler: (e: ChangeEvent<HTMLInputElement>) => void
}
const InputList: React.FC<PropsType> = (
    {
        data, title, value, handler
    }) => {
        const id = v1()
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            handler(e)
        }

        return (
            <div className='input-list'>
                <div className='input-list__caption'>{title}</div>
                <input onChange={onChangeHandler}
                       className='input-list__field'
                       list={id}
                       value={value}/>
                <datalist id={id}>
                    {data.map(el => {
                        return (
                            <option key={el.Ref_Key}
                                    id={el.Ref_Key}
                                    value={el.Description}/>
                        )
                    })}
                </datalist>
            </div>
        );
    }
;

export default InputList;