import { useState, useEffect } from 'react';

// ------------COMPONENTS-------------------//
import Topbar from '../Topbar/Topbar'
import Navbar from '../Navbar/Navbar'
import Landing from '../Landing/Landing';


import './Header.scss';


const Header = () => {

  const [indexInfo, setIndexInfo] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/v1/infos/index')
      .then(res => res.json())
      .then(infos => setIndexInfo(infos))
  }, [])
  return (
    <header className="header-1">
      <Topbar />
      <Navbar />
      <Landing info={indexInfo} />
    </header>
  )
}

export default Header;