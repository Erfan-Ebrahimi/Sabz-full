import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OrderExplain.scss';

const OrderExplain = () => {

    const [order, setOrder] = useState({})
    const [orderCreatedAt, setorderCreatedAt] = useState('')
    const [orderCourse, setOrderCourse] = useState({})
    const [userInfos ,setUserInfos] = useState({})


    const { id } = useParams()

    useEffect(() => {
        getOrder()
        getUserInfos()
    }, [])

    // --------------get order
    function getOrder() {
        fetch(`http://localhost:4000/v1/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrder(data[0]);
                setorderCreatedAt(data[0].createdAt);
                setOrderCourse(data[0].course);
            });
    }

    function getUserInfos (){
        fetch(`http://localhost:4000/v1/auth/me`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserInfos(data)
                
            });
    }
    return (
        <div className="col-9">
            <div className="order">
                <p className='a5'>
                    سفارش <span className='text-warning'>{id.slice(0, 8)}</span>{' '}
                    در تاریخ <span className='text-warning'>{orderCreatedAt.slice(0, 10)}</span>{' '}
                    ثبت شده است و در وضعیت <span className='text-warning'>تکمیل شده </span> می باشد.
                </p>
                <div className="row">
                    <h1 className='title'>مشخصات سفارش</h1>
                    <div className="m-4">
                        <div className='col-10 a1'>
                            <p className='a2'>محصول</p>
                            <p className='a2'>مجموع</p>
                        </div>
                        <div className='col-10 a1'>

                            <p>{orderCourse.name}</p>
                            <p>{orderCourse.price}</p>

                        </div>
                        <div className='col-10 a1'>
                            <p>جمع کل سبد خرید</p>
                            <p>{order.price}</p>
                        </div>
                        <div className='col-10 a1'>
                            <p>قیمت نهایی</p>
                            <p>{order.price}</p>
                        </div>
                    </div>                    
                    <div className='row mt-5'>
                        <p className='title'>آدرس صورتحساب</p>
                        <div className='a4' >
                            <p className='col-12' >نام  و نام خانوادگی  : <span className='a3'>{userInfos.name}</span></p>
                            <p className='col-12' >ایمیل : <span className='a3'>{userInfos.email}</span></p>
                            <p className='col-12' >تلفن : <span className='a3'>{userInfos.phone}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderExplain;