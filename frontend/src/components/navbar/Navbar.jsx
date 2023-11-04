import React from "react";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import { userLogout } from "../../redux/action/authAction";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function Navbar(){

    const dispatch = useDispatch()
    const is_authenticated = useSelector((state) => state.auth.is_authenticated );
    const user = useSelector( state => state.auth.user )
    const navigate = useNavigate()

    console.log(user)

    const handleLogout = async ()=>{
        if (is_authenticated){
            try{
                const response = await axios.post(`${BaseUrl}api/user_logout`)
                localStorage.removeItem('jwt')
                dispatch(userLogout())
                console.log('logout success')
                navigate('/signin')
            }
            catch (error){
                console.log(error)
            }
        }else{
            navigate('/signin')
        }
    }

    return(
        <div className="flex justify-between text-white px-10 h-[10vh] items-center bg-gray-900 shadow-lg">
            <h2>User Details</h2>
            <button onClick={ handleLogout } className="border p-2 rounded hover:bg-gray-800">Logout</button>
        </div>
    )
}

export default Navbar;