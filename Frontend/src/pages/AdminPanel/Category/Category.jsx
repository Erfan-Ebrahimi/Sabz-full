import './Category.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { useState, useEffect } from 'react';
import Input from "../../../components/Form/Input";
import {
    requiredValidator,
    minValidator,
    maxValidator,
} from "./../../../validators/rules";
import { useForm } from "./../../../hooks/useForm";
// import swal from "sweetalert";
import Swal from 'sweetalert2'
import swal from 'sweetalert';


const Category = () => {
    const [categories, setCategories] = useState([])

    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            shortname: {
                value: "",
                isValid: false,
            },
        },
        false
    );


    useEffect(() => {
        getAllCategories()
    }, [])

    // -----------get categories
    function getAllCategories() {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/category', {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then((allCategories) => {
                setCategories(allCategories)
            })
    }

    // --------- add new category
    const createNewCategory = (event) => {
        event.preventDefault();
        const localStorageData = JSON.parse(localStorage.getItem("user"))

        const newCategoryInfo = {
            title: formState.inputs.title.value,
            name: formState.inputs.shortname.value,
        };

        fetch("http://localhost:4000/v1/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify(newCategoryInfo),
        })
            .then((res) => res.json())
            .then((result) => {
                swal({
                    title: "دسته بندی مورد نظر با موفقیت اضافه شد",
                    icon: "success",
                    buttons: "اوکی",
                }).then(() => {
                    getAllCategories();
                });
            });
    };

    // -------- remove category
    const removeCategory = (categoryID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"))
        swal({
            title: "آیا از حذف دسته بندی مطمئنی ؟",
            icon: "warning",
            buttons: ['نه', 'آره'],
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    const localStorageData = JSON.parse(localStorage.getItem('user'))
                    fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorageData.token}`

                        }
                    }).then((res) => {
                        if (res.ok) {
                            swal("حذف شد!", "", "success").then(result => getAllCategories())
                        }
                    })
                }
            });
    }

    // ---------update category
    const updateCategory = (categoryID) => {
        Swal.fire({
            title: 'اطلاعات جدید را وارد کنید',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="موضوع جدید">' +
                '<input id="swal-input2" class="swal2-input" placeholder="نام جدید">',


            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        }).then((inputValues) => {
            const localStorageData = JSON.parse(localStorage.getItem("user"))
            let newCategoryDetails = {
                name: inputValues.value[0],
                title: inputValues.value[1]
            }
            fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorageData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategoryDetails)
            }).then((res) => {
                if (res.ok) {
                    res.json()
                    swal({
                        title:'با موفقیت ویرایش شد',
                        icon:'success',
                        buttons:'Ok'
                    }).then(ok => getAllCategories())
                    
                }
            })


        })


    }
    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن دسته‌بندی جدید</span>
                    </div>
                    <form className="form">
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">عنوان</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="title"
                                    placeholder="لطفا عنوان را وارد کنید..."
                                    validations={[minValidator(5), maxValidator(30)]}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">اسم کوتاه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="shortname"
                                    placeholder="لطفا اسم کوتاه را وارد کنید..."
                                    validations={[minValidator(5), maxValidator(20)]}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <input
                                        type="submit"
                                        value="افزودن"
                                        onClick={createNewCategory}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <p className='alert alert-danger'>دسته بندی فرانت و بک تغییر داده نشود</p>
                </div>
            </div>
            <DataTable title="دسته بندی ها">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th> نام دسته بندی </th>
                            <th> موضوع دسته بندی </th>
                            <th>ویرایش</th>
                            <th>حذف</th>

                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.title}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary edit-btn"
                                        onClick={() => {
                                            updateCategory(category._id)
                                        }}
                                    >
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger edit-btn"
                                        onClick={() => {
                                            removeCategory(category._id)
                                        }}
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

export default Category;