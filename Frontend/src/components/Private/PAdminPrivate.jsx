import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PAdminPrivate = ({children}) => {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <>
            {
                authContext.userInfos.role === 'ADMIN' ? <>{children}</> : navigate('/login')
            }
        </>
    )
}

export default PAdminPrivate;