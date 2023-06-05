import './LastArticles.scss';
import SectionHeader from '../SectionHeader/SectionHeader';
import ArticleBox from '../ArticleBox/ArticleBox';
import cover from '../../assets/images/courses/python.png'


const LastArticles = () => {
  return (
    <div className='articles'>
        <div className="container">
            <SectionHeader title='جدیدترین مقاله ها'  desc='پیش به سوی ارتقای دانش' btnTitle='تمامی مقاله ها'/>

            <div className='articles__content'>
              <div className="row">
                <ArticleBox 
                  title='نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'
                  desc='زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'
                  img={cover}
                />
                <ArticleBox 
                  title='نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'
                  desc='زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'
                  img={cover}
                />
                <ArticleBox 
                  title='نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'
                  desc='زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'
                  img={cover}
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export default LastArticles;