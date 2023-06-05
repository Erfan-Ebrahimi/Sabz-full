// ------------COMPONENTS-------------------//
import AboutUs from '../../components/AboutUs/AboutUs';
import Header from '../../components/Header/Header';
import LastArticles from '../../components/LastArticles/LastArticles';
import LastCourses from '../../components/LastCourses/LastCourses';
import PopularCourses from '../../components/PopularCourses/PopularCourses';
import PresellCourses from '../../components/PresellCourses/PresellCourses';


import './Index.scss';

const Index = () => {
  return (
    <>
      <Header/>
      <LastCourses/>
      <AboutUs/>
      <PopularCourses/>
      <PresellCourses/>
      <LastArticles/>
    </>
  )
}

export default Index;