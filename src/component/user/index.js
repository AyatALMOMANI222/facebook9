import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const User = ({ userId, token }) => {
  const [users, setUsers] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  // const userId =localStorage.getItem('userId')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user");
        setUsers(response.data.users);
        console.log(response.data);
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };

    fetchUsers();
  }, []);
  // const token =localStorage.getItem('token')
  const handleClick = (userId, user_id) => {
    let friend_id = user_id;
    axios
      .post(
        `http://localhost:3001/friend`,
        { userId, friend_id },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response?.data);
        console.log(userId, friend_id);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        console.log(error.response);
      });
  };

  const acceptFriendRequest = (friendship_id, token) => {
    axios
      .put(
        `http://localhost:3001/friend/accept/17${friendship_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // Handle success response here
      })
      .catch((error) => {
        console.error("Error accepting friend request:", error);
        // Handle error here
      });
  };

  const handleUserClick = (userId) => {
    navigate(`/friendProfile/${userId}`);
  };

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <div onClick={() => handleUserClick(user.user_id)}>
            {user.username}
          </div>
          {user.user_id}

          {/* <div>{userId != user.user_id && <button onClick={()=>handleClick(userId,user.user_id )}>AddFriend</button>}</div> */}
        </div>
      ))}
    </div>
  );
};

export default User;
