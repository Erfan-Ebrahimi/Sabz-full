import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import AuthContext from "../../context/AuthContext";

import "./Session.scss";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";

const Session = () => {

    const { courseName, sessionID } = useParams();
    const [session, setSession] = useState({});
    const [sessions, setSessions] = useState([]);
    const [courseDetails, setCourseDetails] = useState({}) //baghiy data be joz comments & sessions dar in state save mishavad


    const authContext = useContext(AuthContext)

    useEffect(() => {
        getOneSession()
        getCourseDetails()
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

    function getCourseDetails() {
        // aval check mikonim k tokeni hast ya n k if fetch ham anjam shod baz karbari k token dare betone dastresi dashte bashe
        // film jalase 349 dide shavad
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/courses/${courseName}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorageData === null ? null : localStorageData.token}` // yani shakhs hanoz login nakarde
            }
        })
            .then(res => res.json())
            .then(courseInfo => {
                setCourseDetails(courseInfo)
                console.log(courseInfo);
            })
    }


    return (
        <>
            <Topbar />
            <Navbar />

            <section className="content1">
                <div className="col-4">
                    <div className="sidebar-22">
                        <div className="sidebar__header">
                            <a className="sidebar__header-link" href="#">
                                لیست جلسات
                            </a>
                        </div>
                        <div className="sidebar-topics">
                            <div className="sidebar-topics__item">
                                <ul className="sidebar-topics__list">

                                    {
                                        courseDetails.isUserRegisteredToThisCourse ?
                                            (
                                                <>
                                                    {sessions.map(session => (
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
                                                    ))}

                                                </>

                                            )
                                            :
                                            (
                                                <p className="text-danger mx-4">برای دسترسی به لیست جلسات در دوره ثبت نام کنید :(</p>
                                            )
                                    }


                                </ul>
                                <div className="home-course">
                                    <Link to={`/course-info/${courseName}`}>
                                        صفحه اصلی دوره
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="episode">

                        <div className="episode-content">
                            <ReactPlayer
                                url={`http://localhost:4000/courses/covers/${session.video}`}
                                controls={true}
                                light={<img src='/assets/images/example.jpg' alt='Thumbnail' />}
                                width={700}
                                height={400}
                            />

                            <a target="_blank" download className="episode-content__video-link btn--3" href={`http://localhost:4000/courses/covers/${session.video}`}>
                                دانلود ویدئو
                            </a>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Session;