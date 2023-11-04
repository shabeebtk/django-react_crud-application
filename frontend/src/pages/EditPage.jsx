import React, { useEffect } from "react";
import EditCard from "../components/edit card/EditCard";
import { useSelector } from "react-redux";

function EditPage(){

    const is_authenticated = useSelector((state) => state.auth.is_authenticated );
    const adminUser = useSelector(state => state.auth.is_admin)

    useEffect(()=>{
        if(!is_authenticated){
          navigate('/signin')
        }
      })
    return(
        <EditCard/>
    )
}

export default EditPage;