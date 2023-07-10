import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './Sidebar.scss';
import AuthContext from '../../../context/AuthContext';
import swal from 'sweetalert';

import { BiLogOut } from 'react-icons/bi';

const Sidebar = () => {

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

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

                <div className="sidebar-menu-btn">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <div className="sidebar-menu">
                <ul>
                    <li className="active-menu">
                        <NavLink to='/p-admin'>
                            <span>صفحه اصلی</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='courses'>
                            <span>دوره ها</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='menus'>
                            <span>منو ها</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='articles'>
                            <span>مقاله ها</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='users'>
                            <span>کاربران</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='offs'>
                            <span>کدهای تخفیف</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='category'>
                            <span>دسته‌بندی‌ها</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='contact-us'>
                            <span>پیام کاربران</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='comments'>
                            <span>کامنت کاربران</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='tickets'>
                            <span>تیکت کاربران </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='sessions'>
                            <span>جلسات دوره</span>
                        </NavLink>
                    </li>
                    <li className='logout-li'>
                        <a href='#' onClick={logoutAdmin} >
                            <div className='logout-wrapper'>
                                <span> خروج</span>
                                <BiLogOut className='logout-icon' />

                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;