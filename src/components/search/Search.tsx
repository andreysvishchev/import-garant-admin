import React from 'react';

const Search = () => {
    return (
        <label className='search'>
            <div className='search__caption'>Поиск по названию:</div>
            <input className='search__filed' type="search" placeholder='Введите название'/>
        </label>
    );
};

export default Search;