import './UserPanel.scss';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/UserPanel/Sidebar/Sidebar';

const UserPanel = () => {
    return (
        <>
            <Topbar />
            <Navbar />

            <section className="content">
                <div className="content-header">
                    <div className="container">
                        <span className="content-header__title">حساب کاربری من</span>
                        <span className="content-header__subtitle">پیشخوان</span>
                    </div>
                </div>
                <div className="content-main">
                    <div className="container">
                        <div className="row">

                            {/* col-3 */}
                            <Sidebar />

                            {/* col-9 */}
                            <Outlet />

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default UserPanel;