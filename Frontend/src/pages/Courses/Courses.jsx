import './Courses.scss';


import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CourseBox from '../../components/CourseBox/CourseBox';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';



const Courses = () => {
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
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
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