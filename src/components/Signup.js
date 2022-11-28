import React, { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../context/MyContext"

import toast, { Toaster } from "react-hot-toast"

export default function Signup() {
  //  const formRef = useRef()

  const { setUser } = useContext(MyContext)

  const navigate = useNavigate()

  const registerUser = (event) => {
    event.preventDefault()

    /*     console.log(formRef.current) // form
    console.log(formRef.current.firstName) // input field named firstName
    console.log(formRef.current.firstName.value) /// value in the field firstName */
    /* 
    let userData = {
      fName: formRef.current.fName.value,
      lName: formRef.current.lName.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      image: formRef.current.image.files[0],
    }
    console.log(userData)
    let formdata = new FormData()
    for(const key of userData){
      formdata.append(key, userData[key])
    }
 */
    // send data to backend

    const data = new FormData(event.target)
    fetch("http://localhost:4000/users", {
      method: "POST",
      //headers: { "Content-Type": "multipart/form-data" },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          // setUser(result.user)
          toast.success("Successfully signed up!")
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        } else {
          toast.error(JSON.stringify(result.message))
        }
      })

    /* 
    console.log("form submitted!")
    const data = new FormData(event.target)
    console.log(data) */
  }

  return (
    <div>
      <h1>Signup/Register User</h1>
      <form onSubmit={registerUser} /* ref={formRef} */>
        <label>
          First Name: <input type="text" name="firstName" required />
        </label>
        <br />

        <label>
          Last Name: <input type="text" name="lastName" required />
        </label>
        <br />

        <label>
          Email: <input type="email" name="email" required />
        </label>
        <br />

        <label>
          Password: <input type="password" name="password" required />
        </label>
        <br />

        <label>
          Profile Image: <input type="file" name="image" />
        </label>
        <br />

        <button>Register/Signup</button>
      </form>
    </div>
  )
}
