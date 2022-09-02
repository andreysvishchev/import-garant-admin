import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../bll/store";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Input from "../../../components/input/Input";
import Textarea from "../../../components/textarea/Textarea";
import InputList from "../../../components/input-list/InputList";
import {
    fetchCountries,
    fetchImporters,
    fetchManufacturer,
    fetchMarks
} from "../../../bll/productsReducer";
import {useDispatch} from "react-redux";
import ManufacturersModal from "../../../components/Modals/ManufacturersModal";
import MarksModal from "../../../components/Modals/MarksModal";
import ImportersModal from "../../../components/Modals/ImportersModal";
import CountriesModal from "../../../components/Modals/CountriesModal";
import Checkbox from "@mui/material/Checkbox";
import BaseInfo from "./product-forms/BaseInfo";
import AddInfo from "./product-forms/AddInfo";

const ProductNewPage = () => {
    const {id, groupId} = useParams()
    const dispatch = useDispatch<AppDispatchType>()

    const [manufacturersModal, setManufacturersModal] = useState(false)
    const [marksModal, setMarksModal] = useState(false)
    const [importersModal, setImportersModal] = useState(false)
    const [countriesModal, setCountriesModal] = useState(false)

    const manufacturer = useAppSelector(state => state.products.manufacturer)
    const marks = useAppSelector(state => state.products.marks)
    const importers = useAppSelector(state => state.products.importers)
    const countries = useAppSelector(state => state.products.countries)

    const [weight, setWeight] = useState<boolean>(false)
    const [indicateWeightInDoc, setIndicateWeightInDoc] = useState(false)
    const activateWeight = (e: ChangeEvent<HTMLInputElement>) => {
        setWeight(e.currentTarget.checked)
    }
    const indicateWeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateWeightInDoc(e.currentTarget.checked)
    }
    const [size, setSize] = useState<boolean>(false)
    const [indicateSizeInDoc, setIndicateSizeInDoc] = useState(false)
    const activateSize = (e: ChangeEvent<HTMLInputElement>) => {
        setSize(e.currentTarget.checked)
    }
    const indicateSizeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateSizeInDoc(e.currentTarget.checked)
    }
    const [length, setLength] = useState<boolean>(false)
    const [indicateLengthInDoc, setIndicateLengthInDoc] = useState(false)
    const activateLength = (e: ChangeEvent<HTMLInputElement>) => {
        setLength(e.currentTarget.checked)
    }
    const indicateLengthHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateLengthInDoc(e.currentTarget.checked)
    }
    const [area, setArea] = useState<boolean>(false)
    const [indicateAreaInDoc, setIndicateAreaInDoc] = useState(false)
    const activateArea = (e: ChangeEvent<HTMLInputElement>) => {
        setArea(e.currentTarget.checked)
    }
    const indicateAreaHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIndicateAreaInDoc(e.currentTarget.checked)
    }

    const categories = useAppSelector(state => state.products.categories)
    const groups = useAppSelector(state => state.products.groups)
    const currentCategory = categories.find(el => el.Ref_Key === id)
    const currentGroup = groups.find(el => el.Ref_Key === groupId)


    useEffect(() => {
        dispatch(fetchManufacturer())
        dispatch(fetchMarks())
        dispatch(fetchImporters())
        dispatch(fetchCountries())
    }, [])


    return (
        <div className='content'>
            <div className="content__top">
                 <div className='breadcrumbs'>
                    <Link className='breadcrumbs__link'
                          to={`/${id}`}>{currentCategory.Description}</Link>
                    <Link className='breadcrumbs__link'
                          to={`/${id}/${groupId}`}>{currentGroup.Description}</Link>
                    <div className='breadcrumbs__item'>Новый продукт</div>
                </div>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Основная информация</Tab>
                    <Tab>Информация о упаковке</Tab>
                    <Tab>Информация для сайта</Tab>
                </TabList>

                <TabPanel>
                    <div className="content__fields">
                     <BaseInfo />
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="content__fields">
                        <div>
                            <form className='form'>
                                <div className="form__parameter">
                                    <div className="form__row">
                                        <div className='form__caption'>Вес</div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  onChange={activateWeight}
                                                  checked={weight}/>
                                    </div>
                                    <input className='hidden'/>
                                    <input className='hidden'/>
                                    {weight &&
                                    <div className='form__params'>
                                        <div className="form__row">
                                            <Input name='Вес 1'/>
                                            <Input name='Вес 2'/>
                                        </div>
                                        <div className="form__row">
                                            <div className='form__headline'>
                                                Указывать вес в документах
                                            </div>
                                            <Checkbox sx={{padding: '5px'}}
                                                      size='small'
                                                      color="success"
                                                      onChange={indicateWeightHandler}
                                                      checked={indicateWeightInDoc}/>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <div className="form__parameter">
                                    <div className="form__row">
                                        <div className='form__caption'>Обем</div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  onChange={activateSize}
                                                  checked={size}/>
                                    </div>
                                    <input className='hidden'/>
                                    <input className='hidden'/>
                                    {size &&
                                    <div className='form__params'>
                                        <div className='form__row'>
                                            <Input name='Обем 1'/>
                                            <Input name='Обем 2'/>
                                        </div>
                                        <div className='form__row'>
                                            <div>
                                                указывать объём в документах
                                            </div>
                                            <Checkbox sx={{padding: '5px'}}
                                                      size='small'
                                                      color="success"
                                                      onChange={indicateSizeHandler}
                                                      checked={indicateSizeInDoc}/>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <div className="form__parameter">
                                    <div className="form__row">
                                        <div className='form__caption'>Длина</div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  onChange={activateLength}
                                                  checked={length}/>
                                    </div>
                                    <input className='hidden'/>
                                    <input className='hidden'/>

                                    {length &&
                                    <div className='form__params'>
                                        <div className="form__row">
                                            <Input name='Длина 1'/>
                                            <Input name='Длина 2'/>
                                        </div>
                                        <div className="form__row">
                                            <div>
                                                Указывать длину в документах
                                            </div>
                                            <Checkbox sx={{padding: '5px'}}
                                                      size='small'
                                                      color="success"
                                                      onChange={indicateLengthHandler}
                                                      checked={indicateLengthInDoc}/>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <div className="form__parameter">
                                    <div className="form__row">
                                        <div className='form__caption'>Площадь</div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  onChange={activateArea}
                                                  checked={area}/>
                                    </div>
                                    <input className='hidden' type="text"/>
                                    <input className='hidden' type="text"/>
                                    {area &&
                                    <div className='form__params'>
                                        <div className="form__row">
                                            <Input name='Площадь 1'/>
                                            <Input name='Площадь 2'/>
                                        </div>
                                        <div className="form__row">
                                            <div>
                                                Указывать площадь в документах
                                            </div>
                                            <Checkbox sx={{padding: '5px'}}
                                                      size='small'
                                                      color="success"
                                                      onChange={indicateAreaHandler}
                                                      checked={indicateAreaInDoc}/>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <button style={{marginTop: '40px'}} className='button'>
                                    Сохранить
                                </button>
                            </form>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="content__fields">
                      <AddInfo/>
                    </div>
                </TabPanel>
            </Tabs>
            <ManufacturersModal  open={manufacturersModal} setOpen={setManufacturersModal} data={manufacturer}/>
            <MarksModal open={marksModal} setOpen={setMarksModal} data={marks}/>
            <ImportersModal open={importersModal} setOpen={setImportersModal} data={importers} />
            <CountriesModal open={countriesModal} setOpen={setCountriesModal}
                            data={countries}/>
        </div>

    );
};

export default ProductNewPage;