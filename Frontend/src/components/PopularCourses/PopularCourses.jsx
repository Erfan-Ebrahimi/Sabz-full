import { useState, useEffect, useCallback } from 'react';
import './PopularCourses.scss'
import SectionHeader from '../SectionHeader/SectionHeader'


// -------Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from '../CourseBox/CourseBox';



const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([])

  // ------get popular courses from api
  useEffect(useCallback(() => {
    fetch('http://localhost:4000/v1/courses/popular')
      .then(res => res.json())
      .then(allPopularCourses => setPopularCourses(allPopularCourses))
  }), [])
  return (
    <>
      <div className='popular'>
        <div className="container">
          <SectionHeader title='محبوب ترین دوره ها' desc='دوره های محبوب از نظر دانشجویان' />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  className="mySwiper"
                >
                  {popularCourses.map((course) => (
                    <SwiperSlide key={course._id}>
                      {/* isSlider for style  */}
                      <CourseBox  {...course} isSlider={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopularCourses;