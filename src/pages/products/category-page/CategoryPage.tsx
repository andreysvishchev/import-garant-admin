import React from 'react';
import { useParams } from 'react-router-dom';
import { AppDispatchType, useAppSelector } from "../../../store/store";
import Search from "../../../components/search/Search";
import { useDispatch } from "react-redux";
import GroupModal from "../../../components/modals/GroupModal";
import CategoryItem from "./CategoryItem";
import { openGroupModal } from "../../../store/modalsReducer";


const CategoryPage = () => {
  const { id } = useParams()
  const img = false
  const groups = useAppSelector(state => state.products.groups)
  const categories = useAppSelector(state => state.products.categories)
  const currentCategory = categories.find(el => el.Ref_Key === id)
  const filterGroups = groups.filter(el => el.Parent_Key === id)
  const dispatch = useDispatch<AppDispatchType>()

  return (
    <div className='content'>
      <div className="content__top">
        <div className='breadcrumbs'>
          <div className='breadcrumbs__item'>{currentCategory.Description}</div>
        </div>
        <div className="content__row">
          <button className='button' onClick={() => dispatch(openGroupModal(true))}>Добавить</button>
        </div>
      </div>
      <div className="content__main">
        <div className="content__list">
          <div className={img ? 'content__captions img' : 'content__captions'}>
            <div className="content__caption" style={{ textAlign: 'left' }}>Наименование группы</div>
            <div className="content__caption">Опубликованно</div>
            <div className="content__caption">Редактировать</div>
            <div className="content__caption">Удалить</div>
          </div>
          {filterGroups.length === 0
            ? <div className='content__message'>Таблица пустая</div>
            : filterGroups.map(el => {
              return (
                <CategoryItem key={el.Ref_Key} data={el} />
              )
            })}
        </div>
      </div>
      <GroupModal categoryId={id!} />
    </div>
  );
};

export default CategoryPage;
