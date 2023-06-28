import { useState, useEffect , useCallback } from 'react';
import './PresellCourses.scss'
import SectionHeader from '../SectionHeader/SectionHeader';

// -------Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from '../CourseBox/CourseBox';


const PresellCourses = () => {
  const [presellCourses, setPresellCourses] = useState([])

  // ------get presell courses from api
  useEffect(useCallback(() => {
    fetch('http://localhost:4000/v1/courses/presell')
      .then(res => res.json())
      .then(allPresellCourses => setPresellCourses(allPresellCourses))
  }), [])
  return (
    <>
      <div className='presell'>
        <div className="container">
          <SectionHeader title='دوره های در حال پیش فروش' desc='زودتر بخر تخفیف بگیر' />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  className="mySwiper"
                >
                  {presellCourses.map((course) => (
                    <SwiperSlide>
                      {/* isSlider for style  */}
                      <CourseBox {...course} isSlider={true} />               
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

export default PresellCourses