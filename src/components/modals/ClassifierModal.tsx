import React, {ChangeEvent, FormEvent, memo, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openClassifierModal} from "../../store/modalsReducer";
import {createClassifier} from "../../store/additionalReducer";

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
   const [code, setCode] = useState(classifier !== undefined ? classifier.Code : '')
   const [name, setName] = useState(classifier !== undefined ? classifier.Description : '')
   const [fullName, setFullName] = useState(classifier !== undefined ? classifier.НаименованиеПолное : '')

   const changeUnits = (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.currentTarget.value)
   }
   const changeCodeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.currentTarget.value)
   }
   const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value)
   }
   const changeFullNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setFullName(e.currentTarget.value)
   }
   const onblurHandler = () => {
      const foundEl = classifiers.find(el => el.Code.toLowerCase().includes(code.toLowerCase()))
      if (foundEl !== undefined) {
         setName(foundEl.Description)
         setFullName(foundEl.НаименованиеПолное)
         setValue(foundEl.ЕдиницаИзмерения_Key)
      }
   }

   const submitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
         Code: code,
         Description: name,
         НаименованиеПолное: fullName,
         ЕдиницаИзмерения_Key: value
      }
      const foundEl = classifiers.find(el => el.Code === data.Code)
      if (foundEl !== undefined) {
         console.log('ok')
         changeClassifier(data)
         handleClose()
      } else {
         dispatch(createClassifier(data))
         changeClassifier(data)
         handleClose()
      }
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'ТН ВЭД'}>
         <form onSubmit={submitHandler} style={{minWidth: '700px'}}>
            <div className="form__row">
               <div className='input-list'>
                  <div className='input-list__caption'>{'Код'}</div>
                  <input onChange={changeCodeHandler} onBlur={onblurHandler} autoFocus placeholder={'Введите код'}
                         className='input-list__field' list={'code-list'} value={code}/>
                  <datalist id={'code-list'}>
                     {classifiers.map(el => {
                        return (
                           <option key={el.Ref_Key}
                                   id={el.Ref_Key}
                                   value={el.Code}/>
                        )
                     })}
                  </datalist>
               </div>
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
            <div className="input">
               <div className="input__caption">Наименование</div>
               <input className="input__field" value={name} onChange={changeNameHandler}/>
            </div>
            <div className="input">
               <div className="input__caption">Полное наименование</div>
               <input className="input__field" value={fullName} onChange={changeFullNameHandler}/>
            </div>
            <div className="modal__buttons" style={{marginTop: '30px'}}>
               <button style={{width: '100%'}} onClick={handleClose} className="button light">Закрыть</button>
               <button style={{width: '100%'}} type='submit' className="button">Сохранить</button>
            </div>
         </form>
      </BaseModal>
   );
});


export default ClassifierModal;