import Category from './pages/Category/Category';
import Index from './pages/Index/Index';

const routes = [
    { path: '/' , element: <Index/> },
    { path: '/category-info/:categoryName' , element: <Category/> },
    
]

export default routes;