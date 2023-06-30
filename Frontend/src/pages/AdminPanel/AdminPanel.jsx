import Sidebar from '../../components/AdminPanel/Sidebar/Sidebar';
import './AdminPanel.scss';
import { Outlet } from 'react-router-dom';

// har paneli besazim miad inja be onvane Outlet
const AdminPanel = () => {
    return (
        <>
            <div className='content'>
                <Sidebar />
            </div>
            <Outlet />
        </>
    )
}

export default AdminPanel;