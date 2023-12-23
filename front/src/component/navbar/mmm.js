// import React,{useState} from 'react'
// import { useEffect } from 'react';
// import { IoHomeOutline } from "react-icons/io5";
// import { IoMoonOutline } from "react-icons/io5";
// import { LiaUserFriendsSolid } from "react-icons/lia";
// // import { IoMdSearch } from "react-icons/io";
// import { MdPerson } from "react-icons/md";
// import { TbMessage } from "react-icons/tb";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import Friend from '../friend';
// import Profile from '../profile';
// import PublicPage from '../public page';

// import "./style.css"
// const Navbar = ({userId ,token}) => {
//     const [activeComponent, setActiveComponent] = useState(null);
//     const username = localStorage.getItem('username');
//     const profile_picture = localStorage.getItem('profile_picture')
//     const handleIconClick = (component) => {
//         setActiveComponent(component);
//       };
//       const renderComponent = () => {
//         switch (activeComponent) {
//           case 'PublicPage':
//             return
//              <PublicPage userId={userId} token={token} />;
//           case 'Profile':
//             return <Profile />;
//           case 'Friend':
//             return <Friend />;
//           default:
//             return null;
//         }
//       };    

//   return (
//     <div className='navbar'>
//         <div  className='first_dev'>
//         <div className='fb'>FaceBook</div>
//         <div>
//         <IoHomeOutline className='icon' onClick={() => handleIconClick('PublicPage')}/>
//         <IoMoonOutline className='icon' />
//         <LiaUserFriendsSolid className='icon' onClick={() => handleIconClick('Profile')}/>
//         </div>
//         </div>

//         <div  className='search'>
//             <input placeholder='Search'/>
//         </div>
//         <div>
//             <MdPerson  className='icon'/>
//             <TbMessage  className='icon'/>
//             <IoMdNotificationsOutline  className='icon' onClick={() => handleIconClick('Friend')}/>
//         </div>
//         {renderComponent()}

//         <div>
//             {username}

//           <img src={profile_picture}/>
//         </div>
//     </div>
//   )
// }

// export default Navbar
