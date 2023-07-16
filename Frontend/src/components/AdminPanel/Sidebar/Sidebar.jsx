import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Sidebar.scss';
import AuthContext from '../../../context/AuthContext';
import swal from 'sweetalert';

import { BiLogOut } from 'react-icons/bi';

const Sidebar = () => {

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    //-------------------- logout admin
    const logoutAdmin = (e) => {
        e.preventDefault()

        swal({
            title: 'از حساب خود خارج شدید',
            icon: 'success',
            buttons: 'حله'
        }).then(() => {
            authContext.logout()
            navigate('/')
        })
    }



    return (
        <div id="sidebar" className="col-2">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Link to='/p-admin'>
                        <img src="/assets/images/logo/Logo.png" alt="Logo" />
                    </Link>
                </div>
            </div>
            <div className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to='' end >
                            صفحه اصلی
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='courses' >
                            دوره ها
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='menus'>
                            منو ها
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='articles'>
                            مقاله ها
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='users'>
                            کاربران
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='offs'>
                            کدهای تخفیف
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='category'>
                            دسته‌بندی‌ها
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='contact-us'>
                            پیام کاربران
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='comments'>
                            کامنت کاربران
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='tickets'>
                            تیکت کاربران 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='sessions'>
                            جلسات دوره
                        </NavLink>
                    </li>
                    <li className='logout-li'>
                        <a href='#' onClick={logoutAdmin} >
                            <div className='logout-wrapper'>
                                <span> خروج</span>
                                <BiLogOut    className='logout-icon' />
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Sidebar;