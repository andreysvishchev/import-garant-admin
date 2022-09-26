import React, {ChangeEvent, FormEvent, memo, useState} from 'react';
import BaseModal from "./BaseModal";
import {AppDispatchType, store, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {openClassifierModal} from "../../store/modalsReducer";
import {addNewClassifier, updateClassifier} from "../../store/additionalReducer";
import {api as apiF} from "../../api/api";

type PropsType = {
   id: string
   unitId: string
   changeClassifier: (data: any) => void
};

const ClassifierModal: React.FC<PropsType> = memo(({id, unitId, changeClassifier}) => {
   const dispatch = useDispatch<AppDispatchType>()
   const open = useAppSelector(state => state.modals.classifier.status)

   const classifiers = useAppSelector(state => state.additionally.classifiers)
   const classifier = classifiers.find(el => el.Ref_Key === id)
   const units = useAppSelector(state => state.additionally.units)
   const currentUnit = units.find(el => el.Ref_Key === unitId)
   const buttonStatus = useAppSelector(state => state.app.buttonStatus)
   const defaultCode = '00000000-0000-0000-0000-000000000000'

   const [value, setValue] = useState(currentUnit !== undefined ? currentUnit.Ref_Key : defaultCode)
   const [code, setCode] = useState(classifier !== undefined ? classifier.Code : '')
   const [name, setName] = useState(classifier !== undefined ? classifier.Description : '')
   const [fullName, setFullName] = useState(classifier !== undefined ? classifier.НаименованиеПолное : '')
   const [error, setError] = useState(false)

   const handleClose = () => dispatch(openClassifierModal(false))

   const changeUnits = (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.currentTarget.value)
   }
   const changeCodeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.currentTarget.value)
      setError(false)
   }
   const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value)
      setError(false)
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
      if (code === '' && name === '') {
         const foundEl = classifiers.find(el => el.Code === code)
         if (foundEl !== undefined) {
            const data = {
               Ref_Key: foundEl.Ref_Key,
               Code: code,
               Description: name,
               НаименованиеПолное: fullName,
               ЕдиницаИзмерения_Key: value
            }
            if (classifier !== undefined) {
               dispatch(updateClassifier(data, foundEl.Ref_Key))
               changeClassifier(data)
               handleClose()
            } else {
               changeClassifier(data)
               handleClose()
            }
         } else {
            const data = {
               Code: code,
               Description: name,
               НаименованиеПолное: fullName,
               ЕдиницаИзмерения_Key: value
            }
            const api = apiF(store.getState().app.instance)
            api.createClassifiers(data).then(res => {
               dispatch(addNewClassifier(res.data))
               changeClassifier(res.data)
               handleClose()
            })
         }
      } else {
         setError(true)
      }
   }

   return (
      <BaseModal open={open} handleClose={handleClose} title={'ТН ВЭД'}>
         <form onSubmit={submitHandler} style={{minWidth: '700px'}}>
            {error && <div className="form__error">Поле Код и Наименование должны быть заполнены</div>}
            <div className="form__row">
               <div className='input-list'>
                  <div className='input-list__caption'>{'Код'}</div>
                  <input onChange={changeCodeHandler} onBlur={onblurHandler} autoFocus placeholder={'Введите код'}
                         className='input-list__field' list={'code-list'} value={code}/>
                  <datalist id={'code-list'}>
                     {classifiers.map(el => {
                        return (
                           <option key={el.Ref_Key} id={el.Ref_Key} value={el.Code}/>
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
               <button style={{width: '100%'}} disabled={buttonStatus === 'loading'} type='submit'
                       className={buttonStatus === 'loading' ? 'button load' : 'button'}>Сохранить</button>
            </div>
         </form>
      </BaseModal>
   );
});


export default ClassifierModal;