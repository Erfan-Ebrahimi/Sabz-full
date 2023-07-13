 import { Link } from 'react-router-dom';
import './ArticleBox.scss';

const ArticleBox = ({ title, description, cover , shortName }) => {
  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${shortName}`} className="article-card__link-img">
            <img src={`http://localhost:4000/courses/covers/${cover}`} className="article-card__img" alt="Article Cover" />
          </Link>
        </div>
        <div className="article-card__content">
          <Link to={`/article-info/${shortName}`} className="article-card__link">{title}</Link>
          <p className="article-card__text">{description.slice(0,200)}...</p>
          <Link to={`/article-info/${shortName}`} className="article-card__btn btn--3">بیشتر بخوانید</Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleBox;