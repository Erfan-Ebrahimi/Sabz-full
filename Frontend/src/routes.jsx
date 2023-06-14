import ArticleInfo from './pages/ArticleInfo/ArticleInfo';
import Category from './pages/Category/Category';
import CourseInfo from './pages/CourseInfo/CourseInfo';
import Courses from './pages/Courses/Courses';
import Index from './pages/Index/Index';

const routes = [
    { path: '/', element: <Index /> },
    { path: '/courses', element: <Courses /> },
    { path: '/category-info/:categoryName', element: <Category /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },

]

export default routes;