import './IndexBox.scss';
import { Link } from "react-router-dom";


const IndexBox = ({ title, href }) => {
    return (
        <div className="col-4">
            <Link to={href} className="main__link link--1" href="#">
                {title}
            </Link>
        </div>
    )
}

export default IndexBox