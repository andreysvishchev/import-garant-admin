import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {AppDispatchType, useAppSelector} from "../../../bll/store";
import Search from "../../../components/search/Search";
import {useDispatch} from "react-redux";
import GroupModal from "../../../components/Modals/GroupModal";
import CategoryItem from "./CategoryItem";


const CategoryPage = () => {
    const [open, setOpen] = useState(false)
    const {id} = useParams()
    const img = false
    const groups = useAppSelector(state => state.products.groups)
    const filterGroups = groups.filter(el => el.Parent_Key === id)
    const dispatch = useDispatch<AppDispatchType>()


    return (
        <div className='content'>
            <div className="content__top">
                <button className='button' onClick={() => setOpen(true)}>Добавить</button>
                <Search/>
            </div>
            <div className="content__list">
                <div className={img ? 'content__captions img' : 'content__captions'}>
                    <div className="content__caption" style={{textAlign: 'left'}}>Наименование группы</div>
                    <div className="content__caption">Опубликованно</div>
                    <div className="content__caption">Редактировать</div>
                    <div className="content__caption">Удалить</div>
                </div>
                {filterGroups.length === 0
                    ? <div className='content__message'>Таблица пустая </div>
                    : filterGroups.map(el => {
                        return (
                            <CategoryItem key={el.Ref_Key} data={el}/>
                        )
                    })}
            </div>
            <GroupModal open={open} setOpen={setOpen} categoryId={id!}/>
        </div>
    );
};

export default CategoryPage;