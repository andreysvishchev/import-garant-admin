import React, {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from 'react';
import {useOnClickOutside} from "../../functions/useOnClickOutside";
import {api as apiF} from "../../api/api";
import {Link} from "react-router-dom";
import {store} from "../../store/store";

type PropsType = {
   categoryId: string
   groupId: string
   productList: any[]
}

const Search = (props: PropsType) => {
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState('')

   const ref = useRef() as MutableRefObject<HTMLDivElement>

   useOnClickOutside(ref, () => setOpen(false))

   const productList = props.productList.filter(el => {
      return el.Description.toLowerCase().includes(value.toLowerCase())
   })

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

   const viewSearchList = () => {
      if (props.productList.length !== 0) {
         setOpen(true)
      }
   }


   // const filterHandler = (searchValue: string, productList: any[]) => {
   //    if (!searchValue) {
   //       return productList
   //    }
   //    return productList.filter(el => {
   //       return el.Description.toLowerCase().includes(value.toLowerCase())
   //    })
   // }

   // useEffect(() => {
   //    const api = apiF(store.getState().app.instance)
   //    api.getProductsForCategory(parentId).then(res => {
   //       setState(res.data.value)
   //       console.log(res.data.value)
   //    });
   // }, [props.categoryId])

   // useEffect(() => {
   //    const Debounce = setTimeout(() => {
   //       const filteredState = filterHandler(value, props.productList)
   //       setFilteredProducts(filteredState)
   //    }, 300);
   //    return () => clearTimeout(Debounce)
   // }, [value])

   return (
      <div className='search' ref={ref}>
         <div className='search__caption'>Поиск по названию:</div>
         <input onClick={viewSearchList}
                value={value}
                onChange={onChangeHandler}
                className='search__field'
                placeholder='Введите название'/>
         <div className={open ? "search__list open" : "search__list"}>
            {
               productList.map(el => {
                  return (
                     <Link key={el.Ref_Key} className='search__item'
                           to={`/admin/${props.categoryId}/${props.groupId}/${el.Ref_Key}`}>{el.Description}</Link>
                  )
               })
            }
         </div>

      </div>
   );
};

export default Search;

