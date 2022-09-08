import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../bll/store";
import CategoryPage from "./category-page/CategoryPage";
import {NavLink} from 'react-router-dom';
import ProductPage from "./product/ProductPage";
import GroupPage from "./group-page/GroupPage";
import ProductNewPage from "./product/ProductNewPage";
import {useDispatch} from "react-redux";
import CategoryModal from "../../components/modals/CategoryModal";
import {openCategoriesModal} from "../../bll/modalsReducer";
import EditModal from "../../components/modals/EditModal";


const ProductsPage = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const categories = useAppSelector(state => state.products.categories)

    return (
        <div className='wrap'>
            <div className="nav">
                <button style={{marginLeft: '30px'}} className='button'
                        onClick={() => dispatch(openCategoriesModal(true))}>Добавить
                </button>
                <div className="nav__list">
                    {categories.map(el => {
                        return (
                            <NavLink className='nav__link' key={el.Ref_Key}
                                     to={`/products/${el.Ref_Key}`}>{el.Description}</NavLink>
                        )
                    })}
                </div>
            </div>
            <Routes>
                <Route path='/:id' element={<CategoryPage/>}/>
                <Route path='/:id/:groupId' element={<GroupPage/>}/>
                <Route path='/:id/:groupId/:productId'
                       element={<ProductPage/>}/>
                <Route path='/:id/:groupId/new'
                       element={<ProductNewPage/>}/>
            </Routes>
            <CategoryModal/>
            <EditModal/>
        </div>
    );
};

export default ProductsPage;