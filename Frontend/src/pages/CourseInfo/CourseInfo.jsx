import './CourseInfo.scss';

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

import CourseDetailBox from '../../components/CourseDetailBox/CourseDetailBox';
import CommentsTextArea from '../../components/CommentsTextArea/CommentsTextArea';

import Accordion from 'react-bootstrap/Accordion';

// -------------SPA
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ------------SWAL
import swal from 'sweetalert';

const CourseInfo = () => {

  // ---------------states for course data
  // chon data shamel chandin array mibashad pas baray har bakhsh data  yek state joda dar nazar migirim
  const [comments, setComments] = useState([])
  const [sessions, setSessions] = useState([])
  const [courseDetails, setCourseDetails] = useState({}) //baghiy data be joz comments & sessions dar in state save mishavad
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [courseTeacher, setCourseTeacher] = useState({})
  const [courseCategory, setCourseCategory] = useState([])//why array ???????????? bepors 
  const [categoryHref, setCategoryHref] = useState('')     
  const [relatedCourses, setRelatedCourses] = useState([])

  const { courseName } = useParams()

  useEffect(() => {
    getCourseDetails()
    getRelatedCourses()
  }, [courseName])

  // --------------get course data from api
  function getCourseDetails() {
    // aval check mikonim k tokeni hast ya n k if fetch ham anjam shod baz karbari k token dare betone dastresi dashte bashe
    // film jalase 349 dide shavad
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorageData === null ? null : localStorageData.token}` // yani shakhs hanoz login nakarde
      }
    })
      .then(res => res.json())
      .then(courseInfo => {
        console.log(courseInfo);
        setComments(courseInfo.comments)
        setSessions(courseInfo.sessions)
        setCourseDetails(courseInfo)
        setCreatedAt(courseInfo.createdAt)
        setUpdatedAt(courseInfo.updatedAt)
        setCourseTeacher(courseInfo.creator)
        setCourseCategory(courseInfo.categoryID.title)
        setCategoryHref(courseInfo.categoryID.name)
      })
  }

  //------------submit new comment
  //newCommentBody & score az CommentsTextArea.jsx btn submitComment miad
  const submitComment = (newCommentBody, score) => {
    const newCommentDetails = {
      body: newCommentBody,
      courseShortName: courseName,
      score
    }
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch('http://localhost:4000/v1/comments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorageData.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCommentDetails)
    }).then(res => res.json())
      .then(data => {
        swal({
          title: 'کامنت با موفقیت ثبت شد بعد از تایید مدیر نشان داده خواهد شد',
          icon: 'success',
          buttons: 'تایید'
        })
      })
  }

  // --------register in course
  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: course.price,
            }),
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getCourseDetails();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((code) => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  price: course.price,
                }),
              }).then((res) => {
                console.log(res);
                if (res.ok) {
                  swal({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    buttons: "اوکی",
                  }).then(() => {
                    getCourseDetails();
                  });
                }
              });
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {
                  console.log(res);

                  if (res.status == 404) {
                    swal({
                      title: "کد تخفیف معتبر نیست",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else if (res.status == 409) {
                    swal({
                      title: "کد تخفیف قبلا استفاده شده :/",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else {
                    return res.json();
                  }
                })
                .then((code) => {
                  fetch(
                    `http://localhost:4000/v1/courses/${course._id}/register`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                          }`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price: course.price - (course.price * code.percent / 100)
                      }),
                    }
                  ).then((res) => {
                    console.log(res);
                    if (res.ok) {
                      swal({
                        title: "ثبت نام با موفقیت انجام شد",
                        icon: "success",
                        buttons: "اوکی",
                      }).then(() => {
                        getCourseDetails();
                      });
                    }
                  });
                });
            }
          });
        }
      });
    }
  };

  // --------get related courses
  function getRelatedCourses() {
    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then(res => res.json())
      .then(data => setRelatedCourses(data))
  }
  return (
    <>
      <Topbar />
      <Navbar />


      <Breadcrumb
        links={[
          { id: 1, title: 'خانه', to: '' },
          { id: 2, title: 'دوره ها ', to: 'courses/1' },
          { id: 3, title: courseDetails.name, to: `course-info/${courseDetails.shortName}` }
        ]}
      />

      <section className="course-info-1">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <Link to={`/category-info/${categoryHref}/1`} className="course-info-1__link">
                {courseCategory}
              </Link>
              <h1 className="course-info-1__title">
                {courseDetails.name}
              </h1>
              <p className="course-info-1__text">
                {courseDetails.description}
              </p>
              <div className="course-info-1__social-media">
                <a href="#" className="course-info-1__social-media-item">
                  <i className="fab fa-telegram-plane course-info-1__icon"></i>
                </a>
                <a href="#" className="course-info-1__social-media-item">
                  <i className="fab fa-twitter course-info-1__icon"></i>
                </a>
                <a href="#" className="course-info-1__social-media-item">
                  <i className="fab fa-facebook-f course-info-1__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-5">
              <img src={`http://localhost:4000/courses/covers/${courseDetails.cover}`} className='course-info-1__cover' ></img>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="row">
            {/* Start Course Main  */}
            <div className="col-8">
              <div className="course">
                {/* Start Course Boxes  */}
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      title='وضعیت دوره'
                      text={courseDetails.isComplete === 1 ? 'به اتمام رسیده' : 'در حال برگزاری'}
                      icon='graduation-cap fa-fade'
                    />
                    <CourseDetailBox
                      title='شروع دوره'
                      text={createdAt.slice(0, 10)}
                      icon='flag-checkered'
                    />
                    <CourseDetailBox
                      title='آخرین بروزرسانی'
                      text={updatedAt.slice(0, 10)}
                      icon='calendar-alt'
                    />
                    <CourseDetailBox
                      title='روش پشتیبانی'
                      text='آنلاین'
                      icon='user-alt'
                    />
                    <CourseDetailBox
                      title='پیش نیاز'
                      text='HTML CSS'
                      icon='info-circle'
                    />
                    <CourseDetailBox
                      title='نوع مشاهده'
                      text='ضبط شده / آنلاین'
                      icon='play'
                    />
                  </div>
                </div>
                {/* finish Course Box */}

                {/* <!-- Start Introduction --> */}
                <div className="introduction">
                  
                  {/* <!-- Start ISessions --> */}
                  <div className="introduction__topic">
                    <Accordion>

                      <Accordion.Item className="accordion" defaultActiveKey="0">
                        <Accordion.Header>فصل اول</Accordion.Header>
                        {
                          sessions.map((session, index) => (
                            <Accordion.Body key={session._id} className='introduction__accordion-body'>
                              {(session.free === 1 || courseDetails.isUserRegisteredToThisCourse) ?
                                (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <Link to={`/${courseName}/${session._id}`} className="introduction__accordion-link">
                                        {session.title}
                                      </Link>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        {session.time}:00
                                      </span>
                                    </div>

                                  </>
                                )
                                :
                                (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <span className="introduction__accordion-link">
                                        {session.title}
                                      </span>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <i className='fa fa-lock lock-icon-session'></i>
                                      <span className="introduction__accordion-time">
                                        {session.time}:00
                                      </span>
                                    </div>

                                  </>
                                )
                              }
                            </Accordion.Body>
                          ))
                        }
                      </Accordion.Item>
                      <Accordion.Item className="accordion" eventKey="0">
                        <Accordion.Header>فصل دوم</Accordion.Header>
                        {
                          sessions.map((session, index) => (
                            <Accordion.Body key={session._id} className='introduction__accordion-body'>
                              {(session.free === 1 || courseDetails.isUserRegisteredToThisCourse) ?
                                (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <Link to={`/${courseName}/${session._id}`} className="introduction__accordion-link">
                                        {session.title}
                                      </Link>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        {session.time}:00
                                      </span>
                                    </div>

                                  </>
                                )
                                :
                                (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <span className="introduction__accordion-link">
                                        {session.title}
                                      </span>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <i className='fa fa-lock lock-icon-session'></i>
                                      <span className="introduction__accordion-time">
                                        {session.time}:00
                                      </span>
                                    </div>

                                  </>
                                )
                              }
                            </Accordion.Body>
                          ))
                        }
                      </Accordion.Item>


                    </Accordion>
                  </div>

                </div>

                {/*  Start Teacher Details */}
                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <img src={`/assets${courseTeacher.profile}`} alt="Teacher Profile" className="techer-details__header-img" />
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                          {courseTeacher.name}
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer<br />
                          {courseTeacher.phone}
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left btn--3">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="">{courseTeacher.role}</span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت داشته باشم...
                  </p>
                </div>
                {/* Finish Teacher Details*/}
                <CommentsTextArea comments={comments} submitComment={submitComment} />
              </div>
            </div>
            {/* Start Course Sidebar  */}
            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {
                      courseDetails.isUserRegisteredToThisCourse ?
                        (
                          <button className="course-info__register-title btn--3" disabled>
                            <i className="fas fa-graduation-cap course-info__register-icon"></i>
                             دانشجوی دوره هستید
                          </button>

                        )
                        :
                        (
                          <button className="course-info__register-title btn--3" onClick={() => registerInCourse(courseDetails)}>
                            <i className="fas fa-graduation-cap course-info__register-icon"></i>
                            ثبت نام
                          </button>
                        )
                    }
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseDetails.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          {comments.length} دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          {1025} بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                {
                  relatedCourses.length  ? (
                    <div className="course-info">
                      <span className="course-info__courses-title">دوره های مرتبط</span>
                      <ul className="course-info__courses-list">
                        {relatedCourses.map(relatedCourse => (
                          <li key={relatedCourse._id} className="course-info__courses-list-item">
                            <Link to={`/course-info/${relatedCourse.shortName}`} className="course-info__courses-link">
                              <img src={`http://localhost:4000/courses/covers/${relatedCourse.cover}`} alt="Course Cover" className="course-info__courses-img" />
                              <span className="course-info__courses-text">
                                {relatedCourse.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                  ) 
                  :
                  (
                    <p className='alert alert-info'>دوره ی مرتبطی وجود ندارد</p>
                  )
                }
              </div>
            </div>
            {/* Finish Course Sidebar  */}

          </div>
        </div>
      </main>


      <Footer />
    </>
  )
}

export default CourseInfo;