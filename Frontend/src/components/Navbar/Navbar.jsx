import './Navbar.scss';
import logo from '../../assets/images/logo/logo.png';

import { Link } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';

import { Tooltip } from 'react-tooltip'
import swal from 'sweetalert';



const Navbar = () => {

  const [allMenus, setAllMenus] = useState([]);
  const authContext = useContext(AuthContext);

  // ----------get all menus from api
  useEffect(() => {
    fetch('http://localhost:4000/v1/menus')
      .then(res => res.json())
      .then(menus => setAllMenus(menus))
  }, [])

  // -------search icon
  const searchShow = () => {
    swal({
      title: 'این قسمت در حال توسعه می باشد',
      buttons: 'OK',
      icon: 'success'

    })
  }

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <Link to="/">
              <img src={logo} className="main-header__logo" alt="لوگوی سبزلرن" />

            </Link>

            <ul className="main-header__menu">

              {
                allMenus.map(menu => (
                  <li key={menu._id} className="main-header__item">
                    <Link to={`/category-info/${menu.href}/1`} className="main-header__link">
                      {menu.title}
                    </Link>
                    {menu.submenus.length !== 0 && (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon"></i>
                        <ul className="main-header__dropdown">
                          {
                            menu.submenus.map(submenu => (
                              <li key={submenu._id} className="main-header__dropdown-item">
                                <Link to={`/course-info/${submenu.href}`} className="main-header__dropdown-link">{submenu.title}</Link>
                              </li>
                            ))
                          }
                        </ul>
                      </>
                    )}
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn" onClick={searchShow}>
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            {
              authContext.isLoggedIn ?
                (
                  <Link to={`/my-account/orders`} className="main-header__cart-btn">
                    <i className="fas fa-shopping-cart main-header__cart-icon"></i>
                  </Link>

                )
                :
                (
                  <Link to={`/`} className="main-header__cart-btn">
                    <i className="fas fa-shopping-cart main-header__cart-icon"></i>
                  </Link>
                )
            }
            {
              authContext.isLoggedIn ?
                (
                  <>
                    {
                      authContext.userInfos.role === 'ADMIN' ?
                        (
                          <Link to='/p-admin' className="main-header__profile" data-tooltip-id="my-tooltip" data-tooltip-content="پنل ادمین" data-tooltip-place="top">
                            <span className="main-header__profile-text" >{authContext.userInfos.username}</span>
                            <Tooltip id="my-tooltip" />
                          </Link>
                        )
                        :
                        (

                          <Link to='/my-account' className="main-header__profile" data-tooltip-id="my-tooltip" data-tooltip-content="پنل کاربری" data-tooltip-place="top">
                            <span className="main-header__profile-text" >{authContext.userInfos.name}</span>
                            <Tooltip id="my-tooltip" />
                          </Link>
                        )
                    }

                  </>
                )
                :
                (
                  <Link to="/login" className="main-header__profile">
                    <span className="main-header__profile-text">ورود / ثبت نام</span>
                  </Link>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;