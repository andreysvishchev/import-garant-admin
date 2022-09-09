import React, {useEffect} from 'react';
import {Link, useParams,} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../bll/store";
import {useDispatch} from "react-redux";
import {fetchProducts} from "../../../bll/productsReducer";
import GroupItem from "./GroupItem";
import {CircularProgress} from "@mui/material";

const GroupPage = React.memo(() => {
    const {id, groupId} = useParams()
    const img = true;
    const dispatch = useDispatch<AppDispatchType>()
    const status = useAppSelector(state=> state.app.groupPageStatus)
    const productsList = useAppSelector(state => state.products.productsList)
    const categories = useAppSelector(state => state.products.categories)
    const groups = useAppSelector(state => state.products.groups)
    const currentCategory = categories.find(el => el.Ref_Key === id)
    const currentGroup = groups.find(el => el.Ref_Key === groupId)

    useEffect(() => {
        dispatch(fetchProducts(groupId))
    }, [])
    console.log(status)

    return status !== "loading" ? (
            <div className='content'>
                <div className="content__top">
                    <div className='breadcrumbs'>
                        <Link className='breadcrumbs__link'
                              to={`/products/${id}`}>{currentCategory.Description}</Link>
                        <div className='breadcrumbs__item'>{currentGroup.Description}</div>
                    </div>
                    {/*     <Link className='content__back'
                      to={`/${id}`}>Назад</Link>*/}
                    <Link className='button'
                          to={`/products/${id}/${groupId}/new`}>Добавить</Link>
                </div>
                <div className="content__filters">
                    <div className="sort">
                        <div className='sort__caption'>Сортировать по:</div>
                        <select className='sort__select'>
                            <option value="">По возрастнаию</option>
                            <option value="">По убыванию</option>
                            <option value="">По цене</option>
                        </select>
                    </div>
                </div>
                <div className='content__list'>
                    <div className={img ? 'content__captions img' : 'content__captions'}>
                        <div className="content__caption"></div>
                        <div className="content__caption" style={{textAlign: 'left'}}>Наименование продукта</div>
                        <div className="content__caption">Опубликованно</div>
                        <div className="content__caption">Редактировать</div>
                        <div className="content__caption">Удалить</div>
                    </div>
                    {productsList.length === 0
                        ? <div className='content__message'>В этой группе нет товаров</div>
                        : productsList.map(el => {
                            return (
                                <GroupItem key={el.Ref_Key} data={el}/>
                            )
                        })}
                </div>
            </div>
        ) :
        <div className='page-preloader'>
            <CircularProgress/>
        </div>;
});

export default GroupPage;