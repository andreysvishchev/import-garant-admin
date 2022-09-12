import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../bll/store";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {useDispatch} from "react-redux";
import {
    fetchProduct
} from "../../../bll/productsReducer";
import BaseInfo from "./product-forms/BaseInfo";
import AddInfo from "./product-forms/AddInfo";
import {CircularProgress} from "@mui/material";
import PackInfo from "./product-forms/PackInfo";


const ProductPage = () => {
    const {id, groupId, productId} = useParams()
    const dispatch = useDispatch<AppDispatchType>()
    const product = useAppSelector(state => state.products.product)
    const status = useAppSelector(state => state.app.status2)
    const categories = useAppSelector(state => state.products.categories)
    const groups = useAppSelector(state => state.products.groups)
    const currentCategory = categories.find(el => el.Ref_Key === id)
    const currentGroup = groups.find(el => el.Ref_Key === groupId)

    useEffect(() => {
        dispatch(fetchProduct(productId))
    }, [productId])

    return status !== "loading" ? (
            <div className='content'>
                <div className="content__top">
                    <div className='breadcrumbs'>
                        <Link className='breadcrumbs__link'
                              to={`/products/${id}`}>{currentCategory.Description}</Link>
                        <Link className='breadcrumbs__link'
                              to={`/products/${id}/${groupId}`}>{currentGroup.Description}</Link>
                        <div className='breadcrumbs__item'>{product.Description}</div>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Основная информация</Tab>
                        <Tab>Информация об упаковке</Tab>
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
                            <AddInfo/>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        ) :
        <div className='preloader'>
            <CircularProgress/>
        </div>;
};

export default ProductPage;