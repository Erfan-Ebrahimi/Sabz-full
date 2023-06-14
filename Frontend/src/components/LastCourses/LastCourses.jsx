import CourseBox from '../CourseBox/CourseBox';
import SectionHeader from '../SectionHeader/SectionHeader';
import './LastCourses.scss';

const LastCourses = () => {
    return (
        <div className="courses">
            <div className="container">
                <SectionHeader
                    title='جدیدترین دوره ها'
                    desc='سکوی پرتاب شما به  سمت موفقیت'
                    btnTitle=' تمام دوره ها'
                    btnHref='courses'
                />
                <div class="courses-content">
                    <div class="container">
                        <div class="row">
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
        </div>
    )
}

export default LastCourses;