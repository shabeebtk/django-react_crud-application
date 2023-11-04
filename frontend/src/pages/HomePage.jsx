import React from "react";
import Home from "../components/home/Home";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Navbar from "../components/navbar/Navbar";

function HomePage() {

    const is_authenticated = useSelector((state) => state.auth.is_authenticated );
    const adminUser = useSelector(state => state.auth.is_admin)
    const navigate = useNavigate()

    useEffect(()=>{
        if(adminUser){
            navigate('/signin')
        }
    })

    return (
        <>
        <Navbar/>
        <Home />
        </>
    )
}

export default HomePage;