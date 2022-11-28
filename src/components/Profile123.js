import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const [editMode, setEditMode] = useState(false);

  const firstNameRef = useRef();
  const profileRef = useRef();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const UpdateUserProfile = () => {
    const data = new FormData();
    data.append("firstName", firstNameRef.current.value);
    data.append("image", profileRef.current.files[0]);
console.log(localStorage.getItem("token"))
    fetch(`http://localhost:4000/users/${user._id}`, {
      method: "PATCH",
      headers: { token: localStorage.getItem("token") },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.success){
          toast.success("user profile updated !")
          setEditMode(false)
          setUser(result.data)
        }else{
          toast.error(result.message)
        }
      });
  };

  return (
    <div>
      <Toaster position="top-center"/>
      {user && (
        <>
          <h1>Profile</h1>
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          {editMode ? (
            <label>
              First Name :{" "}
              <input
                type="text"
                defaultValue={user.firstName}
                ref={firstNameRef}
              />
            </label>
          ) : (
            <p>{user.firstName}</p>
          )}
          {editMode ? (
            <input type="file" ref={profileRef} />
          ) : (
            <img src={user.profileImage} width="300" alt="profileImage" />
          )}
          <h2>User Orders </h2>
          <ul>
            {user.orders.map((order) => {
              return (
                <div key={order._id}>
                  <h3>{order._id}</h3>
                  <button>delete order</button>
                </div>
              );
            })}
          </ul>
          {editMode ? (
            <>
              <button onClick={UpdateUserProfile}>Save</button>{" "}
              <button onClick={() => setEditMode(false)}>cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}>Update Profile</button>
          )}
          <button onClick={logout}>logout</button>
          <button>Delete User</button>{" "}
        </>
      )}
    </div>
  );
}

/*    true &&  false => true
if(2 > 1 &&  3 < 2){
  console.log("hello")
} */