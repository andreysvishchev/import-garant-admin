import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { AppDispatchType, useAppSelector } from "../../../store/store";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useDispatch } from "react-redux";
import BaseInfo from "./product-forms/BaseInfo";
import AddInfo from "./product-forms/AddInfo";

const ProductNewPage = () => {
  const { id, groupId } = useParams()
  const dispatch = useDispatch<AppDispatchType>()
  const categories = useAppSelector(state => state.products.categories)
  const groups = useAppSelector(state => state.products.groups)
  const currentCategory = categories.find(el => el.Ref_Key === id)
  const currentGroup = groups.find(el => el.Ref_Key === groupId)

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
      <div className="content__main">
      <Tabs>
        <TabList>
          <Tab>Основная информация</Tab>
          <Tab>Информация для сайта</Tab>
        </TabList>
        <TabPanel>
          <div className="content__fields">
            <BaseInfo currentGroup={currentGroup} currentCategory={currentCategory} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="content__fields">
            <AddInfo />
          </div>
        </TabPanel>
      </Tabs>
      </div>
    </div>

  );
};

export default ProductNewPage;
