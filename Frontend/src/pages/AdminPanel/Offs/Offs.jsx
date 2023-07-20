import './Offs.scss';
import { useEffect, useState } from "react";
import Input from "./../../../components/Form/Input";
import { useForm } from "./../../../hooks/useForm";
import { minValidator, requiredValidator } from "../../../validators/rules";
import swal from "sweetalert";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";

const Offs = () => {

    const [courses, setCourses] = useState([]);
    const [offs, setOffs] = useState([]);
    const [offCourse, setOffCourse] = useState("-1");
    const [discount, setDiscount] = useState('');  //state for campaign


    // ----------form inputs for offs
    const [formState, onInputHandler] = useForm(
        {
            code: {
                value: "",
                isValid: false,
            },
            percent: {
                value: "",
                isValid: false,
            },
            max: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllOffs();
        getAllCourses()
    }, []);

    // ----------get all courses
    function getAllCourses() {
        fetch(`http://localhost:4000/v1/courses`)
            .then((res) => res.json())
            .then((allCourses) => setCourses(allCourses));
    }
    // -----------get all offs
    function getAllOffs() {
        fetch(`http://localhost:4000/v1/offs`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((allOffs) => {
                setOffs(allOffs);
            });
    }

    // -----------create off
    const createOff = (event) => {
        event.preventDefault();

        const newOffInfos = {
            code: formState.inputs.code.value,
            percent: formState.inputs.percent.value,
            course: offCourse,
            max: formState.inputs.max.value,
        };

        fetch(`http://localhost:4000/v1/offs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
            body: JSON.stringify(newOffInfos),
        }).then((res) => {
            if (res.ok) {
                swal({
                    title: "کد تخفیف با موفقیت ایجاد شد",
                    icon: "success",
                    buttons: "اوکی",
                }).then(() => {
                    getAllOffs();
                });
            }
        });
    };

    // ----------remove off 
    const removeOff = (offID) => {
        swal({
            title: "آیا از حذف کد تخفیف اطمینان دارید؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/offs/${offID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                            }`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "کد تخفیف مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllOffs();
                        });
                    }
                });
            }
        });
    };

    // ---------create campaign
    const createCampaign = (event) => {
        event.preventDefault();
        const reqBody = {
            discount,
        };

        fetch(`http://localhost:4000/v1/offs/all`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
            .then((res) => {
                if (res.ok) {
                    swal({
                        title: 'کمپین با موفقیت ایجاد شد',
                        icon: 'success',
                        buttons: "خیلی هم عالی"
                    })
                }
            })
    };

    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    {/*-----------------------------OFFS----------------- */}
                    <div className="home-title">
                        <span>افزودن کد تخفیف جدید</span>
                    </div>
                    <form className="form">
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">کد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="code"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا کد تخفیف را وارد نمایید"
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">درصد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="percent"
                                    validations={[requiredValidator()]}
                                    placeholder="لطفا درصد تخفیف را وارد نمایید"
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">حداکثر استفاده</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="max"
                                    validations={[requiredValidator()]}
                                    placeholder="حداکثر استفاده از کد تخفیف"
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select
                                    className="select"
                                    onChange={(event) => setOffCourse(event.target.value)}
                                >
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bottom-form">
                                <button
                                    type="submit"
                                    className='btn-add-course'
                                    onClick={createOff}
                                    disabled={!formState.isFormValid || offCourse === '-1'}
                                >
                                    افزودن
                                </button>
                            </div>
                        </div>
                    </form>

                    {/*----------------------------- CAMPAIGN----------------- */}
                    <div className="home-title">
                        <span>افزودن کمپین جدید</span>
                    </div>
                    <form className="form">
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">کد تخفیف</label>
                                <input
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    type="number"
                                    placeholder="لطفا درصد تخفیف کمپین را وارد نمایید"
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bottom-form">
                                <button
                                    type="submit"
                                    className='btn-add-course'
                                    onClick={createCampaign}
                                    disabled={!discount}
                                >
                                    افزودن
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title="کد های تخفیف">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کد</th>
                            <th>درصد</th>
                            <th>حداکثر استفاده</th>
                            <th>دفعات استفاده</th>
                            <th>سازنده</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offs.map((off, index) => (
                            <tr key={off._id}>
                                <td>{index + 1}</td>
                                <td>{off.code}</td>
                                <td>{off.percent}</td>
                                <td>{off.max}</td>
                                <td>{off.uses}</td>
                                <td>{off.creator}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeOff(off._id)}
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

export default Offs;