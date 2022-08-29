import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../../../bll/store";
import {Button, TextField} from "@mui/material";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Input from "../../../../../components/input/Input";
import {useDispatch} from "react-redux";
import {fetchProduct} from "../../../../../bll/productsReducer";


const Product: React.FC = () => {
    const product = useAppSelector(state => state.products.product)
    const dispatch = useDispatch<AppDispatchType>()
    const {id, groupId, productId} = useParams()
    useEffect(() => {
        dispatch(fetchProduct(productId))
    }, [productId])

    console.log(product)
    const categories = useAppSelector(state => state.products.categories)
    const groups = useAppSelector(state => state.products.groups)
    const currentCategory = categories.find(el => el.Ref_Key === id)
    const currentGroup = groups.find(el => el.Ref_Key === groupId)

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
                    <Tab>Дополнительная информация</Tab>
                    <Tab>Дополнительная информация 2</Tab>


                </TabList>

                <TabPanel>
                    <div className="content__fields">
                        <Input name={'Наименование'} value={product.Description}/>
                        <Input name={'Артикул'} value={product.Артикул}/>
                        <Input name={'Код'} value={product.Code}/>
                        <Input name={'Код ТН ВЭД'} value={'????'}/>
                        <Input name={'Сертификат'} value={'????'}/>

                       {/* <div>Описание</div>
                        <textarea value={product.Описание}></textarea>*/}

                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="content__fields">
                        2
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="content__fields">
                        3
                    </div>
                </TabPanel>
            </Tabs>

            <button className='button'>
                Сохранить
            </button>

        </div>
    );
};

export default Product;