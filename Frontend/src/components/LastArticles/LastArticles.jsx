import { useEffect, useState } from 'react';

import './LastArticles.scss';

import SectionHeader from '../SectionHeader/SectionHeader';
import ArticleBox from '../ArticleBox/ArticleBox';


const LastArticles = () => {

  const [articles, setArticles] = useState([])

  // --------get articles from api
  useEffect(() => {
    fetch('http://localhost:4000/v1/articles')
      .then(res => res.json())
      .then(allArticles => {
        setArticles(allArticles)
        console.log(allArticles);
      })
  }, [])

  return (
    <div className='articles'>
      <div className="container">
        <SectionHeader title='جدیدترین مقاله ها' desc='پیش به سوی ارتقای دانش' btnTitle='تمامی مقاله ها' />

        <div className='articles__content'>
          <div className="row">
            {
              articles.slice(4,7).map(article => (
                <ArticleBox
                  key={article._id}
                  title={article.title}
                  description={article.description}
                  cover={article.cover}
                  shortName={article.shortName}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default LastArticles;