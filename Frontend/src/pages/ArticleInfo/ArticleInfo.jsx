import './ArticleInfo.scss';

import Topbar from '../../components/Topbar/Topbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import img from '../../assets/images/courses/python.png';
import star from '../../assets/images/svgs/star.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dumPurify from 'dompurify'


const ArticleInfo = () => {

  const [articleDetails, setArticleDetails] = useState({})
  const [articleCategoryDetails, setArticleCategoryDetails] = useState({})
  const [articleCreatorDetails, setArticleCreatorDetails] = useState({})
  const [articleCreateDate, setArticleCreateDate] = useState('')

  const { articleName } = useParams()

  // -----------get one article from api
  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then(res => res.json())
      .then(articleInfo => {
        console.log(articleInfo);
        setArticleDetails(articleInfo)
        setArticleCategoryDetails(articleInfo.categoryID)
        setArticleCreatorDetails(articleInfo.creator)
        setArticleCreateDate(articleInfo.createdAt)
      })
  }, [])

  return (
    <>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: 'خانه', to: '/' },
          { id: 2, title: 'مقاله ها', to: 'category-info/1' },
          { id: 3, title: articleDetails.title }
        ]}
      />

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="article">
                <h1 className="article__title">
                  {articleDetails.title}
                </h1>
                <div className="article__header">
                  <div className="article-header__category article-header__item">
                    <i className="far fa-folder article-header__icon"></i>
                    <a href="#" className="article-header__text">{articleCategoryDetails.title}</a>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-user article-header__icon"></i>
                    <span className="article-header__text">ارسال شده توسط {articleCreatorDetails.name}</span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-clock article-header__icon"></i>
                    <span className="article-header__text">تاریخ انتشاز : {articleCreateDate.slice(0, 10)}</span>
                  </div>
                </div>
                <img src={`http://localhost:4000/courses/covers/${articleDetails.cover}`} alt="Article Cover" className="article__banner" />
                <p className='article-desc'>{articleDetails.description}</p>
                
                <div className="article-section" dangerouslySetInnerHTML={{ __html: dumPurify.sanitize(articleDetails.body)}}>
                </div>
              
                <div className="article-social-media">
                  <span className="article-social-media__text">اشتراک گذاری :</span>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />

    </>
  )
}

export default ArticleInfo;