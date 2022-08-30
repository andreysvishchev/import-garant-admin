import React, {memo, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../../../bll/store";
import {Button, InputLabel, SelectChangeEvent, TextField} from "@mui/material";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Input from "../../../../../components/input/Input";
import {useDispatch} from "react-redux";
import {
    fetchManufacturer,
    fetchMarks,
    fetchProduct
} from "../../../../../bll/productsReducer";
import Textarea from "../../../../../components/textarea/Textarea";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputList from "../../../../../components/inpit-list/InputList";


const Product = memo(() => {
    const product = useAppSelector(state => state.products.product)
    const dispatch = useDispatch<AppDispatchType>()
    const {id, groupId, productId} = useParams()

    useEffect(() => {
        dispatch(fetchProduct(productId))
        dispatch(fetchManufacturer())
        dispatch(fetchMarks())
    }, [productId])

    console.log(product)
    const categories = useAppSelector(state => state.products.categories)
    const manufacturer = useAppSelector(state => state.products.manufacturer)
    const marks = useAppSelector(state => state.products.marks)

    const groups = useAppSelector(state => state.products.groups)
    const currentCategory = categories.find(el => el.Ref_Key === id)
    const currentGroup = groups.find(el => el.Ref_Key === groupId)

    const manufacturerValue = manufacturer.find(el => el.Ref_Key === product.Производитель_Key)
    const marksValue = marks.find(el => el.Ref_Key === product.Марка_Key)

    return (
        <div className='content'>
            <div className="content__top">
                <Link className='content__back'
                      to={`/${id}/${groupId}`}>Назад</Link>
                {/* <div className='breadcrumbs'>
                    <Link className='breadcrumbs__link'
                          to={`/${id}`}>{currentCategory.Description}</Link>
                    <Link className='breadcrumbs__link'
                          to={`/${id}/${groupId}`}>{currentGroup.Description}</Link>
                    <div className='breadcrumbs__item'>{product.Description}</div>
                </div>*/}
            </div>
            <Tabs>
                <TabList>
                    <Tab>Основная информация</Tab>
                    <Tab>Информация о упаковке</Tab>
                    <Tab>Дополнительная информация 2</Tab>
                </TabList>

                <TabPanel>
                    <div className="content__fields">
                        <form className='form'>
                            <Input name={'Наименование'} value={product.Description}/>
                            <Input name={'Полное наименование '}
                                   value={product.НаименованиеПолное}/>
                            <Input name={'Артикул'} value={product.Артикул}/>
                            <div className="form__row">
                                <Input name={'Код'} value={product.Code}/>
                                <Input name={'Код ТН ВЭД'} value={'????'}/>
                            </div>
                            <Textarea name='Описание' value={product.Описание}/>
                            <InputList
                                value={manufacturerValue?.Description}
                                data={manufacturer}
                                title={'Производитель'}/>
                            <InputList
                                value={marksValue?.Description}
                                data={marks}
                                title={'Бренд'}/>
                            <InputList
                                value={manufacturerValue?.Description}
                                data={manufacturer}
                                title={'Импортер'}/>
                            <InputList
                                value={manufacturerValue?.Description}
                                data={manufacturer}
                                title={'Страна происхождения'}/>

                            <button style={{marginTop: '40px'}} className='button'>
                                Сохранить
                            </button>
                        </form>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="content__fields">
                        <form className='form'>
                            <div className="form__parameter">
                                <div className="form__row">
                                    <div className='form__caption'>Вес</div>
                                    <Checkbox sx={{padding: '5px'}}
                                              checked={product.ВесИспользовать}/>
                                </div>
                                <input className='hidden' type="text"
                                       value={product['ВесЕдиницаИзмерения@navigationLinkUrl']}/>
                                <input className='hidden' type="text"
                                       value={product.ВесЕдиницаИзмерения_Key}/>
                                {product.ВесИспользовать &&
                                <div className='form__params'>
                                    <div className="form__row">
                                        <Input name='Вес 1'
                                               value={product.ВесЗнаменатель}/>
                                        <Input name='Вес 2' value={product.ВесЧислитель}/>
                                    </div>
                                    <div className="form__row">
                                        <div className='form__headline'>
                                            Указывать вес в документах
                                        </div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  size='small'
                                                  color="default"
                                                  checked={product.ВесМожноУказыватьВДокументах}/>

                                    </div>
                                </div>
                                }
                            </div>

                            <div className="form__parameter">
                                <div className="form__row">
                                    <div className='form__caption'>Обем</div>
                                    <Checkbox sx={{padding: '5px'}}
                                              checked={product.ОбъемИспользовать}/>
                                </div>
                                <input className='hidden' type="text"
                                       value={product['ОбъемЕдиницаИзмерения@navigationLinkUrl']}/>
                                <input className='hidden' type="text"
                                       value={product.ОбъемЕдиницаИзмерения_Key}/>
                                {product.ОбъемИспользовать &&
                                <div className='form__params'>
                                    <div className='form__row'>
                                        <Input name='Обем 1'
                                               value={product.ОбъемЗнаменатель}/>
                                        <Input name='Обем 2'
                                               value={product.ОбъемЧислитель}/>
                                    </div>
                                    <div className='form__row'>
                                        <div>
                                            указывать объём в документах
                                        </div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  size='small'
                                                  color="default"
                                                  checked={product.ОбъемМожноУказыватьВДокументах}/>
                                    </div>
                                </div>
                                }
                            </div>

                            <div className="form__parameter">
                                <div className="form__row">
                                    <div className='form__caption'>Длина</div>
                                    <Checkbox sx={{padding: '5px'}}
                                              checked={product.ДлинаИспользовать}/>
                                </div>
                                <input className='hidden' type="text"
                                       value={product['ДлинаЕдиницаИзмерения@navigationLinkUrl']}/>
                                <input className='hidden' type="text"
                                       value={product.ДлинаЕдиницаИзмерения_Key}/>

                                {product.ДлинаИспользовать &&
                                <div className='form__params'>
                                    <div className="form__row">
                                        <Input name='Длина 1'
                                               value={product.ДлинаЗнаменатель}/>
                                        <Input name='Длина 2'
                                               value={product.ДлинаЧислитель}/>
                                    </div>
                                    <div className="form__row">
                                        <div>
                                            Указывать длину в документах
                                        </div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  size='small'
                                                  color="default"
                                                  checked={product.ДлинаМожноУказыватьВДокументах}/>
                                    </div>
                                </div>
                                }
                            </div>

                            <div className="form__parameter">
                                <div className="form__row">
                                    <div className='form__caption'>Площадь</div>
                                    <Checkbox sx={{padding: '5px'}}
                                              checked={product.ПлощадьИспользовать}/>
                                </div>
                                <input className='hidden' type="text"
                                       value={product['ПлощадьЕдиницаИзмерения@navigationLinkUrl']}/>
                                <input className='hidden' type="text"
                                       value={product.ПлощадьЕдиницаИзмерения_Key}/>
                                {product.ПлощадьИспользовать &&
                                <div className='form__params'>
                                    <div className="form__row">
                                        <Input name='Площадь 1'
                                               value={product.ПлощадьЗнаменатель}/>
                                        <Input name='Площадь 2'
                                               value={product.ПлощадьЧислитель}/>
                                    </div>
                                    <div className="form__row">
                                        <div>
                                            Указывать площадь в документах
                                        </div>
                                        <Checkbox sx={{padding: '5px'}}
                                                  size='small'
                                                  color="default"
                                                  checked={product.ПлощадьМожноУказыватьВДокументах}/>
                                    </div>
                                </div>
                                }
                            </div>
                            <button style={{marginTop: '40px'}} className='button'>
                                Сохранить
                            </button>
                        </form>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="content__fields">
                        3
                        <button style={{marginTop: '40px'}} className='button'>
                            Сохранить
                        </button>
                    </div>
                </TabPanel>
            </Tabs>


        </div>
    );
});

export default Product;