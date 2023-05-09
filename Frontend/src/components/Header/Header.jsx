// ------------COMPONENTS-------------------//
import Topbar from '../Topbar/Topbar'
import Navbar from '../Navbar/Navbar'


import './Header.scss';


const Header = () => {
  return (
    <header class="header">
      <Topbar/>
      <Navbar/>      
    </header>
  )
}

export default Header;