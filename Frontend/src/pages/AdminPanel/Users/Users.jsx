import './Users.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';

const Users = () => {
    return (
        <>
            <DataTable title="کاربران">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام</th>
                            <th>نام خانوادگی</th>
                            <th>شماره</th>
                            <th>ایمیل</th>
                            <th>رمز عبور</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>34223</td>
                            <td>علی</td>
                            <td>سعیدی</td>
                            <td>09123443243</td>
                            <td>ali@gmail.com</td>
                            <td>ehsan1323</td>
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
                        </tr>
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}

export default Users;