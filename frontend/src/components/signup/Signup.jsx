import React, { useContext, useState } from "react";
import './signup.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import { Loader } from "../../assets/Loader";

function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (firstName && email && phone && lastName && password && password == confirmPassword) {
      setLoader(true)
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password
      }
      axios.post(`${BaseUrl}api/register`, newUser)
        .then((response) => {
          setLoader(false)
          navigate('/signin')
        })
        .catch((error) => {
          console.log(error.response.data.error)
          setLoader(false)
          setErrorMessage(error.response.data.error)

        })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="border p-8 rounded-lg shadow-md w-[35%] bg-gray-900 ">
        <h1 className="text-3xl text-white text-center font-semibold mb-4">Register</h1>

        {errorMessage &&
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-info dark:text-red-400" role="alert">
            <span class="font-medium text-center">{errorMessage}</span>
          </div>
        }

        <div className="mb-4 flex gap-6 w-full">
          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              first name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="input_color"
              type="text"
              id="username"
              name="username"
              placeholder="Your first name"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              last name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="input_color w-[200px]"
              type="text"
              id="username"
              name="username"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input_color"
            type="email"
            id="username"
            name="username"
            placeholder="Your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            phone
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            className="input_color"
            type="number"
            id="username"
            name="username"
            placeholder="Your phone"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input_color"
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Confirm Password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input_color"
            type="password"
            id="password"
            name="password"
            placeholder="confirm Your password"
          />
        </div>
        { loader ? <Loader/> : 
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          type="button"
        >
          Register
        </button>
        }
        <small className="text-center text-white">already have an account? <Link to='/signin'><span className="text-blue-800">login</span></Link></small>
      </div>

    </div>


  )
}

export default Signup;