import React, { useEffect, useState } from "react";
import './Courses.scss';

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [courseMenu, setcourseMenu] = useState('all'); //for style
    const [filteredCourses, setFilteredCourses] = useState([])

    useEffect(() => {
        getUserCourses()
    }, []);

    // --------get user courses
    function getUserCourses() {
        fetch(`http://localhost:4000/v1/users/courses/`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
                setFilteredCourses(data)
            });
    }

    // ------------filter courses
    const filter = (state) => {
        switch (state) {
            case "all": {
                setFilteredCourses(courses)
                break

            }
            case "free": {
                const filterFree = courses.filter(course => course.course.price === 0)
                setFilteredCourses(filterFree)
                break
            }
            case "money": {
                const filterMoney = courses.filter(course => course.course.price !== 0)
                setFilteredCourses(filterMoney)
                break
            }
            default: {
                setFilteredCourses(courses)
            }
        }
    }

    return (
        <div className="col-9">
            <div className="courses">
                <div className="courses-header">
                    <span className="courses-header__title title">دوره های ثبت نام شده</span>
                    <ul className="courses-header__list">
                        <li
                            className="courses-header__item"
                            onClick={(e) => {
                                setcourseMenu('all')
                                e.preventDefault()
                                filter('all')
                            }}
                        >
                            <a

                                className={`courses-header__link  ${courseMenu === 'all' && 'courses-header__link-active'}`}
                                href="#"
                            >
                                همه دوره ها
                            </a>
                        </li>
                        <li
                            className="courses-header__item"
                            onClick={(e) => {
                                setcourseMenu('free')
                                e.preventDefault()
                                filter('free')
                            }}
                        >
                            <a className={`courses-header__link  ${courseMenu === 'free' && 'courses-header__link-active'}`} href="#">
                                دوره های رایگان
                            </a>
                        </li>
                        <li
                            className="courses-header__item"
                            onClick={(e) => {
                                setcourseMenu('money')
                                e.preventDefault()
                                filter('money')
                            }}
                        >
                            <a className={`courses-header__link  ${courseMenu === 'money' && 'courses-header__link-active'}`} href="#">
                                دوره های پولی
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="main1">
                    <div className="row">
                        <div className="col-12">
                            {
                                filteredCourses.length !== 0 ?
                                    (
                                        <>
                                            {filteredCourses.map((course) => (
                                                <div className="main__box" key={course._id}>
                                                    <div className="main__box-right">
                                                        <a className="main__box-img-link" href="#">
                                                            <img
                                                                className="main__box-img img-fluid"
                                                                src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="main__box-left mt-4">
                                                        <a href="#" className="main__box-title">
                                                            {course.course.name}
                                                        </a>
                                                        <div className="main__box-bottom">
                                                            <div className="main__box-all">
                                                                <span className="main__box-all-text">وضعیت: </span>
                                                                <span className="main__box-all-value">{course.course.isComplete ? 'تکمیل شده' : 'در حال برگزاری'}</span>
                                                            </div>
                                                            <div className="main__box-completed">
                                                                <span className="main__box-completed-text">
                                                                    قیمت :
                                                                </span>
                                                                <span className="main__box-completed-value">{course.course.price ? (course.course.price) : 'رایکان'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )
                                    :
                                    (
                                        <p className="alert alert-warning">هیچ دوره ایی موجود نیست</p>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses