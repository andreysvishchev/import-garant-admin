import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {useOnClickOutside} from "../../functions/useOnClickOutside";
import {api} from "../../api/api";
import {Link} from "react-router-dom";


type PropsType = {
   id: string
}

const Search = (props: PropsType) => {
   const [open, setOpen] = useState(false)
   const ref = useRef() as MutableRefObject<HTMLDivElement>
   const viewSearchList = () => {
      setOpen(true)
   }
   const [state, setState] = useState<any []>([])
   useOnClickOutside(ref, () => setOpen(false))
   console.log(props.id)
   useEffect(() => {
      api.test(props.id).then(res => {
         // console.log(res.data.value)
         setState(res.data.value)
      })
   },[props.id])

   return (
      <div className='search' ref={ref}>
         <div className='search__caption'>Поиск по названию:</div>
         <input onClick={viewSearchList}
                className='search__field' type="search"
                placeholder='Введите название'/>
         <div className={open ? "search__list open" : "search__list"}>
            {state.map(el => {
               return (
                  <Link key={el.Ref_Key} to={`/products/ad7f83a0-118c-11ed-80e2-00505680a75b/${el.ВидНоменклатуры_Key}/${el.Ref_Key}`}>{el.Description}</Link>
               )
            })}
         </div>
      </div>
   );
};

export default Search;

// http://localhost:3000/products/ad7f83a0-118c-11ed-80e2-00505680a75b/d318a186-118c-11ed-80e2-00505680a75b/c6b018d8-01ca-11ed-801e-e0d55e051ed2
// http://localhost:3000/products/71c5584e-02cb-11ed-801e-e0d55e051ed2/d318a186-118c-11ed-80e2-00505680a75b/c6b018d8-01ca-11ed-801e-e0d55e051ed2