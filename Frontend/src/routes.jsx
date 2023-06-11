import Category from './pages/Category/Category';
import CourseInfo from './pages/CourseInfo/CourseInfo';
import Index from './pages/Index/Index';

const routes = [
    { path: '/' , element: <Index/> },
    { path: '/category-info/:categoryName' , element: <Category/> },
    { path: '/course-info/:courseName' , element: <CourseInfo/> },
    
]

export default routes;