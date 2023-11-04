import React from "react";
import { useSelector } from 'react-redux'
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import { userLogout } from "../../redux/action/authAction";
import { useDispatch } from 'react-redux'
import UserCard from "../userCard/UserCard";
import EditCard from "../edit card/EditCard";

function Home(){

    const dispatch = useDispatch()
    const is_authenticated = useSelector((state) => state.auth.is_authenticated );
    const user = useSelector( state => state.auth.user )

    const handleLogout = async ()=>{
        if (is_authenticated){
            try{
                const response = await axios.post(`${BaseUrl}api/user_logout`)
                localStorage.removeItem('jwt')
                dispatch(userLogout())
                console.log('logout success')
                
            }
            catch (error){
                console.log(error)
            }
        }
    }

    return(
        <>
        <UserCard/>
       </>
    )
}

export default Home;