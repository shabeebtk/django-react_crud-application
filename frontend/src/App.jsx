import './App.css'
import { BaseUrl } from './constant/BaseUrl'
import { useDispatch } from 'react-redux'
import { userSignin } from './redux/action/authAction'
import axios from 'axios'
// pages 
import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import SignUpPage from './pages/SignupPage'
import EditPage from './pages/EditPage'


import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import AdminSigninPage from './pages/admin/AdminSigninPage'
import AdminHomePage from './pages/admin/AdminHomePage'

function App() {
  const dispatch = useDispatch()
  const jwtToken = localStorage.getItem('jwt');

  axios.get(`${BaseUrl}api/user_view`, {
    headers: {
      Authorization: `${jwtToken}`,
    }
  })
    .then(response => {
      console.log(response.data)
      dispatch(userSignin(response.data))
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='signin' element={<SigninPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='edit' element={<EditPage />} />

        
        <Route path='admin' element={<AdminHomePage/>}>
        <Route path='/admin_signin' element={<AdminSigninPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
