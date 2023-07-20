import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './Tickets.scss';
import TicketBox from "../../../components/UserPanel/TicketBox/TicketBox";

const Tickets = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getUserTickets()
    }, []);

    // -------get user tickets
    function getUserTickets() {
        fetch(`http://localhost:4000/v1/tickets/user`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTickets(data);
            });
    }
    return (
        <div className="col-9">
            <div className="ticket">
                <div className="ticket-header">
                    <span className="ticket-header__title title">لیست تیکت های من </span>
                    <Link className="ticket-header__link" to="/my-account/send-ticket">
                        ارسال تیکت جدید
                    </Link>
                </div>
                <div className="ticket-content">
                    {
                        tickets ? 
                        <>
                            (
                                {tickets.map((ticket) =>{
                                    return <TicketBox {...ticket} key={ticket._id}/>
                                })}

                            )
                        
                        </>
                        :
                        (
                            <p className='text-warning'>هیچ تیکتی موجود نیست</p>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Tickets;