import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import './TicketBox.scss';

const TicketBox = (props) => {

    console.log(props);
    // --------show ticket body
    const showTicketBody = (ticketBody) => {
        swal({
            title: ticketBody,
            buttons: 'OK'
        })
    };


    return (
        <div className="ticket-content__box">
            <div className="ticket-content__right">
                <div className="ticket-content__right-right">
                    <Link className="ticket-content__link" to={`answer/${props._id}`}>
                        {props.title}
                    </Link>
                    <span className="ticket-content__category">
                        <i className="fa fa-ellipsis-v ticket-content__icon"></i>
                        {props.departmentSubID}
                    </span>
                </div>
            </div>
            <div>
                <button className='btn btn-primary btn__body' onClick={() => showTicketBody(props.body)}>مشاهده</button>
            </div>
            <div className="ticket-content__left">
                <div className="ticket-content__left-right">
                    <div className={`ticket-content__condition ${props.answer ? 'ok' : 'no'}`}>
                        <span className="ticket-content__condition-text">
                            {props.answer === 0 ? "پاسخ داده نشده" : "پاسخ داده شده"}
                        </span>
                    </div>
                </div>
                <div className="ticket-content__left-left">
                    <span className="ticket-content__time">{props.createdAt.slice(0, 10)}</span>
                </div>
            </div>
        </div>
    )
}

export default TicketBox;