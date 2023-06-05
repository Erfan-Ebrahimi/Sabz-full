// ------------COMPONENTS-------------------//
import AboutUs from '../../components/AboutUs/AboutUs';
import Header from '../../components/Header/Header';
import LastCourses from '../../components/LastCourses/LastCourses';
import PopularCourses from '../../components/PopularCourses/PopularCourses';


import './Index.scss';

const Index = () => {
  return (
    <>
      <Header/>
      <LastCourses/>
      <AboutUs/>
      <PopularCourses/>
    </>
  )
}

export default Index;