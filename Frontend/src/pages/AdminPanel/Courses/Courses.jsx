import './Courses.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getAllCourses()
    }, [])

    // -----------get courses
    function getAllCourses() {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/courses', {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then((allCourses) => {
                setCourses(allCourses)
                console.log(allCourses);
            })
    }
    return (
        <DataTable title="دوره ها">
            <table className="table">
                <thead>
                    <tr>
                        <th>ردیف</th>
                        <th> عنوان دوره </th>
                        <th>دسته بندی</th>
                        <th>مدرس</th>
                        <th>وضعیت دوره</th>
                        <th>قیمت</th>
                        <th>لینک</th>
                        <th>تعداد دانشجو</th>
                        <th>ویرایش</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={course._id}>
                            <td>{index + 1}</td>
                            <td>{course.name}</td>
                            <td>{course.categoryID.title}</td>
                            <td>{course.creator}</td>
                            <td>{course.isComplete ? 'تکمیل شده' : 'در حال برگزاری'}</td>
                            <td>{course.price ? course.price.toLocaleString() : 'رایگان'}</td>
                            <td> <Link to="#" className='link-courses'> {course.shortName}</Link></td>
                            <td>{course.discount}</td>
                            <td>
                                <button type="button" className="btn btn-primary edit-btn">
                                    ویرایش
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger edit-btn">
                                    حذف
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </DataTable>
    )
}

export default Courses;