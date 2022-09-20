import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from "../../functions/useOnClickOutside";
import { api } from "../../api/api";
import { Link } from "react-router-dom";


type PropsType = {
  id: string
}

const Search = (props: PropsType) => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>(state)
  const [value, setValue] = useState('')
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const viewSearchList = () => {
    if (state.length !== 0) {
      setOpen(true)
    }
  }

  useOnClickOutside(ref, () => setOpen(false))

  const filterHandler = (searchValue: string, productList: any[]) => {
    if (!searchValue) {
      return productList
    }
    return productList.filter(el => {
      return el.Description.toLowerCase().includes(value.toLowerCase())
    })
  }

  useEffect(() => {
    api.getProductsForCategory(props.id).then(res => {
      setState(res.data.value)
    });
  }, [props.id])

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredState = filterHandler(value, state)
      setFilteredProducts(filteredState)
    }, 300);
    return () => clearTimeout(Debounce)
  }, [value])

  return (
    <div className='search' ref={ref}>
      <div className='search__caption'>Поиск по названию:</div>
      <input onClick={viewSearchList}
        value={value}
        onChange={onChangeHandler}
        className='search__field'
        placeholder='Введите название' />
      {filteredProducts.length !== 0 &&
        <div className={open ? "search__list open" : "search__list"}>
          {
            filteredProducts.map(el => {
              return (
                <Link key={el.Ref_Key} className='search__item' to={`/${props.id}/${el.ВидНоменклатуры_Key}/${el.Ref_Key}`}>{el.Description}</Link>
              )
            })
          }
        </div>
      }
    </div>
  );
};

export default Search;

// http://localhost:3000/products/ad7f83a0-118c-11ed-80e2-00505680a75b/d318a186-118c-11ed-80e2-00505680a75b/c6b018d8-01ca-11ed-801e-e0d55e051ed2
// http://localhost:3000/products/71c5584e-02cb-11ed-801e-e0d55e051ed2/d318a186-118c-11ed-80e2-00505680a75b/c6b018d8-01ca-11ed-801e-e0d55e051ed2
