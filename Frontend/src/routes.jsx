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

// -----AdminPanel routes
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
// import Menus from "./pages/AdminPanel/Menus/Menus";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import AdminCategory from "./pages/AdminPanel/Category/Category";
import ContactUs from './pages/AdminPanel/ContactUs/ContactUs';

const routes = [
    { path: '/', element: <Index /> },
    { path: '/courses/:page', element: <Courses /> },
    { path: '/category-info/:categoryName/:page', element: <Category /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/articles/:page', element: <Articles /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/contact', element: <Contact /> },
    { path: '/search/:value', element: <Search /> },
    {
        path: '/p-admin',
        element: <AdminPanel />,
        children: [
            { path: "users", element: <Users /> },
            { path: "courses", element: <AdminCourses /> },
            // { path: "menus", element: <Menus /> },
            { path: "articles", element: <AdminArticles /> },
            { path: "category", element: <AdminCategory /> },
            { path: "contact-us", element: <ContactUs /> }
        ]
    },

]

export default routes;