import { useContext, useEffect, useState } from "react";
import AuthContext from './../../../context/AuthContext';
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../components/Form/Input";
import { minValidator } from "./../../../validators/rules";

import './EditAccount.scss';

const EditAccount = () => {

    const authContext = useContext(AuthContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [reload, setReload] = useState(false)

    // --------form inputs
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
            phone: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        setName(authContext.userInfos.name)
        setPhone(authContext.userInfos.phone)
        setUsername(authContext.userInfos.username)
        setUsername(authContext.userInfos.username)
        setEmail(authContext.userInfos.email)
    }, [reload])

    console.log(reload);
    // ---------edit user infos account
    const editAccount = (event) => {
        event.preventDefault();

        const userNewInfos = {
            name: formState.inputs.name.value,
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            phone: formState.inputs.phone.value,
        };

        swal({
            title: "آیا از تغییر اطلاعات اطمینان دارید",
            icon: 'warning',
            buttons: ['خیر', 'بله']
        }).then(ok => {
            fetch(`http://localhost:4000/v1/users/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                },
                body: JSON.stringify(userNewInfos)
            }).then(res => {
                if (res.ok) {
                    swal({
                        title: "اطلاعات اکانت شما با موفقیت ویرایش شد",
                        icon: 'success',
                        buttons: "خیلی هم عالی"
                    }).then((ok) => setReload(!reload))
                } else {
                    swal({
                        title: "اطلاعات وارد شده صحیح نمی باشد",
                        icon: 'error',
                        buttons: "OK"
                    })
                }
            })

        })

    };

    return (
        <div className="col-9">
            <div className="edit">
                <form className="edit__form" action="#">
                    <div className="edit__personal">
                        <div className="row">
                            <div className="col-12">
                                <label className="edit__label">نام و نام خانوادگی *</label>
                                <Input
                                    className="edit__input"
                                    element="input"
                                    type="text"
                                    id="name"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(8)]}
                                    placeholder={name}

                                />
                            </div>
                            <div className="col-12">
                                <label className="edit__label">نام کاربری (نمایشی) *</label>
                                <Input
                                    className="edit__input"
                                    element="input"
                                    type="text"
                                    id="username"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(8)]}
                                    placeholder={username}

                                />
                                <span className="edit__help">
                                    اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                                </span>
                            </div>
                            <div className="col-12">
                                <label className="edit__label">شماره موبایل *</label>
                                <Input
                                    className="edit__input"
                                    element="input"
                                    type="text"
                                    id="phone"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(8)]}
                                    placeholder={phone}

                                />
                            </div>
                            <div className="col-12">
                                <label className="edit__label">آدرس ایمیل *</label>
                                <Input
                                    className="edit__input"
                                    element="input"
                                    type="email"
                                    id="email"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(8)]}
                                    placeholder={email}
                                />
                            </div>
                            <div className="col-12">
                                <label className="edit__label">گذرواژه *</label>
                                <Input
                                    className="edit__input"
                                    element="input"
                                    type="password"
                                    id="password"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(8)]}
                                    placeholder='گذرواژه جدید را وارد کنید.'
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className='btn-add-course mt-5'
                        onClick={editAccount}
                        disabled={!formState.isFormValid}
                    >
                        ذخیره تغییرات
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditAccount;