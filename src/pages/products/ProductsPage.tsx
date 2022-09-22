import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../store/store";
import CategoryPage from "./category-page/CategoryPage";
import {NavLink} from 'react-router-dom';
import ProductPage from "./product/ProductPage";
import GroupPage from "./group-page/GroupPage";
import ProductNewPage from "./product/ProductNewPage";
import {useDispatch} from "react-redux";
import CategoryModal from "../../components/modals/CategoryModal";
import {openCategoriesModal} from "../../store/modalsReducer";
import EditModal from "../../components/modals/EditModal";
import {CircularProgress} from "@mui/material";

const ProductsPage = () => {
   // useEffect(() => {
   //     dispatch(baseDataLoading())
   // }, [])

   const status = useAppSelector(state => state.app.appStatus)
   const dispatch = useDispatch<AppDispatchType>()
   const categories = useAppSelector(state => state.products.categories)

   return status !== 'loading' ? (
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
      ) :
      <div className='preloader'>
         <CircularProgress/>
      </div>;
};

export default ProductsPage;
