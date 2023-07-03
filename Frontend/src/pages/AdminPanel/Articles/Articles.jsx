import { useEffect, useState } from "react";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import './Articles.scss';
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../components/Form/Input";
import { minValidator } from "./../../../validators/rules";
import Editor from "../../../components/AdminPanel/Editor/Editor";

const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [articleCategory, setArticleCategory] = useState("-1");
    const [articleCover, setArticleCover] = useState(false);
    const [articleBody , setArticleBody] = useState('')

    // --------form inputs
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            shortName: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );


    useEffect(() => {
        getAllArticles();
        getAllCategories();
    }, []);

    //------------get all categories
    function getAllCategories() {
        fetch(`http://localhost:4000/v1/category`)
            .then((res) => res.json())
            .then((allCategories) => {
                setCategories(allCategories);
            });
    }

    // -----------get all articles
    function getAllArticles() {
        fetch("http://localhost:4000/v1/articles")
            .then((res) => res.json())
            .then((allArticles) => {
                setArticles(allArticles);
            });
    }

    // --------remove article
    const removeArticle = (articleID) => {
        const localStorageDate = JSON.parse(localStorage.getItem("user"));
        swal({
            title: "آیا از حذف مقاله اطمینان دارید؟`",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/articles/${articleID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorageDate.token}`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "مقاله مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllArticles();
                        });
                    }
                });
            }
        });
    };

    // --------add new article
    const addNewArticle = (event) => {
        event.preventDefault()
        console.log('red');
    }

    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن مقاله جدید</span>
                    </div>
                    <form className="form">
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    عنوان
                                </label>
                                <Input
                                    element="input"
                                    type="text"
                                    id="title"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(8)]}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    لینک
                                </label>
                                <Input
                                    element="input"
                                    type="text"
                                    id="shortName"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(5)]}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    چکیده
                                </label>
                                <Input
                                    element="textarea"
                                    type="text"
                                    id="description"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(5)]}
                                    className="article-textarea-admin"
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    چکیده
                                </label>
                                <Editor value={articleBody} setValue={setArticleBody} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    کاور
                                </label>
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setArticleCover(event.target.files[0]);
                                    }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    دسته بندی
                                </label>
                                <select
                                    onChange={(event) => setArticleCategory(event.target.value)}
                                >
                                    <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.title}</option>
                                    ))}
                                </select>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <button
                                        type="submit"
                                        className='btn-add-course'
                                        onClick={addNewArticle}
                                        disabled={!formState.isFormValid || articleCategory === '-1' || !articleCover}
                                    >
                                        افزودن
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title="مقاله‌ها">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>لینک</th>
                            <th>نویسنده</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={article._id}>
                                <td>{index + 1}</td>
                                <td>{article.title}</td>
                                <td>{article.shortName}</td>
                                <td>{article.creator.name}</td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeArticle(article._id)}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}

export default Articles;