import { memo, useEffect, useState } from 'react';
import './Topbar.scss';

import { Link } from 'react-router-dom';


const Topbar = () => {

  const [allTopbarLinks, setAllTopbarLinks] = useState([])
  const [indexInfo, setIndexInfo] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/v1/menus/topbar')
      .then(res => res.json())
      .then(data => setAllTopbarLinks(data))

    fetch('http://localhost:4000/v1/infos/index')
      .then(res => res.json())
      .then(infos => setIndexInfo(infos))

  }, [])


  const getRandomItemsFromArray = (arr, randomCount) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, randomCount)
  }
  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {
                getRandomItemsFromArray(allTopbarLinks, 5).map(link => (
                  <li key={link._id} className="top-bar__item">
                    <Link to={link.href} className="top-bar__link">
                      {link.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                {indexInfo.email}
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                0{indexInfo.phone}
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Topbar); //jelogiry az render bihodev