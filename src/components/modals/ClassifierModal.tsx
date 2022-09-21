import React, {ChangeEvent, memo, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openClassifierModal} from "../../store/modalsReducer";
import {Field, useFormik} from "formik";
import Input from "../input/Input";
import {addNewClassifier} from "../../store/additionalReducer";
import {v1} from "uuid";

type PropsType = {
    id: string
    unitId: string
    changeClassifier: (data: any) => void
};

const ClassifierModal: React.FC<PropsType> = memo(({id, unitId, changeClassifier}) => {
    const dispatch = useDispatch<AppDispatchType>()
    const open = useAppSelector(state => state.modals.classifier.status)
    const handleClose = () => dispatch(openClassifierModal(false))
    const classifiers = useAppSelector(state => state.additionally.classifiers)
    const classifier = classifiers.find(el => el.Ref_Key === id)
    const units = useAppSelector(state => state.additionally.units)
    const currentUnit = units.find(el => el.Ref_Key === unitId)
    const defaultCode = '00000000-0000-0000-0000-000000000000'
    const [value, setValue] = useState(currentUnit !== undefined ? currentUnit.Ref_Key : defaultCode)
    
    const changeUnits = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.currentTarget.value)
    }

    const formik = useFormik({
        initialValues: {
            Ref_Key: v1(),
            Code: classifier !== undefined ? classifier.Code : '',
            Description: classifier !== undefined ? classifier.Description : '',
            НаименованиеПолное: classifier !== undefined ? classifier.НаименованиеПолное : '',
            ЕдиницаИзмерения_Key: value
        },

        onSubmit: values => {
            values.ЕдиницаИзмерения_Key = value
            console.log(values)
            const classifier = classifiers.find(el => el.Code === values.Code)
            if (classifier === undefined) {
                console.log('создать новый')
            } else {
                console.log('поменять')
            }
            dispatch(addNewClassifier(values))
            changeClassifier(values)
            handleClose()
        },
    })
    return (
        <BaseModal open={open} handleClose={handleClose} title={'ТН ВЭД'}>
            <form onSubmit={formik.handleSubmit} style={{minWidth: '700px'}}>
                <div className="form__row">
                    <Input title={'Код '} name="Code" onBlur={formik.handleBlur} onChange={formik.handleChange}
                           value={formik.values.Code}/>
                    <div className="select">
                        <div className="select__caption">Еденица Измерения</div>
                        <select className='select__field' onChange={changeUnits} name="ЕдиницаИзмерения_Key"
                                value={value}>
                            <option value={defaultCode}>Выберите еденицу измерения</option>
                            {
                                units.map(el => {
                                    return (
                                        <option key={el.Ref_Key} value={el.Ref_Key}>{el.Description}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <Input title={'Наименование '} name="Description" onBlur={formik.handleBlur}
                       onChange={formik.handleChange} value={formik.values.Description}/>
                <Input title={'Полное наименование'} name="НаименованиеПолное" onBlur={formik.handleBlur}
                       onChange={formik.handleChange} value={formik.values.НаименованиеПолное}/>
                <div className="modal__buttons" style={{marginTop: '30px'}}>
                    <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
                    <button style={{width: '100%'}} type='submit' className="button">Сохранить</button>
                </div>
            </form>
        </BaseModal>
    );
});


export default ClassifierModal;