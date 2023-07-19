import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import DataTable from '../../AdminPanel/DataTable/DataTable';
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
            <div className="ticket-content__right col-4">
                <span className='span-1'>{props.title}</span>
                <div className="ticket-content__category">
                <i className="fa-solid fa-house-chimney-user mx-2 icon-departeman"></i>
                   <p className='p-11'>{props.departmentSubID}</p> 
                </div>
            </div>

            <div className=" col-3">
                <button className='btn btn-info btn__body mt-5' onClick={() => showTicketBody(props.body)}> مشاهده متن</button>
                {
                    props.answer ?
                        (
                            <Link to={`answer/${props._id}`} >
                                <button className='btn btn-success btn__body  mt-5  '>جزییات تیکت</button>
                            </Link>
                        )
                        :
                        (
                            <button className='btn btn-warning btn__body  mt-5' disabled>جزییات تیکت</button>
                        )
                }
            </div>

            <div className="ticket-content__left-right col-3">
                <div className={`ticket-content__condition ${props.answer ? 'ok' : 'no'}`}>
                    <span className="ticket-content__condition-text">
                        {props.answer === 0 ? "پاسخ داده نشده" : "پاسخ داده شده"}
                    </span>
                </div>
            </div>
            <div className="ticket-content__left col-2">
                <div className="ticket-content__left-left">
                    <span className="ticket-content__time">{props.createdAt.slice(0, 10)}</span>
                </div>
            </div>
        </div>
    )
}

export default TicketBox;