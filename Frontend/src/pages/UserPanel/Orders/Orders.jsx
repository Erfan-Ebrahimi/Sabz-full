import { useState , useEffect } from 'react';
import {Link} from 'react-router-dom'
import './Orders.scss'



const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrders()
    }, []);

    // ------get all orders
    function getAllOrders() {
        fetch(`http://localhost:4000/v1/orders`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setOrders(data);
            });
    }


    return (
        <div className="col-9">
            <div className="order">
                <table className="order__table">
                    <thead className="order__table-header">
                        <tr className="order__table-header-list">
                            <th className="order__table-header-item">شناسه</th>
                            <th className="order__table-header-item">تاریخ</th>
                            <th className="order__table-header-item">وضعیت</th>
                            <th className="order__table-header-item">دوره</th>
                            <th className="order__table-header-item">مبلغ</th>
                            <th className="order__table-header-item">عملیات ها</th>
                        </tr>
                    </thead>
                    <tbody className="order__table-body">
                        {orders.map((order, index) => (
                            <tr className="order__table-body-list" key={order._id}>
                                <td className="order__table-body-item">
                                    <span href="#" className="order__table-body-link">
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="order__table-body-item">{order.createdAt.slice(0, 10)}</td>
                                <td className="order__table-body-item">تکمیل شده</td>
                                <td className="order__table-body-item">
                                    {order.course.name}
                                </td>
                                <td className="order__table-body-item">
                                    {order.price}
                                </td>
                                <td className="order__table-body-item">
                                    <Link className="btn btn-info" to={`${order._id}`}>
                                        نمایش
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders;