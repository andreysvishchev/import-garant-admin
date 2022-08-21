import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {useAppSelector} from "../../bll/store";
import BaseModal from "../../components/Modal/BaseModal";
import Categories from "./category/Categories";
import {NavLink} from 'react-router-dom';
import Product from "./category/group/product/Product";
import Group from "./category/group/Group";
import {Button} from "@mui/material";
import ProductNew from "./category/group/product/ProductNew";


const Products: React.FC = () => {
    const state = useAppSelector(state => state.products)
    const [open, setOpen] = useState(false)


    return (
        <div className='wrap'>
            <div className="nav">
                <Button onClick={() => setOpen(true)} variant="outlined">Добавить</Button>
                <div className="nav__list">
                    {state.map(el => {
                        return (
                            <NavLink className='nav__link' key={el.id}
                                     to={`/products/${el.id}`}>{el.name}</NavLink>
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


            <BaseModal open={open} setOpen={setOpen}/>
        </div>
    );
};

export default Products;