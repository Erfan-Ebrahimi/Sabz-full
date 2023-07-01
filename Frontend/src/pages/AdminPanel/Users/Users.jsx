import './Users.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { useEffect, useState } from 'react';

const Users = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/users', {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then((allUsers) => {
                setUsers(allUsers)
                console.log(allUsers);
            })
    }, [])

    return (
        <>
            <DataTable title="کاربران">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th> نام و نام خانوادگی </th>
                            <th>شماره</th>
                            <th>ایمیل</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                            <th>بن</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger delete-btn">
                                        حذف
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger delete-btn">
                                        بن
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

export default Users;