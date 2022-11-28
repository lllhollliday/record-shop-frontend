
import React from 'react';
import { useContext } from 'react';
import { NavLink, Routes, Route} from "react-router-dom"
import Cart from './components/Cart';
import EditProfileUser from './components/EditProfileUser';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Records from './components/Records';
import Signup from './components/Signup';
import { MyContext } from './context/MyContext';

function App(props) {
  const {cart,user} = useContext(MyContext)
  return (
    
   
      <div className="App">
        
        <ul>
          <li><NavLink to="/">Home </NavLink></li>
          <li><NavLink to="/records">Records </NavLink></li>
          {user ? 
             <>
             <li><NavLink to="/orders" >Orders </NavLink></li>
             <li><NavLink to="/profile" > Profile</NavLink></li> 
             </> 
             : 
             <> 
             <li><NavLink to="/login" >Login </NavLink></li>
            <li><NavLink to="/signup" >Signup </NavLink></li>  
            </> }
         
          <li><NavLink to="/cart" >Cart <sup>{cart.length}</sup> </NavLink></li>
         
        </ul>
        <Routes>
          {/* Client Side Routing */}
          <Route path="/" element={ <HomePage/>}/>
          <Route path="/records" element={<Records/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={ <Signup/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/cart" element={ <Cart/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editprofileuser" element={<EditProfileUser/>}/>
        </Routes>

       
        
        
      
        
       
        

      </div>
  
  );
}

export default App;