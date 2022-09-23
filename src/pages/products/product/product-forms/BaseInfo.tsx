import React, {ChangeEvent, useEffect, useState} from 'react';
import Input from "../../../../components/input/Input";
import Textarea from "../../../../components/textarea/Textarea";
import InputList from "../../../../components/input-list/InputList";
import {AppDispatchType, useAppSelector} from "../../../../store/store";
import {useDispatch} from "react-redux";
import CountriesModal from "../../../../components/modals/CountriesModal";
import ImportersModal from "../../../../components/modals/ImportersModal";
import MarksModal from "../../../../components/modals/MarksModal";
import ManufacturersModal from "../../../../components/modals/ManufacturersModal";
import CountryNewModal from "../../../../components/modals/CountryNewModal";
import ImporterNewModal from "../../../../components/modals/ImporterNewModal";
import MarkNewModal from "../../../../components/modals/MarkNewModal";
import ManufacturerNewModal from "../../../../components/modals/ManufacturerNewModal";
import ProductTypeModal from "../../../../components/modals/ProductTypeModal";
import {
    openClassifierModal,
    openCountriesModal, openManufacturersModal, openMarksModal,
    openNewCountryModal, openNewManufacturerModal, openNewMarkModal, openProductTypeModal
} from "../../../../store/modalsReducer";
import {useFormik} from "formik";
import {addNewProduct, updateProduct} from "../../../../store/productsReducer";
import Checkbox from '@mui/material/Checkbox';
import ClassifierModal from "../../../../components/modals/ClassifierModal";
import Print from "../../../../components/print/Print";




type PropsType = {
    product?: any
    currentGroup: any
    currentCategory: any
}

const BaseInfo = React.memo(({product, currentGroup, currentCategory}: PropsType) => {
    const dispatch = useDispatch<AppDispatchType>()

    const [importersModal, setImportersModal] = useState(false)
    const [importerNewModal, setImporterNewModal] = useState(false)

    const groups = useAppSelector(state => state.products.groups)
    const manufacturer = useAppSelector(state => state.additionally.manufacturer)
    const marks = useAppSelector(state => state.additionally.marks)
    const importers = useAppSelector(state => state.additionally.importers)
    const countries = useAppSelector(state => state.additionally.countries)
    const rates = useAppSelector(state => state.additionally.rates)
    const classifiers = useAppSelector(state => state.additionally.classifiers)
    const buttonStatus = useAppSelector(state => state.app.buttonStatus)


    const baseParam = '00000000-0000-0000-0000-000000000000';
    let manufacturerValue = '';
    let markValue = '';
    let importerValue = '';
    let groupsValue = currentGroup.Description;
    let countryValue = '';
    let ratesValue = '';
    let classifiersValue = '';


    if (product) {
        const currentManufacturer = manufacturer.find(el => el.Ref_Key === product.Производитель_Key)
        if (currentManufacturer !== undefined) {
            manufacturerValue = currentManufacturer.Description
        }
        const currentMark = marks.find(el => el.Ref_Key === product.Марка_Key)
        if (currentMark !== undefined) {
            markValue = currentMark.Description
        }
        const currentCountry = countries.find(el => el.Ref_Key === product.СтранаПроисхождения_Key)
        if (currentCountry !== undefined) {
            countryValue = currentCountry.Description
        }
        const currentImporter = importers.find(el => el.Ref_Key === product.ПроизводительИмпортерКонтрагент_Key)
        if (currentImporter !== undefined) {
            importerValue = currentImporter.Description
        }
        const currentRate = rates.find(el => el.Ref_Key === product.СтавкаНДС_Key)
        if (currentRate !== undefined) {
            ratesValue = currentRate.Description
        }
        const currentClassifier = classifiers.find(el => el.Ref_Key === product.КодТНВЭД_Key)
        if (currentClassifier !== undefined) {
            classifiersValue = currentClassifier.Code
        }
    }


    const [manufacturerKey, setManufacturerKey] = useState(product ? product.Производитель_Key : baseParam)
    const [countryKey, setCountryKey] = useState(product ? product.СтранаПроисхождения_Key : baseParam)
    const [groupKey, setGroupKey] = useState(currentGroup.Ref_Key)
    const [markKey, setMarkKey] = useState(product ? product.Марка_Key : baseParam)
    const [currentCategoryKey, setCurrentCategoryKey] = useState(currentCategory.Ref_Key)
    const [rateKey, setRateKey] = useState(product ? product.СтавкаНДС_Key : baseParam)
    const [classifierKey, setClassifierKey] = useState(product ? product.КодТНВЭД_Key : baseParam)

    const [manufacturerField, setManufacturerField] = useState(manufacturerValue)
    const [countryField, setCountryField] = useState(countryValue)
    const [markField, setMarkField] = useState(markValue)
    const [viewField, setViewField] = useState(groupsValue)
    const [importerField, setImporterField] = useState(importerValue)
    const [classifierField, setClassifierField] = useState(classifiersValue)

    const viewFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setViewField(e.currentTarget.value)
        const currentView = groups.find(el => el.Description === e.currentTarget.value)
        if (currentView !== undefined) {
            setGroupKey(currentView.Ref_Key)
            setCurrentCategoryKey(currentView.Parent_Key)
            console.log(currentCategoryKey);
        }
    }
    const manufacturerFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setManufacturerField(e.currentTarget.value)
        const currentManufacturer = manufacturer.find(el => el.Description === e.currentTarget.value)
        if (currentManufacturer !== undefined) {
            setManufacturerKey(currentManufacturer.Ref_Key)
        }
    }
    const markFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMarkField(e.currentTarget.value)
        const currentMark = marks.find(el => el.Description === e.currentTarget.value)
        if (currentMark !== undefined) {
            setMarkKey(currentMark.Ref_Key)
        }
    }
    const countryFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCountryField(e.currentTarget.value)
        const currentCountry = countries.find(el => el.Description === e.currentTarget.value)
        if (currentCountry !== undefined) {
            setCountryKey(currentCountry.Ref_Key)
        }
    }
    const importerFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setImporterField(e.currentTarget.value)
    }
    const changeManufacturer = (data: any) => {
        setManufacturerKey(data.Ref_Key)
        setManufacturerField(data.Description)
    }
    const changeCountry = (data: any) => {
        setCountryKey(data.Ref_Key)
        setCountryField(data.Description)
    }
    const changeMark = (data: any) => {
        setMarkKey(data.Ref_Key)
        setMarkField(data.Description)
    }
    const changeGroup = (data: any) => {
        setGroupKey(data.Ref_Key)
        setViewField(data.Description)
        setCurrentCategoryKey(data.Parent_Key)
    }
    const rateChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setRateKey(e.currentTarget.value)
    }
    const changeClassifier = (data: any) => {
        setClassifierField(data.Code)
        setClassifierKey(data.Ref_Key)
    }

    const formik = useFormik({
        initialValues: {
            Parent_Key: currentCategoryKey,
            Description: product ? product.Description : '',
            ТипНоменклатуры: product ? product.ТипНоменклатуры : '',
            НаименованиеПолное: product ? product.НаименованиеПолное : '',
            Артикул: product ? product.Артикул : '',
            Code: product ? product.Code : '',
            Описание: product ? product.Описание : '',
            КодТНВЭД_Key: classifierKey,
            Производитель_Key: manufacturerKey,
            СтранаПроисхождения_Key: countryKey,
            ВидНоменклатуры_Key: groupKey,
            Марка_Key: markKey,
            ВесИспользовать: product ? product.ВесИспользовать : false,
            ВесМожноУказыватьВДокументах: product ? product.ВесМожноУказыватьВДокументах : false,
            ОбъемИспользовать: product ? product.ОбъемИспользовать : false,
            ОбъемМожноУказыватьВДокументах: product ? product.ОбъемМожноУказыватьВДокументах : false,
            ДлинаИспользовать: product ? product.ДлинаИспользовать : false,
            ДлинаМожноУказыватьВДокументах: product ? product.ДлинаМожноУказыватьВДокументах : false,
            ПлощадьИспользовать: product ? product.ПлощадьИспользовать : false,
            ПлощадьМожноУказыватьВДокументах: product ? product.ПлощадьМожноУказыватьВДокументах : false,
            ВесЗнаменатель: product ? product.ВесЗнаменатель : 0,
            ВесЧислитель: product ? product.ВесЧислитель : 0,
            ОбъемЗнаменатель: product ? product.ОбъемЗнаменатель : 0,
            ОбъемЧислитель: product ? product.ОбъемЧислитель : 0,
            ДлинаЗнаменатель: product ? product.ДлинаЗнаменатель : 0,
            ДлинаЧислитель: product ? product.ДлинаЧислитель : 0,
            ПлощадьЗнаменатель: product ? product.ПлощадьЗнаменатель : 0,
            ПлощадьЧислитель: product ? product.ПлощадьЧислитель : 0,
            СтавкаНДС_Key: rateKey
        },
        onSubmit: values => {
            values.Parent_Key = currentCategoryKey
            values.КодТНВЭД_Key = classifierKey
            values.ВидНоменклатуры_Key = groupKey
            values.Производитель_Key = manufacturerKey
            values.СтранаПроисхождения_Key = countryKey
            values.ВидНоменклатуры_Key = groupKey
            values.Марка_Key = markKey
            values.СтавкаНДС_Key = rateKey
            console.log(values)
            if (product) {
                dispatch(updateProduct(values, product.Ref_Key))
            } else {
                dispatch(addNewProduct(values))
            }
        },
    })

    const printHandler = () => {
        window.print()
    }


    return (
        <>
            <form className='form' onSubmit={formik.handleSubmit}>
                <Input title={'Наименование для печати '} placeholder={'Введите наименование'} name="Description"
                       onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Description}/>
                <Input title={'Рабочее наименование'} placeholder={'Введите наименование'} name="НаименованиеПолное"
                       onBlur={formik.handleBlur} onChange={formik.handleChange}
                       value={formik.values.НаименованиеПолное}/>
                <div className="form__row">
                    <div className="form__col">
                        <Input title={'Артикул'} placeholder={'Введите артикул'} name="Артикул"
                               onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Артикул}/>
                    </div>
                    <div className="form__col">
                        <Input title={'Тип номенклатуры'} placeholder={'Введите тип номенклатуры'}
                               name="ТипНоменклатуры"
                               onBlur={formik.handleBlur} onChange={formik.handleChange}
                               value={formik.values.ТипНоменклатуры}/>
                    </div>
                    <div className="form__col">
                        <Input title={'Код'} placeholder={'Поле заполнится автоматически'} disabled={true}
                               name="Code" onBlur={formik.handleBlur} onChange={formik.handleChange}
                               value={formik.values.Code}/>
                    </div>
                </div>
                <div className="form__row">
                    <div className="form__col">
                        <div className='select'>
                            <div className='select__caption'>Ставка НДС</div>
                            <select className='select__field' value={rateKey}
                                    name='СтавкаНДС_Key' onChange={rateChangeHandler}>
                                <option value={baseParam}>Выберите ставку</option>
                                {rates.map(el => {
                                    return (
                                        <option key={el.Ref_Key} id={el.Ref_Key}
                                                value={el.Ref_Key}>{el.Description}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form__col">
                        <Input title={'Код ТН ВЭД'} placeholder={'Создайте кот ТНВЭД'}
                               name="КодТНВЭД_Key" disabled value={classifierField}/>
                        <button type={'button'} onClick={() => dispatch(openClassifierModal(true))}
                                style={{marginTop: '7px', padding: '8px 15px', height: '40px'}}
                                className="button">+
                        </button>
                    </div>
                </div>
                <Textarea title='Описание' name="Описание" placeholder={'Заполните описание'}
                          onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Описание}/>
                <div className="form__row">
                    <div className="form__col">
                        <InputList placeholder={'Выберте производителя'} value={manufacturerField}
                                   handler={manufacturerFieldHandler} data={manufacturer} title={'Производитель'}/>
                        <button type={'button'} onClick={() => dispatch(openNewManufacturerModal(true))}
                                style={{marginTop: '7px', padding: '8px 15px', height: '40px'}} className="button">+
                        </button>
                        <button style={{marginTop: '7px', padding: '8px 15px', height: '40px'}}
                                type='button' onClick={() => dispatch(openManufacturersModal(true))}
                                className='button'>Показать все
                        </button>
                    </div>
                    <div className="form__col">
                        <InputList handler={markFieldHandler} placeholder={'Выберте Марку/Бренд'}
                                   value={markField} data={marks} title={'Марка/Бренд'}/>
                        <button type={'button'} onClick={() => dispatch(openNewMarkModal(true))}
                                style={{marginTop: '7px', padding: '8px 15px', height: '40px'}} className="button">+
                        </button>
                        <button style={{marginTop: '7px', padding: '8px 15px', height: '40px'}} type='button'
                                onClick={() => dispatch(openMarksModal(true))} className='button'>Показать все
                        </button>
                    </div>
                </div>
                <div className="form__row">
                    <div className="form__col">
                        <InputList placeholder={'Выберте тип Продукции'} value={viewField} data={groups}
                                   handler={viewFieldHandler} title={'Вид продукции'}/>
                        <button style={{marginTop: '7px', padding: '8px 15px', height: '40px'}} type='button'
                                onClick={() => dispatch(openProductTypeModal(true))} className='button'>Показать все
                        </button>
                    </div>
                    <div className="form__col">
                        <InputList placeholder={'Выберте страну Происхождения'} handler={countryFieldHandler}
                                   value={countryField} data={countries} title={'Страна происхождения'}/>
                        <button type={'button'} onClick={() => dispatch(openNewCountryModal(true))}
                                style={{marginTop: '7px', padding: '8px 15px', height: '40px'}}
                                className="button">+
                        </button>
                        <button style={{marginTop: '7px', padding: '8px 15px', height: '40px'}} type='button'
                                onClick={() => dispatch(openCountriesModal(true))} className='button'>Показать все
                        </button>
                    </div>
                </div>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Вес</div>
                        <Checkbox sx={{padding: '5px'}}
                                  checked={formik.values.ВесИспользовать}
                                  {...formik.getFieldProps('ВесИспользовать')} />
                    </div>
                    {formik.values.ВесИспользовать &&
                        <div className='form__params'>
                            <div className="form__row">
                                <Input title='Количество штук' name="ВесЗнаменатель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ВесЗнаменатель}/>
                                <Input title='Вес еденицы' name="ВесЧислитель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ВесЧислитель}/>
                            </div>
                            <div className="form__row">
                                <div className='form__headline'>
                                    Указывать вес в документах
                                </div>
                                <Checkbox sx={{padding: '5px'}} size='small' color="success"
                                          checked={formik.values.ВесМожноУказыватьВДокументах}
                                          {...formik.getFieldProps('ВесМожноУказыватьВДокументах')} />
                            </div>
                        </div>
                    }
                </div>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Обем</div>
                        <Checkbox sx={{padding: '5px'}} checked={formik.values.ОбъемИспользовать}
                                  {...formik.getFieldProps('ОбъемИспользовать')} />
                    </div>
                    {formik.values.ОбъемИспользовать &&
                        <div className='form__params'>
                            <div className='form__row'>
                                <Input title='Количество штук' name="ОбъемЗнаменатель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ОбъемЗнаменатель}/>
                                <Input title='Обем еденицы' name="ОбъемЧислитель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ОбъемЧислитель}/>
                            </div>
                            <div className='form__row'>
                                <div>
                                    указывать объём в документах
                                </div>
                                <Checkbox sx={{padding: '5px'}} size='small' color="success"
                                          checked={formik.values.ОбъемМожноУказыватьВДокументах}
                                          {...formik.getFieldProps('ОбъемМожноУказыватьВДокументах')} />
                            </div>
                        </div>
                    }
                </div>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Длина</div>
                        <Checkbox sx={{padding: '5px'}} checked={formik.values.ДлинаИспользовать}
                                  {...formik.getFieldProps('ДлинаИспользовать')} />
                    </div>
                    {formik.values.ДлинаИспользовать &&
                        <div className='form__params'>
                            <div className="form__row">
                                <Input title='Количество штук' name="ДлинаЗнаменатель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ДлинаЗнаменатель}/>
                                <Input title='Длина еденицы' name="ДлинаЧислитель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ДлинаЧислитель}/>
                            </div>
                            <div className="form__row">
                                <div>Указывать длину в документах</div>
                                <Checkbox sx={{padding: '5px'}} checked={formik.values.ДлинаМожноУказыватьВДокументах}
                                          size='small' color="success"
                                          {...formik.getFieldProps('ДлинаМожноУказыватьВДокументах')} />
                            </div>
                        </div>
                    }
                </div>
                <div className="form__parameter">
                    <div className="form__row">
                        <div className='form__caption'>Площадь</div>
                        <Checkbox sx={{padding: '5px'}}
                                  checked={formik.values.ПлощадьИспользовать}
                                  {...formik.getFieldProps('ПлощадьИспользовать')} />
                    </div>
                    {formik.values.ПлощадьИспользовать &&
                        <div className='form__params'>
                            <div className="form__row">
                                <Input title='Количество штук' name="ПлощадьЗнаменатель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ПлощадьЗнаменатель}/>
                                <Input title='Площадь еденицы' name="ПлощадьЧислитель" onBlur={formik.handleBlur}
                                       onChange={formik.handleChange} value={formik.values.ПлощадьЧислитель}/>
                            </div>
                            <div className="form__row">
                                <div>Указывать площадь в документах</div>
                                <Checkbox sx={{padding: '5px'}} checked={formik.values.ПлощадьМожноУказыватьВДокументах}
                                          size='small' color="success"
                                          {...formik.getFieldProps('ПлощадьМожноУказыватьВДокументах')} />
                            </div>
                        </div>
                    }
                </div>
                <div className="form__buttons">
                    <button type={'submit'} disabled={buttonStatus === 'loading'}
                            className={buttonStatus === 'loading' ? 'button load' : 'button'}>
                        Сохранить
                    </button>
                    <Print formik={formik.values} rateValue={ratesValue} code={classifierField}
                           manufacturer={manufacturerField} country={countryField} mark={markField} view={viewField}/>
                </div>


            </form>

            <ProductTypeModal changeGroup={changeGroup} currentGroup={currentGroup}/>
            <ClassifierModal changeClassifier={changeClassifier} id={product ? product.КодТНВЭД_Key : ''}
                             unitId={product ? product.ЕдиницаИзмеренияТНВЭД_Key : ''}/>
            <ManufacturerNewModal changeManufacturer={changeManufacturer}/>
            <ManufacturersModal changeManufacturer={changeManufacturer}/>
            <MarkNewModal changeMark={changeMark} manufacturer={manufacturer}/>
            <MarksModal changeMark={changeMark} currentManufacturer={manufacturerKey}/>
            <CountryNewModal changeCountry={changeCountry}/>
            <CountriesModal changeCountry={changeCountry}/>
            <ImporterNewModal open={importerNewModal} setOpen={setImporterNewModal}/>
            <ImportersModal open={importersModal} setOpen={setImportersModal} data={importers}/>
        </>

    )
});

export default BaseInfo;
