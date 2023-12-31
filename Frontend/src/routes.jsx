import ArticleInfo from './pages/ArticleInfo/ArticleInfo';
import Articles from './pages/Articles/Articles';
import Category from './pages/Category/Category';
import CourseInfo from './pages/CourseInfo/CourseInfo';
import Courses from './pages/Courses/Courses';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';
import Search from './pages/Search/Search';
import Session from './pages/Session/Session';

// -----AdminPanel routes
import PAdminPrivate from './components/Private/PAdminPrivate';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import AdminCategory from "./pages/AdminPanel/Category/Category";
import ContactUs from './pages/AdminPanel/ContactUs/ContactUs';
import Sessions from './pages/AdminPanel/Sessions/Sessions';
import Menus from "./pages/AdminPanel/Menus/Menus";
import Comments from './pages/AdminPanel/Comments/Comments';
import Offs from './pages/AdminPanel/Offs/Offs';
import Draft from './pages/AdminPanel/Articles/Draft/Draft';
import APIndex from './pages/AdminPanel/APIndex/APIndex';
import APTickets from './pages/AdminPanel/Tickets/Tickets';

// --------UserPanel
import UserPanel from './pages/UserPanel/UserPanel';
import UserPanelIndex from './pages/UserPanel/UserPanelIndex/UserPanelIndex';
import Orders from './pages/UserPanel/Orders/Orders';
import OrderExplain from './pages/UserPanel/Orders/OrderExplain/OrderExplain';
import UserPanelCourses from "./pages/UserPanel/Courses/Courses";
import SendTicket from './pages/UserPanel/Tickets/SendTicket/SendTicket';
import Tickets from './pages/UserPanel/Tickets/Tickets';
import AnswerTicket from './pages/UserPanel/Tickets/AnswerTicket/AnswerTicket';
import EditAccount from './pages/UserPanel/EditAccount/EditAccount';




const routes = [
    { path: '/', element: <Index /> },
    { path: '/courses/:page', element: <Courses /> },
    { path: '/category-info/:categoryName/:page', element: <Category /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/:courseName/:sessionID', element: <Session /> },
    { path: '/articles/:page', element: <Articles /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/contact', element: <Contact /> },
    { path: '/search/:value', element: <Search /> },
    {
        path: '/p-admin/*',
        element: (
            <PAdminPrivate>
                <AdminPanel />
            </PAdminPrivate>
        ),
        children: [
            { path: "", element: <APIndex /> },
            { path: "users", element: <Users /> },
            { path: "courses", element: <AdminCourses /> },
            { path: "menus", element: <Menus /> },
            { path: "articles", element: <AdminArticles /> },
            { path: "articles/draft/:shortName", element: <Draft /> },
            { path: "category", element: <AdminCategory /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "sessions", element: <Sessions /> },
            { path: "comments", element: <Comments /> },
            { path: "offs", element: <Offs /> },
            { path: "tickets", element: <APTickets /> }
        ]
    },
    {
        path: "/my-account/*",
        element: <UserPanel />,
        children: [
            { path: "", element: <UserPanelIndex /> },
            { path: "orders", element: <Orders /> },
            { path: "orders/:id", element: <OrderExplain /> },
            { path: "buyed", element: <UserPanelCourses /> },
            { path: "tickets", element: <Tickets /> },
            { path: "send-ticket", element: <SendTicket /> },
            { path: "tickets/answer/:id", element: <AnswerTicket /> },
            { path: "edit-account", element: <EditAccount /> },


        ],
    },

]

export default routes;