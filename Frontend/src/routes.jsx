import ArticleInfo from './pages/ArticleInfo/ArticleInfo';
import Articles from './pages/Articles/Articles';
import Category from './pages/Category/Category';
import CourseInfo from './pages/CourseInfo/CourseInfo';
import Courses from './pages/Courses/Courses';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';

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

]

export default routes;