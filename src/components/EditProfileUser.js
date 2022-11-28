import React from "react";
import { useContext } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";


export default function EditProfileUser() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate()

  const sendUpdateRequest = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(`http://localhost:4000/users/${user._id}`, {
      method: "PATCH",
      headers: { token: localStorage.getItem("token") },
      body: data,
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.success){
            toast.success("user profile updated !")
            setUser(result.data)
            setTimeout(()=>{navigate("/profile") },2000)
            
        }else{
            toast.error(result.message)
        }
    })
  };

  return (
    <div>
        <Toaster position="top-center"/>
      <h1>Profile Editing</h1>
      <form onSubmit={sendUpdateRequest}>
        <label>
          First Name :{" "}
          <input type="text" name="firstName" defaultValue={user.firstName} />{" "}
        </label>
        <br />

        <label>
          Last Name :{" "}
          <input type="text" name="lastName" defaultValue={user.lastName} />{" "}
        </label>
        <br />

        <label>
          Password :{" "}
          <input type="password" name="password" placeholder={"******"} />{" "}
        </label>
        <br />

        <label>
          Profile Image : <input type="file" name="image" />{" "}
          <img src={user.profileImage} width="100" alt="profileimage" />
        </label>
        <br />

        <button>save</button>
      </form>
    </div>
  );
}