import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../../../bll/store";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Input from "../../../../../components/input/Input";
import {useDispatch} from "react-redux";
import {
    fetchCountries,
    fetchImporters,
    fetchManufacturer,
    fetchMarks,
    fetchProduct
} from "../../../../../bll/productsReducer";
import Textarea from "../../../../../components/textarea/Textarea";
import Checkbox from "@mui/material/Checkbox";
import InputList from "../../../../../components/inpit-list/InputList";
import BaseInfo from "./product-forms/BaseInfo";
import PackInfo from "./product-forms/PackInfo";


const Product = memo(() => {
    const product = useAppSelector(state => state.products.product)
    const dispatch = useDispatch<AppDispatchType>()
    const {id, groupId, productId} = useParams()

    useEffect(() => {
        dispatch(fetchProduct(productId))
        dispatch(fetchManufacturer())
        dispatch(fetchMarks())
        dispatch(fetchImporters())
        dispatch(fetchCountries())
    }, [productId])


    const categories = useAppSelector(state => state.products.categories)

    //breadcrumbs
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
                    <Tab>Информация о упаковке</Tab>
                    <Tab>Информация для сайта</Tab>
                </TabList>

                <TabPanel>
                    <div className="content__fields">
                       <BaseInfo product={product}/>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="content__fields">
                    <PackInfo product={product}/>
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