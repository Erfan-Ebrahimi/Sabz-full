import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css'
import AuthContext from './context/AuthContext';

function App() {

  // ---------------global states send to Context
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  // ---------------global functions send to Context
  const login = (userIfos , token) => {    //userInfos & token az Register.jsx vaghti registerNewUser farakhani mishavad miad
    if(token){
      console.log('login : token omad');
    }
    setToken(token)
    setUserInfos(userIfos)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify({token : token}))
  }

  const logout = () => {
    console.log('logout');
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')

  }


  // ----------------ROUTES
  const router = useRoutes(routes)

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn,
        token,
        userInfos,
        login,
        logout
      }
    }>
      {router}
    </AuthContext.Provider>
  )
}

export default App
