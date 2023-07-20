import { useState, useEffect } from 'react';
import './ContactUs.scss';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import swal from 'sweetalert';

const ContactUs = () => {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getAllContacts()
    }, [])

    // ----get all contacts
    function getAllContacts() {
        fetch('http://localhost:4000/v1/contact')
            .then(res => res.json())
            .then(allContacts => {
                setContacts(allContacts)
            })

    }

    // --------show contact body
    const showContactBody = (body) => {
        swal({
            title: body,
            buttons: 'بستن'
        })
    };

    // -------answer to user contact
    const sendAnwserToUser = (contactEmail) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({
            title: "متن پاسخ را وارد کنید",
            content: 'input',
            buttons: "ارسال ایمیل"
        }).then(value => {
            const anwserInfo = {
                email: contactEmail,
                answer: value
            }

            fetch('http://localhost:4000/v1/contact/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorageData.token}`
                },
                body: JSON.stringify(anwserInfo)
            }).then(res => {
                if (res.ok) {
                    res.json()
                    swal({
                        title: 'ایمیل به کاربر با موفقیت ارسال شد',
                        icon: 'success',
                        buttons: 'OK'
                    }).then(ok => getAllContacts())
                }
            })
        })
    }

    // -------remove user contact
    const removeUserContact = (contactID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({
            title: "آیا از حذف اطمینان دارید ؟",
            icon: 'warning',
            dangerMode: true,
            buttons: ["نه", "آره"]
        }).then(yes => {
            if (yes) {
                fetch(`http://localhost:4000/v1/contact/${contactID}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`
                    }
                }).then((ok) => {
                    if(ok){
                        swal({
                            title: "پیام کاربر با موفقیت حذف شد",
                            icon: 'success'
                        }).then(result => getAllContacts())
                    }
                })
            }
        })
    }

    
    return (
        <>
            <DataTable title="پیام کاربران">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام و نام خانوادگی</th>
                            <th>ایمیل</th>
                            <th>شماره تماس</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={contact._id}>
                                <td className={contact.answer === 1 ? 'answer-contact' : 'no-answer-contact'}>{index + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-info edit-btn"
                                        onClick={() => showContactBody(contact.body)}
                                    >
                                        مشاهده پیغام
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary edit-btn"
                                        onClick={() => sendAnwserToUser(contact.email)}
                                    >
                                        پاسخ
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeUserContact(contact._id)}
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

export default ContactUs;