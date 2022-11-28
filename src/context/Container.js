import React, { useEffect, useState } from 'react'
import {MyContext} from "./MyContext"
import { useNavigate } from 'react-router-dom'

export default function Container(props) {
    const [records, setRecords]= useState([])
    const [cart,setCart]= useState([])
    const [user,setUser]=useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        //onload event
        fetch("http://localhost:4000/records")
        .then(res=> res.json())
        .then(result=>{
            console.log(result)
            setRecords(result)
        })

       const token = localStorage.getItem("token")
        if(token){
          fetch("http://localhost:4000/users/checkusertoken", {method:"GET", headers:{token:token}} )
          .then(res=>res.json())
          .then(result=>{
            if(result.success){
              setUser(result.data)
            }else{
              navigate("/login")
            }
          })
        }
 

    } ,[])


  return (
    <MyContext.Provider value={{records,setRecords, cart,setCart, user,setUser}}>
        {props.children}
    </MyContext.Provider>
  )
}

//Container VS Component