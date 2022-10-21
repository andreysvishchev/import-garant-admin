import React, {useEffect} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../store/store";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import BaseInfo from "./product-forms/BaseInfo";
import AddInfo from "./product-forms/AddInfo";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {getSiteInfo} from "../../../store/siteReducer";
import {useDispatch} from "react-redux";

const ProductNewPage = () => {
   const {id, groupId} = useParams()
   const dispatch = useDispatch<AppDispatchType>()
   const categories = useAppSelector(state => state.products.categories)
   const groups = useAppSelector(state => state.products.groups)
   const currentCategory = categories.find(el => el.Ref_Key === id)
   const currentGroup = groups.find(el => el.Ref_Key === groupId)
   const productIdForSite = useAppSelector(state => state.siteInfo.id)

   useEffect(() => {
      dispatch(getSiteInfo(productIdForSite))
   }, [])

   return (
      <div className='content'>
         <div className="content__top">
            <div className='breadcrumbs'>
               <Link className='breadcrumbs__link'
                     to={`/admin/${id}`}>{currentCategory.Description}</Link>
               <Link className='breadcrumbs__link'
                     to={`/admin/${id}/${groupId}`}>{currentGroup.Description}</Link>
               <div className='breadcrumbs__item'>Новый продукт</div>
            </div>
         </div>
         <div className="content__main">
            <Tabs>
               <TabList>
                  <Tab>Основная информация</Tab>
                  <Tab disabled={productIdForSite === ''}>
                     Информация для сайта
                     {productIdForSite === '' &&
                        <Tooltip title=" Сначала сохраните товар, прежде чем переходить дальше">
                           <IconButton size={"small"} style={{marginLeft: '10px', padding: '1px'}}>
                              < HelpOutlineIcon/>
                           </IconButton>
                        </Tooltip>}
                  </Tab>
               </TabList>
               <TabPanel>
                  <div className="content__fields">
                     <BaseInfo currentGroup={currentGroup} currentCategory={currentCategory}/>
                  </div>
               </TabPanel>
               <TabPanel>
                  <div className="content__fields">
                     <AddInfo/>
                  </div>
               </TabPanel>
            </Tabs>
         </div>
      </div>

   );
};

export default ProductNewPage;
