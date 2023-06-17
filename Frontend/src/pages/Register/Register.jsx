import './Register.scss';

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";

import { Link } from 'react-router-dom'
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../validators/rules";

import { useForm } from "../../hooks/useForm";

const Register = () => {

    //---------------useForm
    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            username: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
            ,
            phone: {
                value: '',
                isValid: false
            }
        },
        false
    )
    console.log(formState);

    // --------------User Register
    const registerNewUser = (e) => {
        e.preventDefault()

        const newUserInfos = {
            name: formState.inputs.name.value,
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.password.value,
            phone: formState.inputs.phone.value,
        }

        fetch('http://localhost:4000/v1/auth/register' ,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newUserInfos)
        }).then(res => res.json())
            .then(data => console.log(data))



        console.log('register new User');
    }
    return (
        <>
            <Topbar />
            <Navbar />

            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ساخت حساب کاربری</span>
                    <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
                        <Link className="login__new-member-link" to="/login">
                            وارد شوید
                        </Link>
                    </div>
                    <form action="#" className="login-form">
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                id='name'
                                placeholder="نام و نام خانوادگی"
                                element='input'
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20)
                                ]}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                id='username'
                                placeholder="نام کاربری"
                                element='input'
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20)
                                ]}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                type="email"
                                id='email'
                                placeholder="آدرس ایمیل"
                                element='input'
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(30),
                                    emailValidator()

                                ]}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                type="password"
                                id='password'
                                placeholder="رمز عبور"
                                element='input'
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20)
                                ]}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                type="text"
                                id='phone'
                                placeholder="شماره تلغن"
                                element='input'
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20)
                                ]}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                        </div>
                        <Button
                            className="login-form__btn"
                            type="submit"
                            disabled={!formState.isFormValid}
                            onClick={registerNewUser}
                        >
                            <i className="login-form__btn-icon fa fa-user-plus"></i>
                            <span className="login-form__btn-text">عضویت</span>
                        </Button>
                    </form>
                    <div className="login__des">
                        <span className="login__des-title">سلام کاربر محترم:</span>
                        <ul className="login__des-list">
                            <li className="login__des-item">
                                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                                استفاده کنید.
                            </li>
                            <li className="login__des-item">
                                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                            </li>
                            <li className="login__des-item">
                                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Register;