import * as React from 'react';
import {NavLink} from "react-router-dom";


export default function SearchAppBar() {
    const setActive = ({isActive}: { isActive: boolean }): string => {
        return `header__link ${isActive ? 'active' : ''}`;
    }

    return (
        <div className='header'>
            <div className="header__nav">
                <NavLink className={setActive} to='/'>Главная</NavLink>
                <NavLink className={setActive} to='/products'>Продукция</NavLink>
            </div>
        </div>
    );
};
