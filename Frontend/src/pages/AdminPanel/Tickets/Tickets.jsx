import { useEffect, useState } from 'react';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import './Tickets.scss';


const Tickets = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getAllTickets()
    }, []);

    // -----get all tickets for Admin panel
    const getAllTickets = () => {
        fetch(`http://localhost:4000/v1/tickets`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTickets(data);
            });
    };

    // ----------show ticket body
    const showTicketBody = (ticketBody) => {
        swal({
            title: ticketBody,
            buttons: 'OK'
        })
    }

    //  // ----------answer to ticket
    const answerToTicket = (ticketID, ticketBody) => {
        Swal.fire({
            title: ticketBody,
            input: 'text',
            inputLabel: 'پاسخ را وارد کنید...',
            icon: 'info',
            customClass: 'swal-wide',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ارسال',
            cancelButtonText: 'بستن',
            cancelButtonColor: '#d33',
            inputValidator: (value) => {
                if (!value) {
                    return 'پاسخ را بنویسید'
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const ticketPostBody = {
                    body: result.value,
                    ticketID: ticketID
                }
                fetch('http://localhost:4000/v1/tickets/answer', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ticketPostBody)
                }).then(res => {
                    if (res.ok) {
                        res.json()
                        Swal.fire({
                            icon: 'success',
                            title: 'پاسخ با موفقیت ارسال شد',
                            customClass: 'swal-wide',
                            showConfirmButton: true,
                            timer: 1500
                        }).then(ok => getAllTickets())
                    }
                }).then(result => console.log(result))
            }
        })

    }
    return (
        <DataTable title="تیکت‌ها">
            <table className="table">
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>کاربر</th>
                        <th>عنوان</th>
                        <th>نوع تیکت</th>
                        <th>دوره</th>
                        <th>اولویت</th>
                        <th>مشاهده</th>
                        <th>پاسخ</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={ticket._id}>
                            <td className={`td1 ${ticket.answer ? 'bg-success' : 'bg-danger'}`}>{index + 1}</td>
                            <td>{ticket.user}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.departmentSubID}</td>
                            <td>{ticket.course ? ticket.course : "---"}</td>
                            <td>
                                {ticket.priority === 1 && "بالا"}
                                {ticket.priority === 2 && "متوسط"}
                                {ticket.priority === 3 && "کم"}
                            </td>
                            <td>
                                <button type="button" className="btn btn-info edit-btn" onClick={() => showTicketBody(ticket.body)}>
                                    مشاهده
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary edit-btn" onClick={() => answerToTicket(ticket._id, ticket.body)}>
                                    پاسخ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DataTable>
    )
}

export default Tickets