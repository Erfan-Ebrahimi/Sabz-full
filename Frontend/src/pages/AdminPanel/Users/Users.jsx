import './Users.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Input from "./../../../components/Form/Input";
import { useForm } from "./../../../hooks/useForm";
import {
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator,
} from "./../../../validators/rules";


const Users = () => {

    const [users, setUsers] = useState([])

    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            username: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
            phone: {
                value: "",
                isValid: false,
            },
        },
        false
    );


    useEffect(() => {
        getAllUsers()
    }, [])

    // -----------get users
    function getAllUsers() {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/users', {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then((allUsers) => {
                setUsers(allUsers)
            })
    }

    // -----remove User
    const removeUser = (userID) => {
        swal({
            title: "آیا از حذف کاربر مطمئنی ؟",
            icon: "warning",
            buttons: ['نه', 'آره'],
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    const localStorageData = JSON.parse(localStorage.getItem('user'))
                    fetch(`http://localhost:4000/v1/users/${userID}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorageData.token}`

                        }
                    }).then((res) => {
                        if (res.ok) {
                            swal("حذف شد!", "", "success").then(result => getAllUsers())
                        }
                    })
                }
            });
    }

    // ----------BAN user
    const banUser = (userID) => {
        swal({
            title: "آیا از بن کاربر مطمئنی ؟",
            icon: "warning",
            buttons: ['نه', 'آره'],
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    const localStorageData = JSON.parse(localStorage.getItem('user'))
                    fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${localStorageData.token}`

                        }
                    }).then((res) => {
                        if (res.ok) {
                            swal("بن شد !", "", "success").then(result => getAllUsers())
                        }
                    })
                }
            })
    }

    // --------register new user
    const registerNewUser = (event) => {
        event.preventDefault();
        const newUserInfo = {
            name: `${formState.inputs.name.value}`,
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            phone: formState.inputs.phone.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.password.value,
        };

        fetch('http://localhost:4000/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)
        }).then((res) => {
            if (res.ok) {
                res.json()
                swal({
                    title: 'کاربر با موفقیت افزوده شد',
                    icon: 'success',
                    buttons: 'OK'
                }).then(ok => getAllUsers())

            } else {
                swal({
                    title: 'اطلاعات صحیح نمی باشد !!',
                    icon: 'warning',
                    buttons: 'OK'
                })
            }
        })
    };

    // change user role
    const changeUserRole = (userID) => {

        const inputOptions = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    'USER': 'USER',
                    'ADMIN': 'ADMIN',
                })
            }, 1000)
        })
        Swal.fire({
            title: 'سطح دسترسی را انتخاب کنید',
            input: 'radio',
            customClass: 'swal-wide',
            inputOptions: inputOptions,
            inputValidator: (value) => {
                if (value) {
                    const localStorageData = JSON.parse(localStorage.getItem('user'))
                    const newUserRoleInfos = {
                        id:userID,
                        role:value
                    }
                    fetch('http://localhost:4000/v1/users/role', {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${localStorageData.token}`,
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(newUserRoleInfos)
                    }).then(res => res.json()).then(data => console.log(data))
                } else {
                    return 'You need to choose something!'
                }
            }
        })

    }

    return (
        <>
            <div className="home-content-edit">
                <div className="back-btn">
                    <i className="fas fa-arrow-right"></i>
                </div>
                <form className="form">
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title">نام و نام خانوادگی</label>
                            <Input
                                type="text"
                                className=""
                                id="name"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="family input">
                            <label className="input-title">نام کاربری</label>
                            <Input
                                type="text"
                                className=""
                                id="username"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا نام کاربری را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="email input">
                            <label className="input-title">ایمیل</label>
                            <Input
                                type="text"
                                className=""
                                id="email"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                    emailValidator(),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا ایمیل کاربر را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="password input">
                            <label className="input-title">رمز عبور</label>
                            <Input
                                type="text"
                                className=""
                                id="password"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="phone input">
                            <label className="input-title">شماره تلفن</label>
                            <Input
                                type="text"
                                className=""
                                id="phone"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className='col-12 mt-4' >
                            <button
                                type="submit"
                                className='btn-add-course col-12'
                                onClick={registerNewUser}
                                disabled={!formState.isFormValid}
                            >
                                افزودن
                            </button>
                        </div>
                </form>
            </div>
            <DataTable title="کاربران">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th> نام و نام خانوادگی </th>
                            <th> نام کاربری</th>
                            <th> نقش</th>
                            <th>شماره</th>
                            <th>ایمیل</th>
                            <th>سطح دسترسی</th>
                            <th>حذف</th>
                            <th>بن</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.role === 'ADMIN' ? (<i class="fa-sharp fa-solid fa-user-gear admin-icon "></i>) : (<i class="fa-regular fa-user user-icon"></i>)}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary edit-btn"
                                        onClick={() => {
                                            changeUserRole(user._id)
                                        }}
                                    >
                                        تغییر
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => {
                                            removeUser(user._id)
                                        }}
                                    >
                                        حذف
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn ban-user"
                                        onClick={() => {
                                            banUser(user._id)
                                        }}
                                    >
                                        بن
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

export default Users;