import './Draft.scss';
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Editor from "../../../components/AdminPanel/Editor/Editor";
import { useParams } from 'react-router-dom';

const Draft = () => {

    const [article, setArticle] = useState([]);
    const [articleBody, setArticleBody] = useState('');
    // --------params
    const { shortName } = useParams()


    useEffect(() => {
        getArticle();
        swal({
            title:'فعلا بک اند برای این قسمت توسعه داده نشده است',
            icon:'error',
            buttons:'OK'
        })
    }, []);

    // -----------get one articles
    function getArticle() {
        fetch(`http://localhost:4000/v1/articles/${shortName}`)
            .then((res) => res.json())
            .then((articleDetails) => {
                setArticle(articleDetails);
            });
    }

    // --------add new article
    const addNewArticle = (event) => {
        event.preventDefault()
        swal({
            title:'فعلا بک اند برای این قسمت توسعه داده نشده است',
            icon:'error',
            buttons:'OK'
        })
    }

    // // --------add new draft article
    const draftArticle = (event) => {
        event.preventDefault()
            swal({
                title:'فعلا بک اند برای این قسمت توسعه داده نشده است',
                icon:'error',
                buttons:'OK'
            })

    }


    return (
        <div className="container-fluid" id="home-content">
            <div className="container">
                <div className="home-title">
                    <span>ویرایش متن مقاله</span>
                </div>
                <p className='title-art'>عنوان مقاله : {article.title}</p>
                <form className="form">
                    <div className="col-12">
                        <div className="name input edit-body">
                            <label className="input-title" style={{ display: "block" }}>
                                متن
                            </label>
                            <Editor value={article.body} setValue={setArticleBody} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="bottom-form">
                            <div className="submit-btn">
                                <button
                                    type="submit"
                                    className='btn-add-course m-1'
                                    onClick={addNewArticle}
                                    disabled={!articleBody}
                                >
                                    انتشار
                                </button>
                                <button
                                    type="submit"
                                    className='btn-add-course m-2'
                                    onClick={draftArticle}
                                    disabled={!articleBody}
                                >
                                    پیش نویس
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Draft;