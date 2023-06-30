import { Link, NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
    return (
        <div id="sidebar" className="col-2">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Link to='#'>
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
                        <NavLink  to='#'>
                            <span>صفحه اصلی</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <span>دوره ها</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <span>منو ها</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <span>مقاله ها</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <span>کاربران</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <span>کدهای تخفیف</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <span>دسته‌بندی‌ها</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;