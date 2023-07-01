import './Users.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { useEffect, useState } from 'react';
import swal from 'sweetalert'

const Users = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers()
    }, [])

    // -----------get users
    function getAllUsers() {
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
    }

    // -----remove User
    const removeUser = (userID) => {
        swal({
            title: "آیا از حذف کاربر مطمئنی ؟",
            icon: "warning",
            buttons: ['نه', 'آره'],
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    const localStorageData = JSON.parse(localStorage.getItem('user'))
                    fetch(`http://localhost:4000/v1/users/${userID}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorageData.token}`

                        }
                    }).then((res) => {
                        if (res.ok) {
                            swal("حذف شد!", "", "success").then(result => getAllUsers())
                        }
                    })
                }
            });
    }

    // ----------BAN user
    const banUser = (userID) => {
        swal({
            title: "آیا از بن کاربر مطمئنی ؟",
            icon: "warning",
            buttons: ['نه', 'آره'],
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    const localStorageData = JSON.parse(localStorage.getItem('user'))
                    fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${localStorageData.token}`

                        }
                    }).then((res) => {
                        if (res.ok) {
                            swal("بن شد !", "", "success").then(result => getAllUsers())
                        }
                    })
                }
            })}


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
                                        <button
                                            type="button"
                                            className="btn btn-danger delete-btn"
                                            onClick={() => {
                                                removeUser(user._id)
                                            }}
                                        >
                                            حذف
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger delete-btn"
                                            onClick={() => {
                                                banUser(user._id)
                                            }}
                                        >
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