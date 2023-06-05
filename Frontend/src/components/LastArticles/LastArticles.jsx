import './LastArticles.scss';
import SectionHeader from '../SectionHeader/SectionHeader';


const LastArticles = () => {
  return (
    <div className='articles'>
        <div className="container">
            <SectionHeader title='جدیدترین مقاله ها'  desc='پیش به سوی ارتقای دانش' btnTitle='تمامی مقاله ها'/>
        </div>
    </div>
  )
}

export default LastArticles;