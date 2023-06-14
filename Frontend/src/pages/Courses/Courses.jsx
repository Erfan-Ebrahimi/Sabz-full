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
            <section class="courses">
                <div class="container">
                    <div class="courses-content">
                        <div class="container">
                            <div class="row">
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

                    {/* <div class="courses-pagination">
                        <ul class="courses__pagination-list">
                            <li class="courses__pagination-item">
                                <a href="#" class="courses__pagination-link">
                                    <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                                </a>
                            </li>
                            <li class="courses__pagination-item">
                                <a
                                    href="#"
                                    class="courses__pagination-link courses__pagination-link--active"
                                >
                                    1
                                </a>
                            </li>
                            <li class="courses__pagination-item">
                                <a href="#" class="courses__pagination-link">
                                    2
                                </a>
                            </li>
                            <li class="courses__pagination-item">
                                <a href="#" class="courses__pagination-link">
                                    3
                                </a>
                            </li>
                        </ul>
                    </div> */}
                    <Pagination/>
                </div>
            </section>
            {/* <!--------------------------------  Courses-Section  --------------------------------> */}

            <Footer />
        </>
    )
}

export default Courses;