import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import './Sidebar.scss';

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
                <span className="sidebar__name">محمدامین سعیدی راد</span>
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <a className="sidebar__link" href="#">
                            پیشخوان
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <Link className="sidebar__link" to='orders'>
                            سفارش ها
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <a className="sidebar__link" href="#">
                            کیف پول من
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a className="sidebar__link" href="#">
                            جزئیات حساب کاربری
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <Link className="sidebar__link" to='buyed'>
                            دوره های خریداری شده
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link className="sidebar__link" to='tickets'>
                            تیکت های پشتیبانی
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link className="sidebar__link" onClick={logoutUser}>
                            خروج از سیستم
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;