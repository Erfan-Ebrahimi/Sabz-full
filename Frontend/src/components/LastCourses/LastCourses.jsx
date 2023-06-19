import { useCallback, useEffect, useState } from 'react';
import CourseBox from '../CourseBox/CourseBox';
import SectionHeader from '../SectionHeader/SectionHeader';
import './LastCourses.scss';

const LastCourses = () => {
    const [courses, setCourses] = useState([])

    // ------get all courses from api
    useEffect(useCallback(() => {
        fetch('http://localhost:4000/v1/courses')
            .then(res => res.json())
            .then(allCourses => setCourses(allCourses))
    }), [])

    return (
        <div className="courses">
            <div className="container">
                <SectionHeader
                    title='جدیدترین دوره ها'
                    desc='سکوی پرتاب شما به  سمت موفقیت'
                    btnTitle=' تمام دوره ها'
                    btnHref='courses/1'
                />
                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {courses.splice(0, 6).map(course => (<CourseBox key={course._id} {...course} />))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastCourses;