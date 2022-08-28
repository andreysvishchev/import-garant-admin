import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {
    Link,
    useParams,
} from "react-router-dom";
import {AppDispatchType, useAppSelector} from "../../../../bll/store";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from "react-redux";
import {fetchGroups, fetchProducts} from "../../../../bll/productsReducer";
import {log} from "util";


const Group: React.FC = () => {
    const {id, groupId} = useParams()
    const img = true;
    const dispatch = useDispatch<AppDispatchType>()
    const productsList = useAppSelector(state => state.products.productsList)
    console.log(123)
    useEffect(() => {
        dispatch(fetchProducts(groupId))
    }, [groupId])


    return (
        <div className='content'>
            <Link className='content__back'
                  to={`/${id}`}>Назад</Link>
            <div className="content__top">
                <div
                    className="content__title">title
                </div>
                <Link className='button'
                      to={`/${id}/${groupId}/new`}>Добавить</Link>
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
                    <div className="content__caption">Наименование продукта</div>
                    <div className="content__caption">Опубликованно</div>
                    <div className="content__caption">Редактировать</div>
                    <div className="content__caption">Удалить</div>
                </div>
                {productsList.map(el => {
                    return (
                        <div className={img ? 'content__item img' : 'content__item'} key={el.Ref_Key}>
                            <div className='content__img'>картинка товара</div>
                            <Link className='content__link'
                                  to={`/products/${id}/${groupId}/${el.id}`}>{el.Description}</Link>
                            <div className='content__public content__col'>
                                <Checkbox sx={{padding: '5px'}}  color="success"/>
                            </div>
                            <div className='content__edit content__col'>
                                <IconButton sx={{padding: '5px'}}>
                                    <EditIcon/>
                                </IconButton>
                            </div>
                            <div className='content__delete content__col'>
                                <IconButton sx={{padding: '5px'}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Group;