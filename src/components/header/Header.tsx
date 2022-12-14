import * as React from 'react';
import {NavLink} from "react-router-dom";
import Search from "../search/Search";


export default function Header() {
    const setActive = ({isActive}: { isActive: boolean }): string => {
        return `header__link ${isActive ? 'active' : ''}`;
    }

    return (
        <div className='header'>
            {/*<div className="header__nav">*/}
            {/*    <NavLink className={setActive} to='/'>Главная</NavLink>*/}
            {/*    <NavLink className={setActive} to='admin'>Продукция</NavLink>*/}
            {/*</div>*/}
        </div>
    );
};
