import { Link, useParams } from 'react-router-dom';
import './Pagination.scss';
import { useEffect, useState } from 'react';

// items = kol array mesl All Courses
// itemsCount = tedadi ke mikhahim dar har safhe neshon bedim
// pathname = yani dar kodam ghesmate site mikhahim estefadeh konim
// setShownCourses = array jadid misazad & be component asli mesle Courses.jsx barmigardanad ta roy an map bezanim
const Pagination = ({ items, itemsCount, pathname, setShownCourses }) => {

  const [pagesCount, setPagesCount] = useState(null)  //chon number nemishe roy an map zad pas aval array misazim az roy an bad map mizanim 
  const { page } = useParams()

  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItems = items.slice(startIndex, endIndex)
    setShownCourses(paginatedItems)

    let pagesNumber = Math.ceil(items.length / itemsCount)
    setPagesCount(pagesNumber)
  }, [page, items])
  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {Array(pagesCount).fill(0).map((item, index) => (
          <li key={index * 2} className="courses__pagination-item">
            <Link
              to={`${pathname}/${index + 1}`}
              className={`courses__pagination-link ${index + 1 === Number(page) && 'courses__pagination-link--active'}`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination