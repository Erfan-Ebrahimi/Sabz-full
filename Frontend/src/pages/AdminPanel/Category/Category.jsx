import './Category.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { useState, useEffect } from 'react';

const Category = () => {
    const [categories, setCategories] = useState([])

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
                console.log(allCategories);
            })
    }
    return (
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
                                <button type="button" className="btn btn-primary edit-btn">
                                    ویرایش
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger edit-btn">
                                    حذف
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </DataTable>
    )
}

export default Category;