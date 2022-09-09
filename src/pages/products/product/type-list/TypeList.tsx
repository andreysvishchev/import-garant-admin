import React, {useState} from 'react';

type PropsType = {
    data: any[]
    el: any
    open: boolean

}
const TypeList = (props: PropsType) => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <div className={'modal-item-type'}>
                <div onClick={() => setOpen(!open)} className="modal-item-type__caption"> {props.el.Description}</div>
                <div className="modal-item-type__list">
                    { open &&
                        props.data.filter(item => item.Parent_Key === props.el.Ref_Key).map(elem => {
                            return (
                                <div
                                    className='modal-item-type__element'>{elem.Description}</div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default TypeList;