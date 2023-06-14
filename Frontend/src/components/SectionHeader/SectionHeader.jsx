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
          <div className="section-header__left">
            <Link to={`/${btnHref}`} className="section-header__link">
              {btnTitle}
              <i className="fas fa-arrow-left section-header__icon"></i>
            </Link>
          </div>

        ) : null
      }
    </div>
  )
}

export default SectionHeader;