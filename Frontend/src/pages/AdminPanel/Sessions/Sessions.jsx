import './Sessions.scss';
import { useEffect, useState } from 'react';
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../components/Form/Input";
import { minValidator } from "../../../validators/rules";
import swal from 'sweetalert';
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";



const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [sessionCourse, setSessionCourse] = useState('-1');
    const [sessionFree, setSessionFree] = useState("0");
    const [sessionVideo, setSessionVideo] = useState(false)
        const [sizeFile, setSizeFile] = useState('')



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
        getAllSessions()
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

    // ------get all sessions
    function getAllSessions() {
        fetch("http://localhost:4000/v1/courses/sessions")
            .then((res) => res.json())
            .then((allSessions) => {
                setSessions(allSessions)

            });
    }

    // -------remove a session
    const removeSession = (sessionID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        swal({
            title: "آیا از حذف جلسه اطمینان داری؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "جلسه مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then((result) => {
                            getAllSessions();
                        });
                    }
                });
            }
        });
    };

    // -------create new sessions
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
                    getAllSessions()
                })
            }
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
                            <label className="input-title1">وضعیت جلسه</label>
                            <div className="condition">

                                <div className="customCheckBoxHolder radios">
                                    <input
                                        className="customCheckBoxInput"
                                        id="cCB1"
                                        type="radio"
                                        value="1"
                                        name="condition"
                                        defaultChecked
                                        onInput={event => setSessionFree(event.target.value)}
                                    />
                                    <label className="customCheckBoxWrapper" for="cCB1">
                                        <div className="customCheckBox">
                                            <div className="inner">رایگان</div>
                                        </div>
                                    </label>
                                    <input
                                        className="customCheckBoxInput"
                                        id="cCB2"
                                        type="radio"
                                        value="0"
                                        name="condition"
                                        onInput={event => setSessionFree(event.target.value)}
                                    />
                                    <label className="customCheckBoxWrapper" for="cCB2">
                                        <div className="customCheckBox">
                                            <div className="inner"> پولی</div>
                                        </div>
                                    </label>
                                </div>

                            </div>
                        </div>  
                        
                        <div className="col-12">
                            <div className="">
                                <div className="input file-input">
                                    <label className="input-title" for='file'>فیلم جلسه<i className='icon-file fa-solid fa-upload'></i></label>
                                    <input
                                        type="file"
                                        className='file'
                                        id="file"
                                        onChange={event => {
                                            setSessionVideo(event.target.files[0])
                                            showSize(event.target.files)
                                        }}
                                    />
                                    {
                                        sizeFile ? <p className='file-size'>{sizeFile.fileName} , {(sizeFile.size/1000).toFixed(2)}KB</p> : <p className='text-danger'>عکسی انتخاب نشده است</p>
                                    }

                                </div>
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

            <DataTable title="جلسات">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>تایم</th>
                            <th>وضعیت </th>
                            <th>دوره</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={session._id}>
                                <td>{index + 1}</td>
                                <td>{session.title}</td>
                                <td>{session.time}</td>
                                <td>{session.free ? 'پولی' : 'رایگان'}</td>
                                <td>{session.course.name}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeSession(session._id)}
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

export default Sessions;