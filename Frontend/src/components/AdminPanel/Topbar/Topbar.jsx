import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Topbar.scss';

const Topbar = () => {

    const [adminInfo, setAdminInfo] = useState({})
    const [adminNotifications, setAdminNotifications] = useState([])
    const [isShowNotificationsModal, setIsShowNotificationsModal] = useState(false)
    const [notifCount, setnotifCount] = useState(0)
    const [reloadPage, setReloadPage] = useState(false); // اضافه کردن متغیر reloadPage

    // -------get admin info 
    // ------lazem nist shart bezarim k if toen dashtim biad chon if token nadashtmi aslan be in safhe nemiad
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        fetch(`http://localhost:4000/v1/auth/me`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`,
            },
        }).then((res) => res.json())
            .then(data => {
                setAdminInfo(data);
                setAdminNotifications(data.notifications)
                setnotifCount(data.notifications.length)
            })
    }, [reloadPage]);     //if seeNotification anjam shod render beshe 
    // if seeNotification ro be sorat const benevisim hoist nemishe v error mide  => function mamoli minevisim

    // ------seenotification
    function seeNotification(notifID) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        fetch(`http://localhost:4000/v1/notifications/see/${notifID}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setReloadPage(!reloadPage) // for reload page
            })
            .catch(error => {
                console.error(error);
            });


    }
    return (
        <div className="container-fluid">
            <div className="container">
                <div className={`home-header ${isShowNotificationsModal && 'active-modal-notfication'}`}>
                    <div className="home-right">
                        <div className="home-searchbar">
                            <input type="text" className="search-bar" placeholder="جستجو..." />
                        </div>
                        <div className="home-notification">
                            <button
                                type="button"
                                onMouseEnter={() => setIsShowNotificationsModal(true)}
                            >
                                <i className="far fa-bell"></i>
                            </button>
                            <span className='notif-count'>{notifCount}</span>
                        </div>
                        <div
                            className="home-notification-modal"
                            onMouseEnter={() => setIsShowNotificationsModal(true)}
                            onMouseLeave={() => setIsShowNotificationsModal(false)}
                        >
                            <ul className="home-notification-modal-list">
                                {
                                    adminNotifications.length !== 0 ?
                                        (
                                            adminNotifications.map(notif => (
                                                <li key={notif._id} className="home-notification-modal-item">
                                                    <span className="home-notification-modal-text">
                                                        {notif.msg}
                                                    </span>
                                                    <a
                                                        href="#"
                                                        onClick={() => seeNotification(notif._id)}
                                                    >
                                                        دیدم
                                                    </a>
                                                </li>

                                            ))
                                        )
                                        :
                                        (
                                            <p className='alert alert-info'>هیچ پیامی موجود نیست</p>
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="home-left">
                        <div className="home-profile">
                            <div className="home-profile-image">
                                <a href="#">
                                    <img src={`/assets/${adminInfo.profile}`} alt="" />
                                </a>
                            </div>
                            <div className="home-profile-name">
                                <Link to='/'>{adminInfo.name}</Link>
                            </div>
                            <div className="home-profile-icon">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar;