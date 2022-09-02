import React, {ChangeEvent, useEffect, useState} from 'react';
import Input from "../../../../components/input/Input";
import Textarea from "../../../../components/textarea/Textarea";
import InputList from "../../../../components/input-list/InputList";
import {AppDispatchType, useAppSelector} from "../../../../bll/store";
import {useDispatch} from "react-redux";
import CountriesModal from "../../../../components/Modals/CountriesModal";
import ImportersModal from "../../../../components/Modals/ImportersModal";
import MarksModal from "../../../../components/Modals/MarksModal";
import ManufacturersModal from "../../../../components/Modals/ManufacturersModal";
import CountryNewModal from "../../../../components/Modals/CountryNewModal";
import ImporterNewModal from "../../../../components/Modals/ImporterNewModal";
import MarkNewModal from "../../../../components/Modals/MarkNewModal";
import ManufacturerNewModal from "../../../../components/Modals/ManufacturerNewModal";
import ProductTypeModal from "../../../../components/Modals/ProductTypeModal";

type PropsType = {
    product?: any
}

const BaseInfo = ({product}: PropsType) => {
    const dispatch = useDispatch<AppDispatchType>()

    const [manufacturersModal, setManufacturersModal] = useState(false)
    const [marksModal, setMarksModal] = useState(false)
    const [importersModal, setImportersModal] = useState(false)
    const [countriesModal, setCountriesModal] = useState(false)
    const [productTypeModal, setProductTypeModal] = useState(false)

    const [countyNewModal, setCountryNewModal] = useState(false)
    const [markNewModal, setMarkNewModal] = useState(false)
    const [importerNewModal, setImporterNewModal] = useState(false)
    const [manufacturerNewModal, setManufacturerNewModal] = useState(false)

    const groups = useAppSelector(state => state.products.groups)
    const manufacturer = useAppSelector(state => state.products.manufacturer)
    const marks = useAppSelector(state => state.products.marks)
    const importers = useAppSelector(state => state.products.importers)
    const countries = useAppSelector(state => state.products.countries)

    let manufacturerValue
    let markValue
    let importerValue
    let countryValue
    let productType

    if (product) {
        manufacturerValue = manufacturer.find(el => el.Ref_Key === product.Производитель_Key)
        markValue = marks.find(el => el.Ref_Key === product.Марка_Key)
        importerValue = importers.find(el => el.Ref_Key === product.ПроизводительИмпортерКонтрагент_Key)
        countryValue = countries.find(el => el.Ref_Key === product.СтранаПроисхождения_Key)

    }

    return (
        <>
            <form className='form'>
                <Input name={'Рабочее наименование'} value={product ? product.Description : ''}/>
                <Input name={'Наименование для печати '}
                       value={product ? product.НаименованиеПолное : ''}/>
                <div className="form__row">
                    <div className="form__col">
                        <Input name={'Артикул'} value={product ? product.Артикул : ''}/>
                    </div>
                    <div className="form__col">
                        <InputList
                            value={manufacturerValue ? manufacturerValue.Description : ''}
                            data={groups}
                            title={'Вид продукции'}/>
                        <button
                            style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                            type='button'
                            onClick={() => setProductTypeModal(true)}
                            className='button'>Показать все
                        </button>
                    </div>
                </div>

                <div className="form__row">
                    <Input name={'Код'} value={product ? product.Code : ''}/>
                    <Input name={'Код ТН ВЭД'} value={''}/>
                </div>
                <Textarea name='Описание' value={product ? product.Описание : ''}/>
                <div className="form__row">
                    <div className="form__col">
                        <InputList
                            value={manufacturerValue ? manufacturerValue.Description : ''}
                            data={manufacturer}
                            title={'Производитель'}/>
                        <button
                            type={'button'}
                            onClick={() => setManufacturerNewModal(true)}
                            style={{marginTop: '6px', padding: '8px 15px', height: '40px'}}
                            className="button">+
                        </button>
                        <button
                            style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                            type='button'
                            onClick={() => setManufacturersModal(true)}
                            className='button'>Показать все
                        </button>
                    </div>
                    <div className="form__col">
                        <InputList
                            value={markValue ? markValue.Description : ''}
                            data={marks}
                            title={'Бренд'}/>
                        <button
                            type={'button'}
                            onClick={() => setMarksModal(true)}
                            style={{marginTop: '6px', padding: '8px 15px', height: '40px'}}
                            className="button">+
                        </button>
                        <button
                            style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                            type='button'
                            onClick={() => setMarksModal(true)}
                            className='button'>Показать все
                        </button>
                    </div>
                </div>
                <div className="form__row">
                    <div className="form__col">
                        <InputList
                            value={importerValue ? importerValue.Description : ''}
                            data={importers}
                            title={'Импортер (Контрагент)'}/>
                        <button
                            type={'button'}
                            onClick={() => setImporterNewModal(true)}
                            style={{marginTop: '6px', padding: '8px 15px', height: '40px'}}
                            className="button">+
                        </button>
                        <button
                            style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                            type='button'
                            onClick={() => setImportersModal(true)}
                            className='button'>Показать все
                        </button>
                    </div>
                    <div className="form__col">
                        <InputList
                            value={countryValue ? countryValue.Description : ''}
                            data={countries}
                            title={'Страна происхождения'}/>
                        <button
                            type={'button'}
                            onClick={() => setCountryNewModal(true)}
                            style={{marginTop: '6px', padding: '8px 15px', height: '40px'}}
                            className="button">+
                        </button>
                        <button
                            style={{marginTop: '6px', padding: '8px 10px', height: '40px'}}
                            type='button'
                            onClick={() => setCountriesModal(true)}
                            className='button'>Показать все
                        </button>
                    </div>
                </div>
                <div className="form__row">
                    <Input name={'Сертификат (Номер, дата)'}/>
                    <input type="file"/>
                    <a href="" download className="">скачать</a>
                </div>
                <button style={{marginTop: '40px'}} className='button'>
                    Сохранить
                </button>
            </form>

            <ProductTypeModal open={productTypeModal} setOpen={setProductTypeModal} data={groups}/>

            <ManufacturersModal open={manufacturersModal} setOpen={setManufacturersModal} data={manufacturer}/>
            <ManufacturerNewModal open={manufacturerNewModal} setOpen={setManufacturerNewModal}/>

            <MarkNewModal open={markNewModal} setOpen={setMarkNewModal}/>
            <MarksModal open={marksModal} setOpen={setMarksModal} data={marks}/>

            <ImporterNewModal open={importerNewModal} setOpen={setImporterNewModal}/>
            <ImportersModal open={importersModal} setOpen={setImportersModal} data={importers}/>

            <CountryNewModal open={countyNewModal} setOpen={setCountryNewModal}/>
            <CountriesModal open={countriesModal} setOpen={setCountriesModal}
                            data={countries}/>
        </>

    )
};

export default BaseInfo;