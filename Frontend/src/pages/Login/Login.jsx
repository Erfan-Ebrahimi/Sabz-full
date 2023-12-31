import "./Login.scss";

//-----------CONTEXT
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

// -----------COMPONENTS
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

// -------------SPA
import { Link, useNavigate } from 'react-router-dom'

// --------------FORM & VALIDATION
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../validators/rules";
import { useForm } from "../../hooks/useForm";

//-------------ALERT
import swal from 'sweetalert';

// ----------ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {

    // ---------------stete for recaptch
    const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] = useState(false)
    // --------------useNavigate
    const navigate = useNavigate()
    // --------------Context
    const authContext = useContext(AuthContext)
    //---------------useForm
    const [formState, onInputHandler] = useForm(
        {
            username: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    )

    // --------------User login 
    const userLogin = (e) => {
        e.preventDefault()

        const userData = {
            identifier: formState.inputs.username.value,
            password: formState.inputs.password.value
        }

        fetch('http://localhost:4000/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(text)
                })
            } else {
                return res.json()
            }
        })
            .then(result => {
                swal({
                    title: 'با موفقیت وارد شدید',
                    icon: 'success',
                    buttons: 'ورود به پنل'
                }).then(value => navigate('/'))
                authContext.login({}, result.accessToken) // ( {} = userInfos) & token ro mifrest to App.jsx(login function)
            })
            .catch(err => {
                swal({
                    title: `${err}`,
                    icon: 'error',
                    buttons: 'دوباره تلاش کنید'
                })
            })
    }

    // ---------------recaptch Handler
    const onChangeRecaptcha = () => {
        setIsGoogleRecaptchaVerify(true)
    }
    return (
        <>

            <Topbar />
            <Navbar />

            <section className="login-register">
                <div className="login">
                    <span className="login__title">ورود به حساب کاربری</span>
                    <span className="login__subtitle">
                        خوشحالیم دوباره میبینیمت دوست عزیز :)
                    </span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">کاربر جدید هستید؟</span>
                        <Link className="login__new-member-link" to="/register">
                            ثبت نام
                        </Link>
                    </div>
                    <form action="#" className="login-form">
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                id='username'
                                type="text"
                                placeholder="نام کاربری یا آدرس ایمیل"
                                element='input'
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                id='password'
                                type="password"
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
                        <ReCAPTCHA
                            className="recaptcha"
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={onChangeRecaptcha}
                        />
                        <Button
                            className="login-form__btn"
                            type="submit"
                            disabled={!formState.isFormValid || !isGoogleRecaptchaVerify}
                            onClick={userLogin}
                        >
                            <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
                            <span className="login-form__btn-text">ورود</span>
                        </Button>
                        <div className="login-form__password-setting">
                            <label className="login-form__password-remember">
                                <input className="login-form__password-checkbox" type="checkbox" />
                                <span className="login-form__password-text">
                                    مرا به خاطر داشته باش
                                </span>
                            </label>
                            <label className="login-form__password-forget">
                                <a className="login-form__password-forget-link" href="#">
                                    رمز عبور را فراموش کرده اید؟
                                </a>
                            </label>
                        </div>
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

export default Login;
