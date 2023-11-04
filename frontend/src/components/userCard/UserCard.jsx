import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constant/BaseUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"

function UserCard() {

    const user = useSelector(state => state.auth.user)
    const is_autheniicated = useSelector(state => state.auth.is_atheniicated)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    if (!user) {
        navigate('/signin')
    }

    console.log(user)
    console.log(is_autheniicated)

    return (
        <div className="flex h-[100vh] pb-[25vh] items-center justify-center bg-gray-900">

            <div className="flex justify-around items-center  w-[50vw] h-[35vh] rounded-lg border-2 border-white bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
                <div>
                    <img className="rounded-full aspect-square w-[150px] hover:hidden" src={user.profile_img ?
                        `http://127.0.0.1:8000/${user.profile_img}` : 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'} alt="" />
                </div>

                <div>
                    <h2 className=" text-xl font-bold text-indigo-600 dark:text-indigo-400">{user && user.first_name} {user && user.last_name}</h2>
                    <p className=" font-bold my-2 text-gray-600 dark:text-gray-300">{user && user.email}</p>
                    <div className="flex items-center justify-center my-3">
                        <Link to='/edit'><button className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500">edit</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;