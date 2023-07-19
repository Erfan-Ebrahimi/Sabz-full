import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import './Sidebar.scss';
import { BiLogOut } from 'react-icons/bi';


const Sidebar = () => {

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    // ---------logout User
    const logoutUser = (event) => {
        event.preventDefault();

        swal({
            title: "آیا از خروج اطمینان داری؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            console.log(result);
            if (result) {
                swal({
                    title: "با موفقیت خارج شدید",
                    icon: "success",
                    buttons: "اوکی",
                }).then(() => {
                    authContext.logout();
                    navigate("/");
                });
            }
        });
    };


    return (
        <div className="col-3">
            <div className="sidebar">
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <NavLink className="sidebar__link" to="/my-account">
                            پیشخوان
                        </NavLink>
                    </li>
                    <li className="sidebar__item">
                        <NavLink className="sidebar__link" to='orders'>
                            سفارش ها
                        </NavLink>
                    </li>
                    <li className="sidebar__item">
                        <NavLink className="sidebar__link" to='edit-account'>
                            جزئیات حساب کاربری
                        </NavLink>
                    </li>
                    <li className="sidebar__item">
                        <NavLink className="sidebar__link" to='buyed'>
                            دوره های خریداری شده
                        </NavLink>
                    </li>
                    <li className="sidebar__item">
                        <NavLink className="sidebar__link" to='tickets'>
                            تیکت های پشتیبانی
                        </NavLink>
                    </li>
                    <li className='logout-li'>
                        <a href='#' onClick={logoutUser} >
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