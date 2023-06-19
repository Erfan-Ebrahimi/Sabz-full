import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Category.scss';

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import CourseBox from '../../components/CourseBox/CourseBox';
import Pagination from '../../components/Pagination/Pagination';


const Category = () => {

  const [courses, setCourses] = useState([])
  const [shownCourses , setShownCourses] = useState([])     //for PAGINATION

  const { categoryName } = useParams()
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(allCourses => setCourses(allCourses))
  }, [categoryName])
  return (
    <>
      <Topbar />
      <Navbar />


      <div className="courses-content">
        <div className="container">
          <div className="row">
            {
              courses.length === 0 ?
                (<div className='alert alert-warning'>هنوز برای این دسته بندی دوره ایی موجود نمی باشد !!</div>)
                :
                (
                  <>
                    <section className="courses">
                      <div className="container">
                        <div className="courses-top-bar">

                          <div className="courses-top-bar__right">
                            <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                              <i className="fas fa-border-all courses-top-bar__icon"></i>
                            </div>
                            <div className="courses-top-bar__column-btn">
                              <i className="fas fa-align-left courses-top-bar__icon"></i>
                            </div>

                            <div className="courses-top-bar__selection">
                              <span className="courses-top-bar__selection-title">
                                مرتب سازی پیش فرض
                                <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                              </span>
                              <ul className="courses-top-bar__selection-list">
                                <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">مرتب سازی پیش فرض</li>
                                <li className="courses-top-bar__selection-item">مربت سازی بر اساس محبوبیت</li>
                                <li className="courses-top-bar__selection-item">مربت سازی بر اساس امتیاز</li>
                                <li className="courses-top-bar__selection-item">مربت سازی بر اساس آخرین</li>
                                <li className="courses-top-bar__selection-item">مربت سازی بر اساس ارزان ترین</li>
                                <li className="courses-top-bar__selection-item">مربت سازی بر اساس گران ترین</li>
                              </ul>
                            </div>
                          </div>

                          <div className="courses-top-bar__left">
                            <form action="#" className="courses-top-bar__form">
                              <input type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..." />
                              <i className="fas fa-search courses-top-bar__search-icon"></i>
                            </form>
                          </div>

                        </div>
                      </div>
                    </section>
                    {shownCourses.map(course => (<CourseBox key={course._id} {...course} />))}
                    <Pagination
                      items={courses}
                      itemsCount={2}
                      pathname={`/category-info/${categoryName}`}
                      setShownCourses={setShownCourses}
                    />

                  </>
                )
            }

          </div>
        </div>
      </div>


      <Footer />

    </>
  )
}

export default Category