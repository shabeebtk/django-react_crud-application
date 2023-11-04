import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import axios, { all } from "axios";
import { BaseUrl } from "../../../constant/BaseUrl";
import AddUserModal from "../../modal/AddUserModal";
import EditUserModal from "../../modal/EditUserModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../redux/action/authAction";
import refreshIcon from '../../../assets/refresh.png'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [allUsers, setAllUsers] = useState([])
    const allUser = useSelector(state => state.all.allUser)
    const adminUser = useSelector(state => state.auth.is_admin)
    const [searchQuery, setSearchQuery] = useState('');
    
    const getAllUser = ()=>{
        axios.get(`${BaseUrl}api/all_users`)
            .then((response) => {
                setAllUsers(response.data)
                dispatch(getAllUsers(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        if (!adminUser){
            navigate('/admin_signin')
        }
        getAllUser()
    }, [dispatch])


    const handleUserDelete = (user_id)=>{
        axios.delete(`${BaseUrl}api/delete_user/${user_id}`)
        .then((response)=>{
            setAllUsers(allUsers.filter(user => user.id !== user_id))
            dispatch(getAllUsers(response.data))
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery.length)
        if (searchQuery.length <= 1){
            getAllUser()
        }

        const filteredUsers = allUsers.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
       setAllUsers(filteredUsers)
      };
    
      


    return (
        <div className="bg-gray-800 h-full pb-[10vh]">
            <Navbar />

            <div className="px-9 py-5">
                <div className="flex justify-end gap-3">
                    <AddUserModal/>
                    <div className="w-[300px]">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                            </div>
                            <input onChange={ handleSearch }  type="search" id="default-search" className="block w-full p-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search here..." required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </div>

                </div>
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    profile
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    first name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    last name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    phone
                                </th>
                                <th className="flex justify-around pt-3">
                                    <p>edit</p>

                                <img onClick={ getAllUser } className="h-[20px]" src={refreshIcon} alt="" />
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allUsers.map(user => (

                                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            <img className="aspect-square rounded-full h-[100px]" src={user.profile_img ? `${BaseUrl}/${user.profile_img}` : 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'} alt="" />
                                        </td>
                                        <td className="x py-4">
                                            {user ? user.first_name : ''}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user ? user.last_name : ''}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user ? user.email : ''}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user ? user.phone : ''}
                                        </td>
                                        <td className="flex gap-3 items-center pt-[20%]">
                                            <EditUserModal 
                                                user_id={user.id}
                                                first_name={user.first_name}
                                                last_name={user.last_name}
                                                email={user.email}
                                                phone={user.phone}
                                                profile_img={user.profile_img}
                                                
                                                 />
                                            <button onClick={ ()=> handleUserDelete(user.id) } className="user_input w-[60px]">delete</button>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            
        </div>
    )
}

export default Dashboard;
