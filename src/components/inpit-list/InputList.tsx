import React from 'react';
import {v1} from "uuid";

type PropsType = {
    data: any []
    title: string
    value: string
}
const InputList: React.FC<PropsType> = ({data,title, value}) => {
    const id = v1()
    return (
        <div className='input-list'>
            <div className='input-list__caption'>{title}</div>
            <input className='input-list__field' list={id} value={value}/>
            <datalist id={id}>
                {data.map(el => {
                    return (
                        <option key={el.Ref_Key}
                                value={el.Description}>{el.Description}</option>
                    )
                })}
            </datalist>
        </div>
    );
};

export default InputList;