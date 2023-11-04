import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loader } from "../../../assets/Loader"
import axios from "axios"
import { BaseUrl } from "../../../constant/BaseUrl"
import { adminSignin } from "../../../redux/action/authAction"
import { useDispatch, useSelector } from "react-redux"

function AdminSignin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(false)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const is_authenticated = useSelector((state) => state.auth.is_authenticated );
    const is_admin = useSelector((state) => state.auth.is );

    console.log(is_authenticated, is_admin)
    useEffect(()=>{
        if(is_authenticated){
          navigate('/admin')
        }
      })
    
    const handleAdminLogin = ()=>{
        if (email && password){
            axios.post(`${BaseUrl}/api/admin_signin`, {
                email, 
                password
            })
            .then((response)=>{
                if (response.status == 200) {
                    const token = response.data.admjwt;
                    localStorage.setItem('admjwt', token)
                    dispatch(adminSignin(response.data))
                    console.log('login success', response)
                    navigate('/admin')
                  }
            })
            .catch((error)=>{
                setErrorMessage(true)
                console.log(error)
            })
        }
    }


    return (
        <div className="main bg-gray-900">
            <div className="sample bg-gray-900 border-2">
                <h1 className="text-3xl text-center font-semibold mb-4 text-white">Admin Sign In</h1>
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
                        onClick={handleAdminLogin}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        type="button"
                    >
                        Sign In
                    </button>
                }
            </div>
        </div>
    )

}


export default AdminSignin;