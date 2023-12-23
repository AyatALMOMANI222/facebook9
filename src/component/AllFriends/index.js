import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
const AllFriends = ({ token }) => {
  const [allFriends, setAllFriends] = useState([]);
  useEffect(() => {
    getAllFriends(token);
  }, [token]);

  const getAllFriends = (token) => {
    axios
      .get(`http://localhost:3001/friend`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAllFriends(response.data.friendsList);
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };

  return (
    <div className="all-friend-container">
      {allFriends.map((e, i) => {
        return (
          <div className="friend-container">
            <img
              className="my-friend-img"
              src={e.profile_picture || "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"}

              alt="picture"
            />

          <span className="friend-username"> {e.username}</span> 
          </div>
        );
      })}
    </div>
  );
};

export default AllFriends;
