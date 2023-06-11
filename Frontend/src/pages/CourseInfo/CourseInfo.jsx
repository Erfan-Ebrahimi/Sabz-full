import './CourseInfo.scss';

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

import img from '../../assets/images/courses/jango.png';
import CourseDetailBox from '../../components/CourseDetailBox/CourseDetailBox';

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
        
        
        <section className="course-info">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <a href="#" className="course-info__link">
                  آموزش برنامه نویسی فرانت اند
                </a>
                <h1 className="course-info__title">
                  آموزش 20 کتابخانه جاوااسکریپت برای بازار کار
                </h1>
                <p className="course-info__text">
                  امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری که حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده سازی نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس شما هم اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های کاربردی که در بازار کار استفاده می شوند را به خوبی بلد باشید
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
              <div className="col-8">
                <div className="course">
                  {/* Start Course Boxes  */}
                  <div className="course-boxes">
                    <div className="row">
                      <CourseDetailBox 
                        title='وضعیت دوره' 
                        text='به اتمام رسیده'
                        icon='graduation-cap'
                      />
                      <CourseDetailBox 
                        title='مدت زمان دوره' 
                        text='19 ساعت' 
                        icon='clock'
                      />
                      <CourseDetailBox 
                        title='آخرین بروزرسانی' 
                        text='1401/03/02'
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
                        style={{width: '75%'}}
                      >
                      </div>
                    </div>
                  </div>
                  {/* Finish Course Progress  */}
                </div>
              </div>
            </div>
          </div>
        </main>


        <Footer/>
    </>
  )
}

export default CourseInfo;