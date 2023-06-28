import './CourseBox.scss';
import { useState } from 'react';
import CircleSpinner from '../CircleSpinner/CircleSpinner';
import star from '../../assets/images/svgs/star_fill.svg';
import { Link } from 'react-router-dom';

const CourseBox = (props) => {

  // --------state & function for loader images
  const [isShowImg, setIsShowImg] = useState(false)
  const onImgLoaded = () => setIsShowImg(true)

  return (
    <div className="col-4" style={{width:`${props.isSlider && '100%'}`}}>
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            src={`assets/images/courses/${props.cover}`}
            alt="Course img"
            className="course-box__img"
            onLoad={onImgLoaded}
          />

          {/*--------- IMG LOADER ----------- */}
          {
            !isShowImg && <CircleSpinner />
          }
        </Link>
        <div className="course-box__main">
          <Link to={`/course-info/${props.shortName}`} className="course-box__title">
            {props.name}
          </Link>
          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">{props.creator}</a>
            </div>
            <div className="course-box__rating">
              <img src={star} alt="rating" className="course-box__star" />
              <img src={star} alt="rating" className="course-box__star" />
              <img src={star} alt="rating" className="course-box__star" />
              <img src={star} alt="rating" className="course-box__star" />
              <img src={star} alt="rating" className="course-box__star" />
            </div>
          </div>
          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{props.discount}</span>
            </div>
            <span className="course-box__price">
              {props.price === 0 ? 'رایگان' : props.price.toLocaleString() }
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link to={`/course-info/${props.shortName}`} className="course-box__footer-link">
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default CourseBox;