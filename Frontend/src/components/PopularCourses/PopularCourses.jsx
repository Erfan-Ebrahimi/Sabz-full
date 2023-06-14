import './PopularCourses.scss'
import SectionHeader from '../SectionHeader/SectionHeader'
const PopularCourses = () => {
  return (
    <>
      <div className='popular'>
        <div className="container">
          <SectionHeader title='محبوب ترین دوره ها' desc='دوره های محبوب از نظر دانشجویان' />
        </div>
      </div>
    </>
  )
}

export default PopularCourses