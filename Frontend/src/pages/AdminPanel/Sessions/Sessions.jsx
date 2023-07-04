import './Sessions.scss';
import { useEffect, useState } from 'react';
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../components/Form/Input";
import { minValidator } from "../../../validators/rules";
import swal from 'sweetalert';


const Sessions = () => {
    const [courses, setCourses] = useState([]);
    const [sessionCourse, setSessionCourse] = useState('-1');
    const [sessionFree, setSessionFree] = useState("0");
    const [sessionVideo, setSessionVideo] = useState(false)


    // ---------form inputs
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            time: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllCourses()
    }, []);


    // -----get all courses
    function getAllCourses() {
        fetch("http://localhost:4000/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                setCourses(allCourses);
            });
    }

    // create new sessions
    const createSession = (event) => {
        event.preventDefault()

        const localStorageData = JSON.parse(localStorage.getItem('user'))

        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('time', formState.inputs.time.value)
        formData.append('free', sessionFree)
        formData.append('video', sessionVideo)

        fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                swal({
                    title: "جلسه مورد نظر با موفقیت اضافه شد",
                    icon: 'success',
                    buttons: 'اوکی'
                }).then(() => {
                    console.log('Get All Sessions');
                })
            }
        })

    }
    return (
        <div className="container-fluid" id="home-content">
            <div className="container">
                <div className="home-title">
                    <span>افزودن جلسه جدید</span>
                </div>
                <form className="form">
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title">عنوان جلسه</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                type="text"
                                id="title"
                                validations={[minValidator(5)]}
                                placeholder="لطفا نام جلسه را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="price input">
                            <label className="input-title">مدت زمان جلسه</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                type="number"
                                id="time"
                                validations={[minValidator(1)]}
                                placeholder="لطفا مدت زمان جلسه را به دقیقه وارد کنید... "
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="price input">
                            <label className="input-title" style={{ display: "block" }}>
                                دوره
                            </label>
                            <select className="select" onChange={event => setSessionCourse(event.target.value)}>
                                <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                {courses.map((course) => (
                                    <option value={course._id} key={course._id}>{course.name}</option>
                                ))}
                            </select>
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="bottom-form">
                            <div className="condition">
                                <label className="input-title">وضعیت جلسه</label>
                                <div className="radios">
                                    <div className="available">
                                        <label>
                                            <span>رایگان</span>
                                            <input
                                                type="radio"
                                                value="0"
                                                name="condition"
                                                defaultChecked
                                                onInput={event => setSessionFree(event.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className="unavailable">
                                        <label>
                                            <span>پولی</span>
                                            <input
                                                type="radio"
                                                value="1"
                                                name="condition"
                                                onInput={event => setSessionFree(event.target.value)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title">فیلم جلسه</label>
                            <input type="file" onChange={event => setSessionVideo(event.target.files[0])} />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="bottom-form">
                            <div className="submit-btn">
                                <button
                                    type="submit"
                                    className='btn-add-course'
                                    onClick={createSession}
                                    disabled={!formState.isFormValid || sessionCourse === '-1' || !sessionVideo}
                                >
                                    افزودن
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sessions;