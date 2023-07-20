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
  const [orderedCourses, setOrderedCourses] = useState([]); // courses ra dastkari nemikonim v az in state baray taghhyrat estefadeh mikonim
  const [status, setStatus] = useState('default') // for sort courses
  const [statusTitle, setStatusTitle] = useState('مرتب سازی پیش فرض') // for value sort select
  const [searchValue, setSearchValue] = useState('')
  const [shownCourses, setShownCourses] = useState([])     //for PAGINATION

  const { categoryName } = useParams()
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(allCourses => {
        setCourses(allCourses)
        setOrderedCourses(allCourses)
      })
  }, [categoryName])

  //for sort courses
  useEffect(() => {
    switch (status) {
      case 'free': {
        const freeCourses = courses.filter(course => course.price === 0)
        setOrderedCourses(freeCourses)
        break
      }
      case 'money': {
        const notFreeCourses = courses.filter(course => course.price !== 0)
        setOrderedCourses(notFreeCourses)
        break
      }
      case 'last': {
        setOrderedCourses(courses)
        break
      }
      case 'first': {
        const reversedCourses = courses.slice().reverse() //aval slice mikonim bad reverse ta roy state asli taghyery ijad nashavad
        setOrderedCourses(reversedCourses)
        break
      }
      default: {
        setOrderedCourses(courses)
      }
    }
  }, [status])

  // for sort input handler
  const statusTitleChangeHandler = event => {
    setStatusTitle(event.target.textContent)
  }

  // for search input handler
  const searchValueChangeHandler = event => {
    setSearchValue(event.target.value)

    const filteredCourses = courses.filter((course) => course.name.includes(event.target.value))

    setOrderedCourses(filteredCourses)

  }


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
                            <div className="courses-top-bar__selection">
                              <span className="courses-top-bar__selection-title">
                                {statusTitle}
                                <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                              </span>
                              <ul className="courses-top-bar__selection-list">
                                <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active" onClick={(event) => {
                                  setStatus('مرتب سازی پیش فرض')
                                  statusTitleChangeHandler(event)
                                }}
                                >
                                  مرتب سازی پیش فرض
                                </li>
                                <li className="courses-top-bar__selection-item"
                                  onClick={(event) => {
                                    setStatus('free')
                                    statusTitleChangeHandler(event)
                                  }}
                                >
                                  دوره های رایگان
                                </li>
                                <li className="courses-top-bar__selection-item"
                                  onClick={(event) => {
                                    setStatus('money')
                                    statusTitleChangeHandler(event)
                                  }}
                                >
                                  دوره های پولی
                                </li>
                                <li className="courses-top-bar__selection-item"
                                  onClick={(event) => {
                                    setStatus('last')
                                    statusTitleChangeHandler(event)
                                  }}
                                >
                                  مربت سازی بر اساس اولین
                                </li>
                                <li className="courses-top-bar__selection-item"
                                  onClick={(event) => {
                                    setStatus('first')
                                    statusTitleChangeHandler(event)
                                  }}
                                >
                                  مربت سازی بر اساس آخرین
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="courses-top-bar__left">
                            <form action="#" className="courses-top-bar__form">
                              <input
                                type="text"
                                className="courses-top-bar__input"
                                placeholder="جستجوی دوره ..."
                                value={searchValue}
                                onChange={searchValueChangeHandler}
                              />
                              <i className="fas fa-search courses-top-bar__search-icon"></i>
                            </form>
                          </div>

                        </div>
                      </div>
                    </section>

                    {shownCourses.length === 0 ?
                      (
                        <div className='alert alert-warning'>هیچ ذوره ایی برای این مرتب سازی وجود ندارد :(</div>
                      )
                      :
                      (
                        <>
                          {shownCourses.map(course => (<CourseBox key={course._id} {...course} />))}
                        </>
                      )
                    }

                    <Pagination
                      items={orderedCourses} //orderd ra mifrestim for pagination
                      itemsCount={3}
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