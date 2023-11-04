import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './edit_card.css'
import { BaseUrl } from "../../constant/BaseUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import { userSignin } from "../../redux/action/authAction";
import { useDispatch } from "react-redux";

function EditCard() {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const [errorMessage, setErrorMessage] = useState(false)
  const jwtToken = localStorage.getItem('jwt');
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState(user ? user.first_name : '')
  const [lastName, setlastName] = useState(user ? user.last_name : '')
  const [email, setEmail] = useState(user ? user.email : '')
  const [phone, setPhone] = useState(user ? user.phone : '')
  const [profileImage, setProfileImage] = useState('')

  const handleSaveUpdate = () => {
    console.log(jwtToken)
    if (firstName, lastName, email, phone) {

      const formData = new FormData();
      
      if (profileImage){formData.append('profileImage', profileImage)}
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('email', email)
      formData.append('phone', phone)
      
      axios.post(`${BaseUrl}api/update_user`, formData, {
        headers: {
          Authorization: `${jwtToken}`,
        }
      })
        .then((response) => {
          console.log(response)
          dispatch(userSignin(response.data))
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage(error.response.data.error)
        })

    }
  }

  console.log(profileImage)

  return (
    <div className="flex justify-center h-full mb-5 pt-[15vh] bg-gray-900">
      <div className="w-[50%] h-full border-2 p-10 bg-gray-900">

        <div className="flex justify-center mb-5">
          { profileImage ?  
          <img className="rounded-full aspect-square w-[150px]" src={ profileImage ? URL.createObjectURL(profileImage) : ''} alt="" />
          :
          <img className="rounded-full aspect-square w-[150px]" src={user.profile_img ? 
            `${BaseUrl}${user.profile_img}`: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'} alt="" />
        }
          <input
            type="file"
            className=" absolute h-[150px] w-[150px] cursor-pointer opacity-0 group-hover:opacity-100"
            onChange={ (e)=> setProfileImage(e.target.files[0]) }
          />
        </div>


        {errorMessage &&
          <div class="p-4 mb-4 text-sm text-white rounded-lg bg-gray-800 dark:bg-info dark:text-white" role="alert">
            <span class="font-medium text-center">{errorMessage} !</span>
          </div>
        }
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">

          <div>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              first name
            </label>
            <input
              type="text"
              id="website"
              className="user_input"
              placeholder="enter first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              last name
            </label>
            <input
              type="text"
              id="visitors"
              className="user_input"
              placeholder="enter last name"
              required
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="user_input"
            placeholder="enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            phone
          </label>
          <input
            type="number"
            id="password"
            className="user_input"
            required
            placeholder="enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex items-start mb-6">


        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            type="button"
            className="text-white me-5 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[100%] sm:w-auto px-5 py-2.5 text-center"
          >
            cancel
          </button>
          <button
            onClick={handleSaveUpdate}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[100%] sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCard;