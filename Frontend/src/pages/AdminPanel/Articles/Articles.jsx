import { useEffect, useState } from "react";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import './Articles.scss';
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../components/Form/Input";
import { minValidator } from "./../../../validators/rules";
import Editor from "../../../components/AdminPanel/Editor/Editor";
import { Link } from 'react-router-dom';

const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [articleCategory, setArticleCategory] = useState("-1");
    const [articleCover, setArticleCover] = useState(false);
    const [articleBody, setArticleBody] = useState('')
    const [sizeFile, setSizeFile] = useState('')


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
        const localStorageDate = JSON.parse(localStorage.getItem('user'))
        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('categoryID', articleCategory)
        formData.append('cover', articleCover)
        formData.append('body', articleBody)

        fetch(`http://localhost:4000/v1/articles`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageDate.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {

                swal({
                    title: 'مقاله جدید با موفقیت ایجاد شد',
                    icon: 'success',
                    buttons: 'اوکی'
                }).then(() => {
                    getAllArticles()
                })
            }
        })
    }

    // -------edit article
    const editArticle = () => {
        swal({
            title: 'این بخش در حال توسعه می باشد',
            icon: 'info',
            buttons: 'اوکی'
        })
    }

    // --------add new draft article
    const draftArticle = (event) => {
        event.preventDefault()
        const localStorageDate = JSON.parse(localStorage.getItem('user'))
        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('categoryID', articleCategory)
        formData.append('cover', articleCover)
        formData.append('body', articleBody)

        fetch(`http://localhost:4000/v1/articles/draft`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageDate.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                swal({
                    title: 'مقاله جدید با موفقیت پیش نویس شد',
                    icon: 'success',
                    buttons: 'اوکی'
                }).then(() => {
                    getAllArticles()
                })
            }
        })
    }

     // ------------show size files
     const showSize = (fileData) => {
        const { name: fileName, size } = fileData[0]
        setSizeFile({ fileName, size })
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
                                    متن
                                </label>
                                <Editor value={articleBody} setValue={setArticleBody} />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input file-input">
                                <label className="input-title" for='file'>عکس مقاله<i className='icon-file fa-solid fa-upload'></i></label>
                                <input
                                    type="file"
                                    className='file'
                                    id="file"
                                    onChange={event => {
                                        setArticleCover(event.target.files[0]);
                                        showSize(event.target.files)
                                    }}
                                />
                                {
                                    sizeFile ? <p className='file-size'>{sizeFile.fileName} , {(sizeFile.size/1000).toFixed(2)}KB   </p> : <p className='text-danger'>عکسی انتخاب نشده است</p>
                                }
                               
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
                                        className='btn-add-course m-1'
                                        onClick={addNewArticle}
                                        disabled={!formState.isFormValid || articleCategory === '-1' || !articleCover || !articleBody}
                                    >
                                        انتشار
                                    </button>
                                    <button
                                        type="submit"
                                        className='btn-add-course m-2'
                                        onClick={draftArticle}
                                        disabled={!formState.isFormValid || articleCategory === '-1' || !articleCover || !articleBody}
                                    >
                                        پیش نویس
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
                            <th>وضعیت</th>
                            <th>ادامه نوشتن</th>
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
                                    {article.publish ?
                                        (<span className="text-info">منتشر شده</span>)
                                        :
                                        (<span className="text-warning">پیش نویس</span>)
                                    }
                                </td>
                                <td>
                                    {article.publish ?
                                        (<i className="fa-solid fa-check" style={{ color: '#fff' }}></i>)
                                        :
                                        (
                                            <Link className="btn" to={`draft/${article.shortName}`}>
                                                <i className="fa-solid fa-pen fa-beat-fade" style={{ color: '#fff', fontSize: 15 }}></i>
                                            </Link>
                                        )
                                    }
                                </td>

                                <td>
                                    <button type="button" className="btn btn-primary edit-btn" onClick={editArticle}>
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