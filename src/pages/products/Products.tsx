import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import CategoryModal from "../../components/Modal/CategoryModal";
import Categories from "./category/Categories";
import {NavLink} from 'react-router-dom';
import Product from "./category/group/product/Product";
import Group from "./category/group/Group";
import {Button} from "@mui/material";
import ProductNew from "./category/group/product/ProductNew";
import {log} from "util";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetchCategories, fetchManufacturer} from "../../bll/productsReducer";



const Products = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch<AppDispatchType>()
    const categories = useAppSelector(state => state.products.categories)

    useEffect(() => {
        dispatch(fetchCategories())

    }, [])
    console.log(categories)
    return (
        <div className='wrap'>
            <div className="nav">
                <button style={{marginLeft: '30px'}} className='button'
                        onClick={() => setOpen(true)}>Добавить
                </button>
                <div className="nav__list">
                     {categories.map(el => {
                        return (
                            <NavLink className='nav__link' key={el.Ref_Key}
                                     to={`/${el.Ref_Key}`}>{el.Description}</NavLink>
                        )
                    })}
                </div>
            </div>
            <Routes>
                <Route path='/:id' element={<Categories/>}/>
                <Route path='/:id/:groupId' element={<Group/>}/>
                <Route path='/:id/:groupId/:productId'
                       element={<Product/>}/>
                <Route path='/:id/:groupId/new'
                       element={<ProductNew/>}/>
            </Routes>
            <CategoryModal open={open} setOpen={setOpen}/>
        </div>
    );
};

export default Products;