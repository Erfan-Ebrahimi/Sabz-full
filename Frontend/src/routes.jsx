import ArticleInfo from './pages/ArticleInfo/ArticleInfo';
import Category from './pages/Category/Category';
import CourseInfo from './pages/CourseInfo/CourseInfo';
import Courses from './pages/Courses/Courses';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const routes = [
    { path: '/', element: <Index /> },
    { path: '/courses/:page', element: <Courses /> },
    { path: '/category-info/:categoryName', element: <Category /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },

]

export default routes;