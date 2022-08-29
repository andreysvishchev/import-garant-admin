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
import FolderIcon from '@mui/icons-material/Folder';
import {log} from "util";


const Group: React.FC = () => {
    const {id, groupId} = useParams()

    useEffect(() => {
        dispatch(fetchProducts(groupId))
    }, [groupId])

    const img = true;
    const dispatch = useDispatch<AppDispatchType>()
    const categories = useAppSelector(state => state.products.categories)
    const groups = useAppSelector(state => state.products.groups)
    const productsList = useAppSelector(state => state.products.productsList)
    const currentCategory = categories.find(el => el.Ref_Key === id)
    const currentGroup = groups.find(el => el.Ref_Key === groupId)
    const status = useAppSelector(state => state.app.status)
    console.log(currentCategory.Description)

    return (
        <div className='content'>


            <div className="content__top">
           {/*     <div className='breadcrumbs'>
                    <Link className='breadcrumbs__link'
                          to={`/${id}`}>{currentCategory.Description}</Link>
                    <div className='breadcrumbs__item'>{currentGroup.Description}</div>
                </div>*/}
                <Link className='content__back'
                      to={`/${id}`}>Назад</Link>
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
                {status === 'loading'
                    ? <div className='content__message'>Загрузка ...</div>
                    : productsList.length === 0
                        ? <div className='content__message'>В этой группе нет товаров</div>
                        : productsList.map(el => {
                            return (
                                <div className={img ? 'content__item img' : 'content__item'} key={el.Ref_Key}>
                                    <div className='content__img'>картинка товара</div>
                                    <Link className='content__link'
                                          to={`/${id}/${groupId}/${el.Ref_Key}`}>
                                        {el.Description}
                                    </Link>
                                    <div className='content__public content__col'>
                                        <Checkbox sx={{padding: '5px'}} color="success"/>
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