import { useState, useEffect } from 'react';
import { useForm } from '../../../../hooks/useForm';
import Input from '../../../../components/Form/Input';
import { minValidator } from '../../../../validators/rules';
import swal from 'sweetalert';
import './SendTicket.scss';
import { Link , useNavigate } from 'react-router-dom';

const SendTicket = () => {

    const [departments, setDepartments] = useState([]);
    const [departmentsSubs, setDepartmentsSubs] = useState([]);
    const [departmentId, setDepartmentId] = useState('')
    const [departmentSubId, setdepartmentSubId] = useState('')
    const [ticketPriority, setTicketPriority] = useState(1)
    const [userCourses, setUserCourses] = useState([])
    const [courseId , setCourseId] = useState('')

    //------------ history
    const navigate = useNavigate()
    // --------form inputs
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            body: {
                value: "",
                isValid: false,
            },

        },
        false
    );

    useEffect(() => {
        getUserCourses()
        getAllDepartements()
    }, []);

    // -----------get all departements
    function getAllDepartements() {
        fetch(`http://localhost:4000/v1/tickets/departments`)
            .then((res) => res.json())
            .then((data) => setDepartments(data));

    }

    // ----------get departements subs
    const getDepartmentsSub = (departmentID) => {
        fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
            .then((res) => res.json())
            .then((subs) => setDepartmentsSubs(subs));
    };

    // -----------get user courses
    function getUserCourses() {
        fetch(`http://localhost:4000/v1/users/courses/`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserCourses(data);
                console.log(data);
            });
    }

    // -----------send ticket
    const sendTicket = (e) => {
        e.preventDefault()
        const localStorageDate = JSON.parse(localStorage.getItem('user'))

        const newTicketInfos = {
            departmentID: departmentId,
            departmentSubID: departmentSubId,
            title: formState.inputs.title.value,
            body: formState.inputs.body.value,
            priority: ticketPriority,
            course: courseId.length ? courseId : undefined,
        }
        swal({
            title: "آیا از ارسال تیکت اطمینان دارید؟`",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then(ok => {
            if (ok) {
                fetch(`http://localhost:4000/v1/tickets`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorageDate.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTicketInfos)
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "تیکت با موفقیت ارسال شد :)",
                            icon: "success",
                            buttons: "OK",
                        })
                    }
                })

            }
        })
    }

    

    return (
        <div className="col-9">
            <div className="ticket">
                <div className="ticket-header">
                    <span className="ticket-header__title title mb-5">ارسال تیکت جدید</span>
                    <Link className="ticket-header__link" to='/my-account/tickets'>
                        همه تیکت ها
                    </Link>
                </div>
                <form className="ticket-form" action="#">
                    <div className="row">
                        <div className="col-6">
                            <label className="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select
                                className="ticket-form__select"
                                onChange={(event) => {
                                    getDepartmentsSub(event.target.value)
                                    setDepartmentId(event.target.value)
                                }}
                            >
                                <option value='-1' className="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {
                                    departments.length && (
                                        <>
                                            {departments.map((department) => (
                                                <option key={department._id} value={department._id}>{department.title}</option>
                                            ))}

                                        </>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
                            <select
                                className="ticket-form__select"
                                onChange={(event) => {
                                    setdepartmentSubId(event.target.value)
                                }}
                            >
                                <option value='-1' className="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {
                                    departmentsSubs.length && (
                                        <>
                                            {departmentsSubs.map((sub) => (
                                                <option value={sub._id} key={sub._id}>{sub.title}</option>
                                            ))}

                                        </>
                                    )
                                }
                            </select>
                        </div>
                        {
                            departmentSubId === "63b688c5516a30a651e98156" && (
                                <div className="col-6">
                                    <label className="ticket-form__label">دوره را انتخاب کنید:</label>
                                    <select
                                        className="ticket-form__select"
                                        onChange={(e) => setCourseId(e.target.value)}

                                    >
                                        {
                                            userCourses.length ?
                                                (
                                                    <>
                                                        {userCourses.map((course) => (
                                                            <option value={course.course._id} key={course.course._id}>{course.course.name}</option>
                                                        ))}

                                                    </>
                                                )
                                                :
                                                (<option>شما در هیچ دوره ای ثبت نام نکرده اید</option>)
                                        }
                                    </select>
                                </div>
                            )
                        }
                        <div className="col-6">
                            <label className="ticket-form__label">عنوان تیکت را وارد کنید:</label>
                            <Input
                                className="ticket-form__input"
                                element="input"
                                type="text"
                                id="title"
                                onInputHandler={onInputHandler}
                                validations={[minValidator(8)]}
                            />
                        </div>
                        <div className="col-6">
                            <label className="ticket-form__label">الویت تیکت را انتخاب کنید:</label>
                            <select
                                className="ticket-form__select"
                                onChange={(e) => setTicketPriority(e.target.value)}
                            >
                                <option value='-1' className="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                <option className="ticket-form__option" value='3'>بالا</option>
                                <option className="ticket-form__option" value='2'>متوسط</option>
                                <option className="ticket-form__option" value='1'>کم</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="ticket-form__label">
                                محتوای تیکت را وارد نمایید:
                            </label>
                            <Input
                                className="ticket-form__input"
                                element="textarea"
                                type="text"
                                id="body"
                                onInputHandler={onInputHandler}
                                validations={[minValidator(8)]}
                            />
                        </div>
                        <div className="col-12">
                            <div className="ticket-form__file">
                                <span className="ticket-form__file-max">
                                    حداکثر اندازه: 6 مگابایت
                                </span>
                                <span className="ticket-form__file-format">
                                    فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                                </span>
                                <input className="ticket-form__file-input" type="file" />
                            </div>
                        </div>
                        <div className="col-12">
                            <button
                                type="submit"
                                className='ticket-form__btn btn-add-course m-2'
                                onClick={sendTicket}
                                disabled={!formState.isFormValid || !departmentId || !departmentSubId}
                            >
                                <i className="ticket-form__btn-icon fa fa-paper-plane"></i>
                                ارسال
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SendTicket