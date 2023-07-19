import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import IndexBox from "../../../components/UserPanel/IndexBox/IndexBox";

import './UserPanelIndex.scss';

const UserPanelIndex = () => {

    const authContext = useContext(AuthContext);

    return (
        <div className="col-9">
            <div className="main">
                <div className="main__title">
                    <span className="main__title-text">
                        سلام{" "}
                        <span className="main__title-name">{authContext.userInfos.name}</span>{" "}
                        به پنل کاربری خوش اومدی :)
                    </span>
                </div>
                <p className="main__desc">
                    از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
                    مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
                    کاربری و کلمه عبور خود را ویرایش کنید.
                </p>
            </div>
        </div>
    )
}

export default UserPanelIndex;