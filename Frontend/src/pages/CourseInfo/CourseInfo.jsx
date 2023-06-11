import './CourseInfo.scss';

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const CourseInfo = () => {
  return (
    <>
        <Topbar/>
        <Navbar/>
        <Breadcrumb 
          links={[
              {id: 1 , title: 'خانه' , to:'' },
              {id: 2 , title: 'دوره های فرانت' , to:'category-info/fd' },
              {id: 3 , title: 'دوره سلام' , to:'course-info/fr' }
          ]}
        />
        <Footer/>
    </>
  )
}

export default CourseInfo;