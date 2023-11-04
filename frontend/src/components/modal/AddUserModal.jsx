import axios from 'axios';
import React, { useState } from 'react';
import { BaseUrl } from '../../constant/BaseUrl';
import { useNavigate } from 'react-router-dom';

function AddUserModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProfileImage(false)
    setEmail('')
    setFirstName('')
    setlastName('')
    setPhone('')
    setPassword('')
    setErrorMessage(false)
  };

  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const navigate = useNavigate()

  const handleAddUser = ()=>{
    if (firstName, lastName, email, phone, password){

      const newUser = new FormData();

      if (profileImage){newUser.append('profile_img', profileImage)}
        newUser.append('first_name', firstName)
        newUser.append('last_name', lastName)
        newUser.append('email', email)
        newUser.append('phone', phone)
        newUser.append('password', password)

      axios.post(`${BaseUrl}api/add_user`, newUser)
      .then(response =>{
        console.log('user added')
        closeModal()
      })
      .catch(error =>{
        console.log(error)
        setErrorMessage(error.response.data.error)
      })
    }
  }


  return (
    <div>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block user_input w-[100px] h-full bg-gray-700"
        type="button"
        onClick={toggleModal}
      >
        add user
      </button>


      {modalOpen && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
            onClick={closeModal}
          ></div>
          <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed overflow-y-scroll scrollbar-hide top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
          >

            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-10">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                  data-modal-hide="authentication-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>



                <div className="flex justify-center mb-5">
                  {profileImage ?
                    <img className="rounded-full aspect-square w-[150px]" src={profileImage ? URL.createObjectURL(profileImage) : ''} alt="" />
                    :
                    <img className="rounded-full aspect-square w-[150px]" src={'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'} alt="" />
                  }
                  <input
                    type="file"
                    className=" absolute h-[150px] w-[150px] cursor-pointer opacity-0 group-hover:opacity-100"
                    onChange={(e) => setProfileImage(e.target.files[0])}
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
                <div className="mb-6">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="user_input"
                    required
                    placeholder="enter phone"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>



                <button
                  type="button"
                  onClick={ handleAddUser }
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800"
                >
                  add user
                </button>
                
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
}

export default AddUserModal;
