// -------------COMPONENTS-------------------//
import AboutUsBox from '../AboutUsBox/AboutUsBox';
import SectionHeader from '../SectionHeader/SectionHeader';



import './AboutUs.scss';


const AboutUs = () => {
  return (
    <>
      <div className="about-us">
        <div className="container">
          <SectionHeader
            title='ما چه کمکی بهتون میکنیم :)'
            desc='از اونجایی که سبزلرن یک آکادمی خصوصی هست'
          />

          <div className="container">
            <div className="row">
              <AboutUsBox title='دوره های اختصاصی' desc='با پشتیبانی و کیفیت بالا ارائه میده !' icon='copyright' />
              <AboutUsBox title='اجازه تدریس' desc='به هر مدرسی رو نمیده. چون کیفیت براش مهمه !' icon='leaf' />
              <AboutUsBox title='دوره پولی و رایگان' desc='براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده' icon='gem' />
              <AboutUsBox title='اهمیت به کاربر' desc='اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست' icon='crown' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs