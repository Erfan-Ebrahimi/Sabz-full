import { useEffect, useState } from "react";
import './Menus.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../components/Form/Input";
import { minValidator } from "../../../validators/rules";

const Menus = () => {

    const [menus, setMenus] = useState([]);
    const [menuParent, setMenuParent] = useState("-1");

    // ---------form inputs
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            href: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllMenus();
    }, []);

    // ----------get all menus
    function getAllMenus() {
        fetch("http://localhost:4000/v1/menus/all")
            .then((res) => res.json())
            .then((allMenus) => setMenus(allMenus));
    }

    // ----------remove menu
    const removeMenu = (menuID) => {
        swal({
            title: "آیا از حذف منو اطمینان دارید؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/menus/${menuID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                            }`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "منوی مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllMenus();
                        });
                    }
                });
            }
        });
    };

    // ------- add new menu
    const createNewMenu = (event) => {
        event.preventDefault();

        const newMenuInfo = {
            title: formState.inputs.title.value,
            href: formState.inputs.href.value,
            parent: menuParent === "-1" ? undefined : menuParent, //undefines for menue asli
        };

        fetch(`http://localhost:4000/v1/menus`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMenuInfo),
        }).then((res) => {
            if (res.ok) {
                swal({
                    title: "منوی جدید با موفقیت ایجاد شد",
                    icon: "success",
                    buttons: "اوکی",
                }).then((result) => {
                    getAllMenus();
                });
            }
        });
    };

    // --------edit menu
    const editMenu = () => {
        swal({
            title: 'این بخش در حال توسعه می باشد',
            icon: 'success',
            buttons: 'اوکی'
        })
    }


    return (
        <>
            <div className="container">
                <div className="home-title">
                    <span>افزودن منو جدید</span>
                </div>
                <form className="form">
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title">عنوان</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                id="title"
                                type="text"
                                isValid="false"
                                placeholder="لطفا عنوان را وارد کنید..."
                                validations={[minValidator(5)]}
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title">آدرس</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                id="href"
                                type="text"
                                isValid="false"
                                validations={[minValidator(2)]}
                                placeholder="لطفا عنوان را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="name input g1 ">
                            <label className="input-title">دسته بندی</label>
                            <select
                                className="select"
                                onChange={(event) => setMenuParent(event.target.value)}
                            >
                                <option value="-1">منوی اصلی</option>
                                {menus.map((menu) => {
                                    {
                                        if (!Boolean(menu.parent)) {
                                            return <option key={menu._id} value={menu._id}>{menu.title}</option>
                                        }
                                    }
                                })}
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
                                    onClick={createNewMenu}
                                    disabled={!formState.isFormValid}
                                >
                                    افزودن
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <DataTable title="منوها">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مقصد</th>
                            <th>فرزند ...</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu, index) => (
                            <tr key={menu._id}>
                                <td>{index + 1}</td>
                                <td>{menu.title}</td>
                                <td>{menu.href}</td>
                                <td>
                                    {menu.parent ?
                                        (
                                            menu.parent.title
                                        )
                                        :
                                        (
                                            <i className="fa fa-check"></i>
                                        )
                                    }
                                </td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn" onClick={editMenu}>
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeMenu(menu._id)}
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

export default Menus;