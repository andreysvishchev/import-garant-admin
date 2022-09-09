import React, {ChangeEvent, useEffect, useState} from 'react';
import Input from "../../../../components/input/Input";
import Textarea from "../../../../components/textarea/Textarea";
import InputList from "../../../../components/input-list/InputList";
import {AppDispatchType, useAppSelector} from "../../../../bll/store";
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
    openCountriesModal, openManufacturersModal, openMarksModal,
    openNewCountryModal, openNewManufacturerModal, openNewMarkModal, openNoticeModal,
    openProductTypeModal
} from "../../../../bll/modalsReducer";
import {useFormik} from "formik";
import {v1} from "uuid";
import {updateProduct} from "../../../../bll/productsReducer";
import set = Reflect.set;

type PropsType = {
    product?: any
}


const BaseInfo = ({product}: PropsType) => {
        const dispatch = useDispatch<AppDispatchType>()

        const [importersModal, setImportersModal] = useState(false)
        const [importerNewModal, setImporterNewModal] = useState(false)

        const groups = useAppSelector(state => state.products.groups)
        const manufacturer = useAppSelector(state => state.products.manufacturer)
        const marks = useAppSelector(state => state.products.marks)
        const importers = useAppSelector(state => state.products.importers)
        const countries = useAppSelector(state => state.products.countries)

        let manufacturerValue = '';
        let markValue = '';
        let importerValue = '';
        let groupsValue = '';
        let countryValue = '';

        if (product) {
            const currentManufacturer = manufacturer.find(el => el.Ref_Key === product.Производитель_Key)
            if (currentManufacturer !== undefined) {
                manufacturerValue = currentManufacturer.Description
            }
            const currentMark = marks.find(el => el.Ref_Key === product.Марка_Key)
            if (currentMark !== undefined) {
                markValue = currentMark.Description
            }
            const currentGroups = groups.find(el => el.Ref_Key === product.ВидНоменклатуры_Key)
            if (currentGroups !== undefined) {
                groupsValue = currentGroups.Description
            }
            const currentCountry = countries.find(el => el.Ref_Key === product.СтранаПроисхождения_Key)
            if (currentCountry !== undefined) {
                countryValue = currentCountry.Description
            }
            const currentImporter = importers.find(el => el.Ref_Key === product.ПроизводительИмпортерКонтрагент_Key)
            if (currentImporter !== undefined) {
                importerValue = currentImporter.Description
            }
        }


        const [manufacturerKey, setManufacturerKey] = useState(product ? product.Производитель_Key : '')
        const [countryKey, setCountryKey] = useState(product ? product.СтранаПроисхождения_Key : '')
        const [groupKey, setGroupKey] = useState(product ? product.ВидНоменклатуры_Key : '')
        const [markKey, setMarkKey] = useState(product ? product.Марка_Key : '')


        const [manufacturerField, setManufacturerField] = useState(manufacturerValue)
        const [countryField, setCountryField] = useState(countryValue)
        const [markField, setMarkField] = useState(markValue)
        const [viewField, setViewField] = useState(groupsValue)
        const [importerField, setImporterField] = useState(importerValue)

        const viewFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setViewField(e.currentTarget.value)
            const currentView = groups.find(el => el.Description === e.currentTarget.value)
            if (currentView !== undefined) {
                setGroupKey(currentView.Ref_Key)
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


        const formik = useFormik({
            initialValues: {
                Ref_Key: product ? product.Ref_Key : v1(),
                Description: product ? product.Description : '',
                НаименованиеПолное: product ? product.НаименованиеПолное : '',
                Артикул: product ? product.Артикул : '',
                Code: product ? product.Code : '',
                КодТНВЭД_Key: product ? product.КодТНВЭД_Key : '',
                Описание: product ? product.Описание : '',
                Производитель_Key: manufacturerKey,
                СтранаПроисхождения_Key: countryKey,
                ВидНоменклатуры_Key: groupKey,
                Марка_Key: markKey
            },

            onSubmit: values => {
                values.Производитель_Key = manufacturerKey
                values.СтранаПроисхождения_Key = countryKey
                values.ВидНоменклатуры_Key = groupKey
                values.Марка_Key = markKey
                dispatch(updateProduct(values))
                if (product) {
                    dispatch(openNoticeModal(true, `Товар ${values.Description} сохранен`))
                } else {
                    dispatch(openNoticeModal(true, `Товар ${values.Description} добавлен`))
                }

                console.log(values)
            },
        })


        return (
            <>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <Input title={'Наименование для печати '}
                           name="Description"
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           value={formik.values.Description}/>
                    <Input title={'Рабочее наименование'}
                           name="НаименованиеПолное"
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           value={formik.values.НаименованиеПолное}/>
                    <div className="form__row">
                        <div className="form__col">
                            <Input title={'Артикул'}
                                   name="Артикул"
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   value={formik.values.Артикул}/>
                        </div>
                        <div className="form__col">
                            <InputList
                                value={viewField}
                                data={groups}
                                handler={viewFieldHandler}
                                title={'Вид продукции'}/>
                            <button
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 10px',
                                    height: '40px'
                                }}
                                type='button'
                                onClick={() => dispatch(openProductTypeModal(true))}
                                className='button'>Показать все
                            </button>
                        </div>
                    </div>
                    <div className="form__row">
                        <Input title={'Код'}
                               name="Code"
                               onBlur={formik.handleBlur}
                               onChange={formik.handleChange}
                               value={formik.values.Code}/>
                        <Input title={'Код ТН ВЭД'}
                               name="КодТНВЭД_Key"
                               onBlur={formik.handleBlur}
                               onChange={formik.handleChange}
                               value={formik.values.КодТНВЭД_Key}/>
                    </div>
                    <Textarea title='Описание'
                              name="Описание"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.Описание}
                    />
                    <div className="form__row">
                        <div className="form__col">
                            <InputList
                                value={manufacturerField}
                                handler={manufacturerFieldHandler}
                                data={manufacturer}
                                title={'Производитель'}/>
                            <button
                                type={'button'}
                                onClick={() => dispatch(openNewManufacturerModal(true))}
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 15px',
                                    height: '40px'
                                }}
                                className="button">+
                            </button>
                            <button style={{
                                marginTop: '6px',
                                padding: '8px 10px',
                                height: '40px'
                            }}
                                    type='button'
                                    onClick={() => dispatch(openManufacturersModal(true))}
                                    className='button'>Показать все
                            </button>
                        </div>
                        <div className="form__col">
                            <InputList
                                handler={markFieldHandler}
                                value={markField}
                                data={marks}
                                title={'Бренд'}/>
                            <button
                                type={'button'}
                                onClick={() => dispatch(openNewMarkModal(true))}
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 15px',
                                    height: '40px'
                                }}
                                className="button">+
                            </button>
                            <button
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 10px',
                                    height: '40px'
                                }}
                                type='button'
                                onClick={() => dispatch(openMarksModal(true))}
                                className='button'>Показать все
                            </button>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="form__col">
                            <InputList
                                handler={importerFieldHandler}
                                value={importerField}
                                data={importers}
                                title={'Импортер (Контрагент)'}/>
                            <button
                                type={'button'}
                                onClick={() => setImporterNewModal(true)}
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 15px',
                                    height: '40px'
                                }}
                                className="button">+
                            </button>
                            <button
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 10px',
                                    height: '40px'
                                }}
                                type='button'
                                onClick={() => setImportersModal(true)}
                                className='button'>Показать все
                            </button>
                        </div>
                        <div className="form__col">
                            <InputList
                                handler={countryFieldHandler}
                                value={countryField}
                                data={countries}
                                title={'Страна происхождения'}/>
                            <button
                                type={'button'}
                                onClick={() => dispatch(openNewCountryModal(true))}
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 15px',
                                    height: '40px'
                                }}
                                className="button">+
                            </button>
                            <button
                                style={{
                                    marginTop: '6px',
                                    padding: '8px 10px',
                                    height: '40px'
                                }}
                                type='button'
                                onClick={() => dispatch(openCountriesModal(true))}
                                className='button'>Показать все
                            </button>
                        </div>
                    </div>
                    <button type={'submit'} style={{marginTop: '40px'}} className='button'>
                        Сохранить
                    </button>
                </form>

                <ProductTypeModal/>

                <ManufacturerNewModal changeManufacturer={changeManufacturer}/>
                <ManufacturersModal/>

                <MarkNewModal changeMark={changeMark}/>
                <MarksModal/>

                <CountryNewModal changeCountry={changeCountry}/>
                <CountriesModal/>

                <ImporterNewModal open={importerNewModal} setOpen={setImporterNewModal}/>
                <ImportersModal open={importersModal} setOpen={setImportersModal}
                                data={importers}/>
            </>

        )
    }
;

export default BaseInfo;