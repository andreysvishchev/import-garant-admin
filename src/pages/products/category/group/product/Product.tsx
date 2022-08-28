import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../../bll/store";
import {Button, TextField} from "@mui/material";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Input from "../../../../../components/input/Input";


const Product: React.FC = () => {
    const state = useAppSelector(state => state.products)
    const {id, groupId, productId} = useParams()



    return (
        <div className='content'>
            <div className="content__top">
                <Link className='content__back'
                      to={`/products/${id}/${groupId}`}>Назад</Link>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Основная информация</Tab>
                    <Tab>Дополнительная информация</Tab>
                    <Tab>Информация о производителе</Tab>
                </TabList>

                <TabPanel>
                    <div className="content__fields">
                       1
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