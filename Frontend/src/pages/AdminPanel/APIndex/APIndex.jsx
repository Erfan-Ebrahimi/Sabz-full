import { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import APItem from "../../../components/AdminPanel/APItem/APItem";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import './APIndex.scss'

const APIndex = () => {

    const [infos, setInfos] = useState([])
    const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])
    const [adminName, setAdminName] = useState('')

    const saleData = [
        {
            name: 'فروردین',
            sale: 5600000,
        },
        {
            name: 'اردیبهشت',
            sale: 10500000,
        },
        {
            name: 'خرداد',
            sale: 9200000,
        },
        {
            name: 'تیر',
            sale: 14700000,
        },
        {
            name: 'مرداد',
            sale: 3500000,
        },
        {
            name: 'شهریور',
            sale: 4000000,
        },
        {
            name: 'مهر',
            sale: 12600000,
        },
        {
            name: 'آبان',
            sale: 14100000,
        },
        {
            name: 'آذر',
            sale: 1200000,
        },
        {
            name: 'دی',
            sale: 5700000,
        },
        {
            name: 'بهمن',
            sale: 8700000,
        },
        {
            name: 'اسفند',
            sale: 4700000,
        }

    ];
    const usersData = [
        {
            name: '',
            users: 0,
        }, {
            name: 'بهار',
            users: 1235,
        },
        {
            name: 'تابستان',
            users: 5600,
        },
        {
            name: 'پاییز',
            users: 12000,
        },
        {
            name: 'زمستان',
            users: 15600,
        }
    ];

    useEffect(() => {
        getInfos()
    }, []);

    // ----get admin panel infos
    function getInfos() {
        fetch("http://localhost:4000/v1/infos/p-admin", {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((pageInfo) => {
                setInfos(pageInfo.infos)
                setLastRegisteredUsers(pageInfo.lastUsers)
                setAdminName(pageInfo.adminName)
            });
    }

    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-content-title">
                        <p className="welcome">
                            <span className="name">{adminName}</span>{" "}خوش آمدید.
                        </p>
                    </div>
                    <div className="home-content-boxes">
                        <div className="row">

                            <div className="chart">
                                <h3 className='chartTitle'>کاربران سایت</h3>
                                <ResponsiveContainer width="100%" aspect={4 / 1}>
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={usersData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid stroke="#ccc00077" strokeDasharray="5 2" />
                                        <XAxis dataKey="name" stroke="#d2ff1e" />
                                        <YAxis stroke="#d2ff1e" />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="users" stroke="#1c2" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="chart">
                                <h3 className='chartTitle'>فروش سالانه (میلیون تومان)</h3>
                                <ResponsiveContainer width="100%" aspect={4 / 1}>
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={saleData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid stroke="#ccc00077" strokeDasharray="5 2" />
                                        <XAxis dataKey="name" stroke="#d2ff1e" />
                                        <YAxis stroke="#d2ff1e" />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="sale" stroke="#1c2" activeDot={{ r: 8 }} />
                                    </LineChart>

                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="home-content-latset-users">
                        <DataTable title="افراد اخیرا ثبت نام شده">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>شناسه</th>
                                        <th>نام و نام خانوادگی</th>
                                        <th>ایمیل</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lastRegisteredUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </DataTable>
                    </div>
                </div>
            </div>

        </>
    )
}

export default APIndex