import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../bll/store";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {
    fetchCountries,
    fetchImporters,
    fetchManufacturer,
    fetchMarks
} from "../../../bll/productsReducer";
import {useDispatch} from "react-redux";
import BaseInfo from "./product-forms/BaseInfo";
import AddInfo from "./product-forms/AddInfo";
import PackInfo from "./product-forms/PackInfo";


const ProductNewPage = () => {
    const {id, groupId} = useParams()
    const dispatch = useDispatch<AppDispatchType>()
    const categories = useAppSelector(state => state.products.categories)
    const groups = useAppSelector(state => state.products.groups)
    const currentCategory = categories.find(el => el.Ref_Key === id)
    const currentGroup = groups.find(el => el.Ref_Key === groupId)


/*    useEffect(() => {
        dispatch(fetchManufacturer())
        dispatch(fetchMarks())
        dispatch(fetchImporters())
        dispatch(fetchCountries())
    }, [])*/


    return (
        <div className='content'>
            <div className="content__top">
                <div className='breadcrumbs'>
                    <Link className='breadcrumbs__link'
                          to={`/products/${id}`}>{currentCategory.Description}</Link>
                    <Link className='breadcrumbs__link'
                          to={`/products/${id}/${groupId}`}>{currentGroup.Description}</Link>
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
                        <BaseInfo/>
                    </div>
                </TabPanel>

                <TabPanel>
                    <PackInfo/>
                </TabPanel>

                <TabPanel>
                    <div className="content__fields">
                        <AddInfo/>
                    </div>
                </TabPanel>
            </Tabs>
        </div>

    );
};

export default ProductNewPage;