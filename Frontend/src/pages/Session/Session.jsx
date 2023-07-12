import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from 'react-player'

import "./Session.scss";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";

const Session = () => {

    const { courseName, sessionID } = useParams();
    const [session, setSession] = useState({});
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        getOneSession()
    }, [sessionID]);

    // -------get one session
    function getOneSession() {
        fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
        }).then(res => res.json())
            .then(data => {
                setSession(data.session)
                setSessions(data.sessions)
            })
    }

    return (
        <>
            <Topbar />
            <Navbar />

            <section className="content">
                <div className="col-4">
                    <div className="sidebar">
                        <div className="sidebar__header">
                            <a className="sidebar__header-link" href="#">
                                لیست جلسات
                            </a>
                            <i className="sidebar__haeder-icon fa fa-book-open"></i>
                        </div>
                        <div className="sidebar-topics">
                            <div className="sidebar-topics__item">
                                <ul className="sidebar-topics__list">
                                    {
                                        sessions.map(session => (
                                            <Link to={`/${courseName}/${session._id}`} key={session._id}>
                                                <li className="sidebar-topics__list-item">
                                                    <div className="sidebar-topics__list-right">
                                                        <i className="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                                                        <span className="sidebar-topics__list-item-link" href="#">
                                                            {session.title}
                                                        </span>
                                                    </div>
                                                    <div className="sidebar-topics__list-left">
                                                        <span className="sidebar-topics__list-item-time">
                                                            {session.time}:00
                                                        </span>
                                                    </div>
                                                </li>
                                            </Link>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="episode">
                        <div className="episode-haeder">
                            <div className="episode-header__right">
                                <span className="episode-header__right-back-link" href="#">
                                    <i className="episode-header__right-back-icon fa fa-angle-right"></i>
                                    <div className="episode-header__right-home">
                                        <Link className="episode-header__right-home-link" to={`/course-info/${courseName}`}>
                                            به دوره خانه بروید
                                        </Link>
                                        <i className="episode-header__right-home-icon fa fa-home"></i>
                                    </div>
                                </span>
                            </div>
                            <div className="episode-header__left">
                                <i className="episode-header__left-icon fa fa-play-circle"></i>
                                <span className="episode-header__left-text">
                                    {" "}
                                    سوالات متداول در مورد جاوااسکریپت و دوره
                                </span>
                            </div>
                        </div>
                        <div className="episode-content">
                            <ReactPlayer
                                url={`http://localhost:4000/courses/covers/${session.video}`}
                                controls={true}
                                light={<img src='/assets/images/example.jpg' alt='Thumbnail' />}
                                width={700}
                                height={400}
                            />

                            <a target="_blank" download className="episode-content__video-link" href={`http://localhost:4000/courses/covers/${session.video}`}>
                                دانلود ویدئو
                            </a>
                            <div className="episode-content__bottom">
                                <a className="episode-content__backward" href="#">
                                    <i className="episode-content__backward-icon fa fa-arrow-right"></i>
                                    قبلی
                                </a>
                                <a className="episode-content__forward" href="#">
                                    بعدی
                                    <i className="episode-content__backward-icon fa fa-arrow-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Session;