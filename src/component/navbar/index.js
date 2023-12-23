import React from 'react'
import { Link } from 'react-router-dom'
import { LiaUserFriendsSolid } from "react-icons/lia";
import Search from '../search';
import "./style.css"

const Navbar = ({profile_picture , token , userId}) => {
  const username = localStorage.getItem("username");




  return (
  
    <div className='nav'>
     
 <div className='fb'>FaceBook</div>
 
 <div className='links'>
          
          <Link to="/publicPage"className='link'>Home</Link>
          <Link to="/profile" className='link'>Profile</Link>
          <Link to="/friend" className='link'>Friend</Link>
          {/* <Link to="/contact" className='link'>Contact</Link> */}
          </div>


         <Search/>
          
          <div className='links'>
         
          <Link to="/notification" className='link'>Notification</Link>
          <Link to="/message" className='link'>Message</Link>
          <Link to="/mode" className='link'>Mode</Link>
          <Link to="/setting" className='link'>Setting</Link>
          <Link to ="/user" className='link'>users</Link>
          </div>

          <div className='pro'>
   <div>{username}</div>
          </div>
          
         
      
       </div>
    
     
  )
}

export default Navbar
