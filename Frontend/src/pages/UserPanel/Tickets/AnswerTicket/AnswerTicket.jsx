import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import './AnswerTicket.scss'

const AnswerTicket = () => {

    const { id } = useParams();
    const [ticketInfo, setTicketInfo] = useState({});
    const [ticketId, setTicketId] = useState('');

    useEffect(() => {
        getUserTicketAnswer()
    }, []);

    //------------get user ticket answer
    function getUserTicketAnswer() {
        fetch(`http://localhost:4000/v1/tickets/answer/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTicketInfo(data);
                setTicketId(data._id)
            });
    }
    return (
        <div className="col-9">
            <div className="ticket">
                <div className="ticket-header">
                    <span className="ticket-top__text"> شناسه تیکت :<span className="text-primary mx-2">{ticketId.slice(0, 8)}</span></span>
                    <div>
                        <Link className="ticket-header__link" to="/my-account/send-ticket">
                            ارسال تیکت جدید
                        </Link>
                        <Link className="ticket-header__link" to="/my-account/tickets">
                             لیست تیکت ها
                        </Link>

                    </div>
                </div>

                <div className="ticket-send">

                    <div className="ticket-send__title">
                        <span className="ticket-send__title-text">
                            متن تیکت
                        </span>
                    </div>
                    <div className="ticket-send__answer">
                        <div className="ticket-send__answer-box">
                            <p className="ticket-send__answer-text">{ticketInfo.ticket}</p>
                        </div>

                    </div>
                    <div className="ticket-send__title">
                        <span className="ticket-send__title-text">
                            پاسخ
                        </span>
                    </div>

                    {ticketInfo.answer === null ?
                        (
                            <div className="alert alert-danger">
                                هنوز پاسخی برای تیکت ارسال نشده
                            </div>
                        )
                        :
                        (
                            <div className="ticket-send__answer-user">
                                <div className="ticket-send__answer-user-box">
                                    <p className="ticket-send__answer-user-text">{ticketInfo.answer}</p>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default AnswerTicket