import { Link } from 'react-router-dom';
import './SectionHeader.scss';


const SectionHeader = ({ title, desc, btnTitle, btnHref }) => {
  return (
    <div className="section-header">
      <div className="section-header__right">
        <span className="section-header__title title">{title}</span>
        <span className="section-header__text">{desc}</span>
      </div>
      {
        btnTitle ? (
          <button className="section-header__left btn--3">
            <Link to={`/${btnHref}`} className='sec_1' >
              {btnTitle}
              <i className="fas fa-arrow-left section-header__icon"></i>
            </Link>
          </button>

        ) : null
      }
    </div>
  )
}

export default SectionHeader;