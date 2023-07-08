import './CourseInfo.scss';

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

import img from '../../assets/images/courses/jango.png';
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
  const [courseCategory, setCourseCategory] = useState([])     //why array ???????????? bepors
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
        setComments(courseInfo.comments)
        setSessions(courseInfo.sessions)
        setCourseDetails(courseInfo)
        setCreatedAt(courseInfo.createdAt)
        setUpdatedAt(courseInfo.updatedAt)
        setCourseTeacher(courseInfo.creator)
        setCourseCategory(courseInfo.categoryID.title)
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
          { id: 2, title: 'دوره های فرانت', to: 'category-info/fd' },
          { id: 3, title: 'دوره سلام', to: 'course-info/fr' }
        ]}
      />

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                {courseCategory}
              </a>
              <h1 className="course-info__title">
                {courseDetails.name}
              </h1>
              <p className="course-info__text">
                {courseDetails.description}
              </p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              <video src="" poster={img} className="course-info__video" controls></video>
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

                {/* Start Course Progress */}
                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      درصد پیشرفت دوره: 100%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: '75%' }}
                    >
                    </div>
                  </div>
                </div>
                {/* Finish Course Progress  */}

                {/* <!-- Start Introduction --> */}
                <div className="introduction">
                  <div className="introduction__item">
                    <SectionHeader title='آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار' />
                    <img src={img} alt="course info image" className="introduction__img img-fluid" />
                    <p className="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                    </p>
                  </div>
                  <div className="introduction__item">
                    <SectionHeader title='هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب درآمد)' />
                    <img src={img} alt="course info image" className="introduction__img img-fluid" />
                    <p className="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده باشد                  </p>
                    <p className="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد. آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه، نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a href="#" className="introduction__btns-item">دانلود همگانی ویدیوها</a>
                    <a href="#" className="introduction__btns-item">دانلود همگانی پیوست‌ها</a>
                  </div>
                  {/* <!-- Start ISessions --> */}
                  <div className="introduction__topic">
                    <Accordion>

                      <Accordion.Item className="accordion">
                        <Accordion.Header>معرفی دوره</Accordion.Header>
                        {
                          sessions.map((session, index) => (
                            <Accordion.Body key={session._id} className='introduction__accordion-body'>
                              {(session.free === 1 || courseDetails.isUserRegisteredToThisCourse) ?
                                (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <i className="fab fa-youtube introduction__accordion-icon"></i>
                                      <Link to={`/${courseName}/${session._id}`} className="introduction__accordion-link">
                                        {session.title}
                                      </Link>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        {session.time}
                                      </span>
                                    </div>

                                  </>
                                )
                                :
                                (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <i className="fab fa-youtube introduction__accordion-icon"></i>
                                      <span className="introduction__accordion-link">
                                        {session.title}
                                      </span>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        {session.time}
                                      </span>
                                      <i className='fa fa-lock lock-icon-session'></i>
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
                {/* <!-- Finish Introduction --> */}

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
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="techer-details__header-name">{courseTeacher.role}</span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>
                {/* Finish Teacher Details*/}
                {/*  */}
                <CommentsTextArea comments={comments} submitComment={submitComment} />
              </div>
            </div>
            {/* Finish Course Main  */}

            {/* Start Course Sidebar  */}
            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {
                      courseDetails.isUserRegisteredToThisCourse ?
                        (
                          <span className="course-info__register-title">
                            <i className="fas fa-graduation-cap course-info__register-icon"></i>
                            &nbsp; دانشجوی دوره هستید&nbsp;
                          </span>

                        )
                        :
                        (
                          <button className="course-info__register-title" onClick={() => registerInCourse(courseDetails)}>
                            <i className="fas fa-graduation-cap course-info__register-icon"></i>
                            &nbsp;ثبت نام &nbsp;
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
                          {courseDetails.discount} بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <a className="course-info__short-url">
                    {`http://sabzlearn.ir`}
                  </a>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <Link to={`/course-info/${courseDetails.shortName}`} style={{ color: 'blue', fontWeight: 'bold' }}>
                      &nbsp; لینک &nbsp;
                    </Link>
                    کلیک کنید&nbsp;
                  </span>
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