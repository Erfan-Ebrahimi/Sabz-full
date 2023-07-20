import { memo, useEffect, useState } from 'react';
import './Topbar.scss';
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BiSolidPhone } from "react-icons/bi";
import Swal from 'sweetalert2';
import { BsGithub } from "react-icons/bs";
import CV from "../../assets/ECV.pdf"



const Topbar = () => {

  const [indexInfo, setIndexInfo] = useState([])

  useEffect(() => {
    // fetch('http://localhost:4000/v1/menus/topbar')
    //   .then(res => res.json())
    //   .then(data => setAllTopbarLinks(data))

    fetch('http://localhost:4000/v1/infos/index')
      .then(res => res.json())
      .then(infos => setIndexInfo(infos))

  }, [])

  const callMe = () => {
    Swal.fire({
      title: 'زنگ بزن یه گپی با هم بزنیم :)',
      text: '09918790969',
      imageUrl: 'assets/images/me.png',
      imageWidth: 300,
      imageAlt: 'Custom image',
      customClass: 'swal-wide',
      confirmButtonColor: '#00012f'
    })
  }

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              <li className="top-bar__item">
                <div className='cta' onClick={callMe}>
                  <a href={CV} download className='btn--1'>HIRE ME</a>
                </div>
              </li>
            </ul>
          </div>
          <div className='header__socials'>
            <a href="https://github.com/Erfan-Ebrahimi" target="_blank" rel="noreferrer" className='icon'><BsGithub /></a>
            <a href="https://t.me/ME_7676" target="_blank" rel="noreferrer" className='icon'><FaTelegramPlane /></a>
            <a href="http://www.instagram.com/__erfan__ebrahimi" target="_blank" rel="noreferrer" className='icon'><FaInstagram /></a>
            <a href='#' rel="noreferrer" className='icon' onClick={callMe}><BiSolidPhone /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Topbar); //jelogiry az render bihodev