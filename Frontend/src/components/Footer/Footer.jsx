import { Link } from 'react-router-dom';
import './Footer.scss';
import Input from "../../components/Form/Input";
import { emailValidator } from "../../validators/rules";
import { useForm } from "../../hooks/useForm";
import swal from "sweetalert";


const Footer = () => {

    const [formState, onInputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    // ---------send contact
    const addNewEmail = (event) => {
        event.preventDefault();
        const newEmail = {
            email: formState.inputs.email.value,
        };

        fetch("http://localhost:4000/v1/newsletters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmail),
        }).then((res) => {
            if (res.ok) {
                swal({
                    title: "ایمیل شما با موفقیت در خبرنامه ثبت شد",
                    icon: "success",
                    buttons: "خیلی هم عالی",
                })
            }
        });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-widgets">
                    <div className='row'>
                        <span className="footer-widgets__title">درباره ی ما</span>
                        <p className="footer-widgets__text aboute_1 col-12">
                            وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه :)
                        </p>
                    </div>
                    <div className="row footer_bot">
                        <div className='col-4'>
                            <span className="footer-widgets__title"> دسترسی سریع</span>

                            <Link to="/article-info/1" className="footer-widgets__link">
                                مقالات
                            </Link>
                            <Link to="/" className="footer-widgets__link">
                                قوانین و مقررات
                            </Link>
                            <Link to="/" className="footer-widgets__link">
                                ارتباط با ما
                            </Link>
                            <Link to="/" className="footer-widgets__link">
                                درباره ی ما
                            </Link>
                        </div>
                        <div className='col-4'>
                            <div>
                                <span className="footer-widgets__title">ساعات کاری</span>
                                <span className="footer-widgets__text  d-block">
                                    شنبه تا چهارشنبه ساعت 8 صبح الی 18
                                </span>
                                <span className="footer-widgets__text  d-block">
                                    شماره تماس : 09918790969                                </span>
                                <span className="footer-widgets__text  d-block">
                                    ایمیل : ebrahimi.erfan89@gmail.com                                </span>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div>
                                <span className="footer-widgets__title">اشتراک در خبرنامه</span>
                                <span className="footer-widgets__text  d-block">
                                    جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
                                </span>

                                <form action="#" className="footer-widgets__form">
                                    <Input
                                        element="input"
                                        id="email"
                                        type="text"
                                        className="footer-widgets__input"
                                        placeholder="ایمیل خود را وارد کنید."
                                        onInputHandler={onInputHandler}
                                        validations={[emailValidator()]}
                                    />
                                    <button
                                        type="submit"
                                        className="footer-widgets__btn btn--3"
                                        onClick={addNewEmail}
                                        disabled={!formState.isFormValid}
                                    >
                                        عضویت
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <span className="footer__copyright-text">
                    کلیه حقوق برای آکادمی آموزش برنامه نویسی <Link to='/' className='copy_span'>سبز لرن</Link> محفوظ است.
                </span>
            </div>
        </footer>
    )
}

export default Footer;