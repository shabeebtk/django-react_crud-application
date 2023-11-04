import React, { useEffect, useState } from "react";
import './signin.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../constant/BaseUrl";
import { userSignin } from "../../redux/action/authAction";
import { useDispatch } from 'react-redux'
import { Loader } from "../../assets/Loader";
import { useSelector } from "react-redux";

function Signin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(false)
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  const is_authenticated = useSelector((state) => state.auth.is_authenticated );
  const adminUser = useSelector(state => state.auth.is_admin)

  useEffect(()=>{
    if(is_authenticated && !adminUser){
      navigate('/')
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email && password) {
      setLoader(true)
      try {
        const response = await axios.post(`${BaseUrl}api/signin`, {
          email,
          password
        });

        if (response.status == 200) {
          const token = response.data.jwt;
          localStorage.setItem('jwt', token)
          const jwtToken = localStorage.getItem('jwt')

          axios.get(`${BaseUrl}api/user_view`, {
            headers: {
              Authorization: `${jwtToken}`,
            }
          })
            .then(response => {
              setLoader(false)
              console.log(response.data)
              dispatch(userSignin(response.data))
              setLoader(false)
              navigate('/admin')
              
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
              setLoader(false)
            });

          console.log('login success', response)

        }
        else {
          console.log('error')
          setLoader(false)
        }
      } catch (error) {
        console.log(error.response.data.detail)
        setErrorMessage(true)
        setLoader(false)
      }
    }
  }

  return (
    <div className="main bg-gray-900">
      <div className="sample bg-gray-900 border-2">
        <h1 className="text-3xl text-center font-semibold mb-4 text-white">Sign In</h1>
        {errorMessage &&
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-info dark:text-red-400" role="alert">
            <span class="font-medium text-center">invalid credentials</span>
          </div>
        }
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="email"
            id="username"
            name="username"
            placeholder="Your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className=" border  bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
          />
        </div>
        {loader ? <Loader /> :
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
        }
        <small className="text-white">Don't have an account? <Link to='/signup'>Register</Link></small>
      </div>
    </div>
  )
}

export default Signin;