import React from 'react';

type PropsType = {
    data: any []
    title: string
    value: string
}
const InputList: React.FC<PropsType> = ({data,title, value}) => {
    return (
        <div className='input-list'>
            <div className='input-list__caption'>{title}</div>
            <input className='input-list__field' list='prod' value={value}/>
            <datalist id='prod'>
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