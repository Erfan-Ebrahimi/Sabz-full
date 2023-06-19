import './Courses.scss';


import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CourseBox from '../../components/CourseBox/CourseBox';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';
import { useEffect, useState } from 'react';



const Courses = () => {

    const [courses , setCourses] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/courses')
        .then(res => res.json())
        .then(allCourses => setCourses(allCourses))
    } , [])
    return (
        <>
            <Topbar />
            <Navbar />
            <Breadcrumb
                links={[
                    { id: 1, title: 'خانه', to: '' },
                    { id: 2, title: 'تمامی دوره ها', to: 'courses' },
                ]}
            />

            {/* <!--------------------------------  Courses-Section  --------------------------------> */}
            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {courses.map(course => (<CourseBox key={course._id} {...course} />))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--------------------------------  Courses-Section  --------------------------------> */}

            <Pagination />
            <Footer />
        </>
    )
}

export default Courses;