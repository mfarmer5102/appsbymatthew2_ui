import {NavLink} from "react-router-dom";
import React from "react";

const ThemePicker = ({label, value}) => {
    const toggleTheme = () => {
        const htmlWrapper = document.querySelector("html");
        htmlWrapper.setAttribute('data-theme', value)
        localStorage.setItem('theme', value);
    }
    return (
        <NavLink to={'#'}>
            <div className='small-label primary-font' onClick={() => toggleTheme()}>
                {label}
            </div>
        </NavLink>
    )
}

export default ThemePicker;
