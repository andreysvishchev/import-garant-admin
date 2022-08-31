import React, {ChangeEvent, useEffect, useState} from 'react';
import Checkbox from "@mui/material/Checkbox";
import Input from "../../../../../../components/input/Input";
import Textarea from "../../../../../../components/textarea/Textarea";
import InputList from "../../../../../../components/inpit-list/InputList";
import {
    fetchCountries,
    fetchImporters,
    fetchManufacturer,
    fetchMarks
} from "../../../../../../bll/productsReducer";
import {AppDispatchType, useAppSelector} from "../../../../../../bll/store";
import {useDispatch} from "react-redux";
import CountriesModal from "../../../../../../components/Modal/CountriesModal";
import CountryNewModal from "../../../../../../components/Modal/CountryNewModal";
import ImportersModal from "../../../../../../components/Modal/ImportersModal";
import ImporterNewModal from "../../../../../../components/Modal/ImporterNewModal";
import MarksModal from "../../../../../../components/Modal/MarksModal";
import MarkNewModal from "../../../../../../components/Modal/MarkNewModal";
import ManufacturersModal from "../../../../../../components/Modal/ManufacturersModal";
import ManufacturerNewModal
    from "../../../../../../components/Modal/ManufacturerNewModal";

type PropsType = {
    product: any
}

const BaseInfo = ({product}: PropsType) => {
    const dispatch = useDispatch<AppDispatchType>()

    const [manufacturersModal, setManufacturersModal] = useState(false)
    const [manufacturerModal, setManufacturerModal] = useState(false)
    const [marksModal, setMarksModal] = useState(false)
    const [markModal, setMarkModal] = useState(false)
    const [importerModal, setImporterModal] = useState(false)
    const [importersModal, setImportersModal] = useState(false)
    const [countriesModal, setCountriesModal] = useState(false)
    const [countryModal, setCountryModal] = useState(false)

    const manufacturer = useAppSelector(state => state.products.manufacturer)
    const marks = useAppSelector(state => state.products.marks)
    const importers = useAppSelector(state => state.products.importers)
    const countries = useAppSelector(state => state.products.countries)

    const manufacturerValue = manufacturer.find(el => el.Ref_Key === product.Производитель_Key)
    const markValue = marks.find(el => el.Ref_Key === product.Марка_Key)
    const importerValue = importers.find(el => el.Ref_Key === product.ПроизводительИмпортерКонтрагент_Key)
    const countryValue = countries.find(el => el.Ref_Key === product.СтранаПроисхождения_Key)

    useEffect(() => {
        dispatch(fetchManufacturer())
        dispatch(fetchMarks())
        dispatch(fetchImporters())
        dispatch(fetchCountries())
    }, [])

    console.log(product)


    return (
        <>
            <form className='form'>
                <Input name={'Рабочее наименование'} value={product.Description}/>
                <Input name={'Наименование для печати '}
                       value={product.НаименованиеПолное}/>
                <Input name={'Артикул'} value={product.Артикул}/>
                <div className="form__row">
                    <Input name={'Код'} value={product.Code}/>
                    <Input name={'Код ТН ВЭД'} value={'????'}/>
                </div>
                <Textarea name='Описание' value={product.Описание}/>
                <div className="form__row">
                    <InputList
                        value={manufacturerValue?.Description}
                        data={manufacturer}
                        title={'Производитель'}/>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={()=> setManufacturerModal(true)}
                        className='button'>Добавить
                    </button>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={()=> setManufacturersModal(true)}
                        className='button'>Показать всех
                    </button>
                </div>
                <div className="form__row">
                    <InputList
                        value={markValue?.Description}
                        data={marks}
                        title={'Бренд'}/>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={()=> setMarkModal(true)}
                        className='button'>Добавить
                    </button>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={()=> setMarksModal(true)}
                        className='button'>Показать всех
                    </button>
                </div>
                <div className="form__row">
                    <InputList
                        value={importerValue?.Description}
                        data={importers}
                        title={'Импортер'}/>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={()=> setImporterModal(true)}
                        className='button'>Добавить
                    </button>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={()=> setImportersModal(true)}
                        className='button'>Показать всех
                    </button>
                </div>
                <div className="form__row">
                    <InputList
                        value={countryValue?.Description}
                        data={countries}
                        title={'Страна происхождения'}/>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={() => setCountryModal(true)}
                        className='button'>Добавить
                    </button>
                    <button
                        style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                        type='button'
                        onClick={() => setCountriesModal(true)}
                        className='button'>Показать всех
                    </button>
                </div>
                <button style={{marginTop: '40px'}} className='button'>
                    Сохранить
                </button>
            </form>

            <ManufacturerNewModal open={manufacturerModal} setOpen={setManufacturerModal}/>
            <ManufacturersModal  open={manufacturersModal} setOpen={setManufacturersModal} data={manufacturer}/>

            <MarkNewModal  open={markModal} setOpen={setMarkModal}/>
            <MarksModal open={marksModal} setOpen={setMarksModal} data={marks}/>

            <ImporterNewModal open={importerModal} setOpen={setImporterModal}/>
            <ImportersModal open={importersModal} setOpen={setImportersModal} data={importers} />

            <CountryNewModal open={countryModal} setOpen={setCountryModal}/>
            <CountriesModal open={countriesModal} setOpen={setCountriesModal}
                            data={countries}/>
        </>

    )
};

export default BaseInfo;