import { useCallback, useEffect, useState } from 'react';
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
  // az useCallback estefade mikonim ta az render bihode jelogiri konim
  const login =useCallback( (userIfos, token) => {    //userInfos & token az Register.jsx or Login.jsx vaghti registerNewUser or userLogin farakhani mishavad miad
    if (token) {
      console.log('login : token omad');
    }
    setToken(token)
    setUserInfos(userIfos)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify({ token: token }))
  } , [token])

  const logout = useCallback( () => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')

  } , [token])

  // ------------- useEffect
  //if tokeni bod digar niaz be login harbare nabashad v automatic kar login anjam shavad
  // data karbar ra dar userInfos save mikonim
  useEffect(() => {

    const localStorageData = JSON.parse(localStorage.getItem('user'))

    if (localStorageData) {
      fetch('http://localhost:4000/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorageData.token}`
        }
      }).then(res => res.json())
        .then((userData) => {
          setIsLoggedIn(true)
          setUserInfos(userData)
        })
    }else{
      setIsLoggedIn(false)
    }
  }, [token])

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
