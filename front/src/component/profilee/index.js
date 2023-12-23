// import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import Modal from "../model";
// import "./style.css";
// import axios from "axios";
// // const Hedaya=()=>{
// //     return <div>
// //         <span>hello</span>
// //         <span>ameer</span>
// //     </div>
// // }
// const Profile = ({ username, profile_picture, token, userId }) => {
//   const [profData, setProfData] = useState({});
//   const [isModalOpen, setIsModalOpen] =useState(false)

//   const getprofile = () => {
//     axios
//       .get("http://localhost:3001/user/62")
//       .then((response) => {
//         console.log(response.data.users);
//         setProfData(response.data.users[0]);
//       })
//       .catch((error) => {
//         console.error("Error ", error);z
//       });
//   };
//   useEffect(() => {
//     getprofile();
//   }, []);

//   return (
//     <div>
//       <div className="user-cover-container">
//         <img className="user-cover-img" src={profData?.cover_photo} />
//         <img className="user-profile-img" src={profData?.profile_picture} />
//       </div>
//       <div className="username-container">
//         <span className="username">{profData?.username}</span>
//      {/* <button onClick={()=> setIsModalOpen(true)}>editProfile</button>
//      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} children={<Hedaya/>} /> */}

//      </div>
//     </div>
//   );
// };

// export default Profile;
