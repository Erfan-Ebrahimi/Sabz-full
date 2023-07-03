import './Articles.scss';

import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ArticleBox from '../../components/ArticleBox/ArticleBox';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';
import { useEffect, useState } from 'react';

const Articles = () => {

    const [articles, setArticles] = useState([])
    const [shownArticles, setShownArticles] = useState([])     //for PAGINATION

    // --------get all articles
    useEffect(() => {
        fetch('http://localhost:4000/v1/articles')
            .then(res => res.json())
            .then(allArticles => {
                setArticles(allArticles)
            })
    }, [])
    return (
        <>
            <Topbar />
            <Navbar />
            <Breadcrumb
                links={[
                    { id: 1, title: 'خانه', to: '' },
                    { id: 2, title: 'تمامی مقاله ها', to: 'articles/1' },
                ]}
            />

            {/* <!--------------------------------  Articles-Section  --------------------------------> */}
            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {shownArticles.map((article) => <ArticleBox key={article._id} {...article}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--------------------------------  Articles-Section  --------------------------------> */}

            {
                <Pagination
                    items={articles}
                    itemsCount={3}
                    pathname='/articles'
                    setShownCourses={setShownArticles}
                />
            }
            <Footer />
        </>
    )
}

export default Articles;