import './Courses.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../components/Form/Input";
import {
    requiredValidator,
    minValidator,
    maxValidator,
} from "./../../../validators/rules";


const Courses = () => {
    const [courses, setCourses] = useState([])
    const [courseCategory, setCourseCategory] = useState('-1'); //for select box to set category
    const [categories, setCategories] = useState([]);  //get all categories for set category in add new course
    const [courseStatus, setCourseStatus] = useState('start')
    const [courseCover, setCourseCover] = useState(false)
    const [sizeFile, setSizeFile] = useState('')

    // ---------form inputs
    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            shortName: {
                value: "",
                isValid: false,
            },
            price: {
                value: "",
                isValid: false,
            },
            support: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllCourses()
        getAllCategories()
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
            })
    }

    // ----------remove course
    const removeCourse = (courseID) => {
        swal({
            title: "آیا از حذف دوره مطمئنی ؟",
            icon: "warning",
            buttons: ['نه', 'آره'],
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    const localStorageData = JSON.parse(localStorage.getItem('user'))
                    fetch(`http://localhost:4000/v1/courses/${courseID}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorageData.token}`

                        }
                    }).then((res) => {
                        if (res.ok) {
                            swal("حذف شد!", "", "success").then(result => getAllCourses())
                        }
                    })
                }
            });
    }

    // ----------get all categories
    function getAllCategories() {
        fetch(`http://localhost:4000/v1/category`)
            .then((res) => res.json())
            .then((allCategories) => {
                setCategories(allCategories);
            });
    }

    // ---------- set category for new course
    const selectCategory = (event) => {
        setCourseCategory(event.target.value);
    };

    // ---------add new course
    const addNewCourse = event => {
        event.preventDefault()

        let formData = new FormData()
        formData.append('name', formState.inputs.name.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('categoryID', courseCategory)
        formData.append('price', formState.inputs.price.value)
        formData.append('support', formState.inputs.support.value)
        formData.append('status', courseStatus)
        formData.append('cover', courseCover)

        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/courses', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: formData
        }).then((res) => {
            if (res.ok) {
                res.json()
                swal({
                    title: 'دوره با موفقیت اضافه شد :)',
                    icon: 'success',
                    buttons: 'OK'
                }).then((ok) => {
                    getAllCourses()
                })
            } else {
                swal({
                    title: 'اطلاعات داده شده صحیح نمی باشد',
                    icon: 'warning',
                    buttons: 'OHHHH'
                })
            }
        })
    };

    // ----edit course
    const editCourse = () => {
        swal({
            title: 'این بخش در حال توسعه می باشد',
            icon: 'success',
            buttons: 'اوکی'
        })
    }
    // ------------show size files
    const showSize = (fileData) => {
        const { name: fileName, size } = fileData[0]
        setSizeFile({ fileName, size })
    }
    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن دوره جدید</span>
                    </div>
                    <form className="form">
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">نام دوره</label>
                                <Input
                                    id="name"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(5), requiredValidator()]}
                                    type="text"
                                    placeholder="لطفا نام دوره را وارد کنید..."
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">توضیحات دوره</label>
                                <Input
                                    id="description"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(5), requiredValidator()]}
                                    type="text"
                                    placeholder="لطفا توضیحات دوره را وارد کنید..."
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="number input">
                                <label className="input-title">Url دوره</label>
                                <Input
                                    id="shortName"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(3), requiredValidator()]}
                                    type="text"
                                    isValid="false"
                                    placeholder="لطفا Url دوره را وارد کنید..."
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">قیمت دوره</label>
                                <Input
                                    id="price"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(1), requiredValidator()]}
                                    type="number"
                                    isValid="false"
                                    placeholder="لطفا قیمت دوره را وارد کنید..."
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">نحوه پشتیبانی دوره</label>
                                <Input
                                    id="support"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(5), requiredValidator()]}
                                    type="text"
                                    isValid="false"
                                    placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">


                            <div className="input">
                                <label className="input-title">دسته‌بندی دوره</label>
                                <select onChange={selectCategory}>
                                    <option value='-1'>یک دسته بندی انتخاب کنید</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>+{category.title}+</option>
                                    ))}
                                </select>
                            </div>





                        </div>
                        <div className="col-12">
                            <div className="">
                                <div className="input file-input">
                                    <label className="input-title" for='file'>عکس دوره<i className='icon-file fa-solid fa-upload'></i></label>
                                    <input
                                        type="file"
                                        className='file'
                                        id="file"
                                        onChange={event => {
                                            setCourseCover(event.target.files[0])
                                            showSize(event.target.files)
                                        }}
                                    />
                                    {
                                        sizeFile ? <p className='file-size'>{sizeFile.fileName} , {(sizeFile.size/1000).toFixed(2)}KB</p> : <p className='text-danger'>عکسی انتخاب نشده است</p>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="input-title1">وضعیت دوره</label>
                            <div className="condition">

                                <div className="customCheckBoxHolder radios">
                                    <input
                                        className="customCheckBoxInput"
                                        id="cCB1"
                                        type="radio"
                                        value="start"
                                        name="condition"
                                        defaultChecked
                                        onInput={event => setCourseStatus(event.target.value)}
                                    />
                                    <label className="customCheckBoxWrapper" for="cCB1">
                                        <div className="customCheckBox">
                                            <div className="inner">در حال برگزاری</div>
                                        </div>
                                    </label>
                                    <input
                                        className="customCheckBoxInput"
                                        id="cCB2"
                                        type="radio"
                                        value="presell"
                                        name="condition"
                                        onInput={event => setCourseStatus(event.target.value)}
                                    />
                                    <label className="customCheckBoxWrapper" for="cCB2">
                                        <div className="customCheckBox">
                                            <div className="inner">پیش فروش</div>
                                        </div>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className='col-12 mt-4' >
                            <button
                                type="submit"
                                className='btn-add-course col-12'
                                onClick={addNewCourse}
                                disabled={!formState.isFormValid || courseCategory === '-1' || !courseCover}
                            >
                                افزودن
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title="دوره ها">
                <table className="table red1">
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
                                <td>{course.registers}</td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn" onClick={editCourse}>
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger edit-btn"
                                        onClick={() => {
                                            removeCourse(course._id)
                                        }}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}

export default Courses;