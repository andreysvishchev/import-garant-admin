import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AppDispatchType, useAppSelector } from "../../../store/store";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../store/productsReducer";
import GroupItem from "./GroupItem";
import { CircularProgress } from "@mui/material";
import Search from "../../../components/search/Search";
import { addProductId } from "../../../store/siteReducer";
import { translit } from "../../../functions/translit";

const GroupPage = React.memo(() => {
  const { id, groupId } = useParams();
  const img = true;
  const dispatch = useDispatch<AppDispatchType>();
  const status = useAppSelector((state) => state.app.groupPageStatus);
  const productsList = useAppSelector((state) => state.products.productsList);
  const categories = useAppSelector((state) => state.products.categories);
  const groups = useAppSelector((state) => state.products.groups);
  const currentCategory = categories.find((el) => el.Ref_Key === id);
  const currentGroup = groups.find((el) => el.Ref_Key === groupId);

  useEffect(() => {
    dispatch(fetchProducts(groupId));
  }, [groupId]);

  return status !== "loading" ? (
    <div className="content">
      <div className="content__top">
        <div className="breadcrumbs">
          <Link className="breadcrumbs__link" to={`/admin/${id}`}>
            {currentCategory.Description}
          </Link>
          <div className="breadcrumbs__item">{currentGroup.Description}</div>
        </div>
        <div className="content__row">
          <Link
            className="button"
            onClick={() => dispatch(addProductId(""))}
            to={`/admin/${id}/${groupId}/new`}
          >
            Добавить
          </Link>
          <Search
            categoryId={id!}
            groupId={groupId!}
            productList={productsList}
          />
        </div>
      </div>
      <div className="content__main">
        <div className="content__list">
          <div className={img ? "content__captions img" : "content__captions"}>
            <div className="content__caption"></div>
            <div className="content__caption" style={{ textAlign: "left" }}>
              Наименование продукта
            </div>
            <div className="content__caption">Опубликованно</div>
            <div className="content__caption">Редактировать</div>
            <div className="content__caption">Удалить</div>
          </div>
          {productsList.length === 0 ? (
            <div className="content__message">В этой группе нет товаров</div>
          ) : (
            productsList.map((el) => {
              return <GroupItem key={el.Ref_Key} data={el} />;
            })
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="page-preloader">
      <CircularProgress />
    </div>
  );
});

export default GroupPage;
