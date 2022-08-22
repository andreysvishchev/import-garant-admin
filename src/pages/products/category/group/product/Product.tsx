import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../../bll/store";
import {Button, TextField} from "@mui/material";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";


const Product: React.FC = () => {
    const state = useAppSelector(state => state.products)
    const {id, groupId, productId} = useParams()


    const catIndex = state.findIndex(i => i.id === id)
    const groupIndex = state[catIndex].categories.findIndex(i => i.id === groupId)
    const prodIndex = state[catIndex].categories[groupIndex].list.findIndex(i => i.id === productId)
    const obj = state[catIndex].categories[groupIndex].list[prodIndex]

    const mainFields = obj.fields.filter(el => el.main === 1)
    const additionalFields = obj.fields.filter(el => el.main === 2)
    const additionalFields2 = obj.fields.filter(el => el.main === 3)

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
                    <Tab>Ещё Дополнительная информация</Tab>
                </TabList>

                <TabPanel>
                    <div className="content__fields">
                        {mainFields.map((el, i) => {
                            return (
                                <TextField key={i} id="outlined-basic"
                                           label={el.name}
                                           size="small"
                                           variant="outlined"
                                           value={el.value}/>
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="content__fields">
                        {additionalFields.map((el, i) => {
                            return (
                                <TextField key={i} id="outlined-basic"
                                           label={el.name}
                                           size="small"
                                           variant="outlined"
                                           value={el.value}/>
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="content__fields">
                        {additionalFields2.map((el, i) => {
                            return (
                                <TextField key={i} id="outlined-basic"
                                           label={el.name}
                                           size="small"
                                           variant="outlined"
                                           value={el.value}/>
                            )
                        })}
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