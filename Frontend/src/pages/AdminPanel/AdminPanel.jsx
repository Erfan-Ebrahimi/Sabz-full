import Sidebar from '../../components/AdminPanel/Sidebar/Sidebar';
import Topbar from '../../components/AdminPanel/Topbar/Topbar';
import './AdminPanel.scss';
import { Outlet } from 'react-router-dom';

// har paneli besazim miad inja be onvane Outlet
const AdminPanel = () => {
    return (
        <>
            <div className='content'>
                <Sidebar />
                <div id='home' className="col-10">
                    <Topbar />
                    <div class="container-fluid" id="home-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanel;