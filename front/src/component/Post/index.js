import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
const Post = () => {
  const [profilePost, setProfilePost] = useState([]);
  const [postData, setPostData] = useState({});
  const [postImages, setPostImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getPostByUserId = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3001/post/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.posts);
        setProfilePost(response.data.posts);
   
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };
  useEffect(() => {
    getPostByUserId();
  }, []);

  const handleClick = (postData) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const { content, photo } = postData;
    axios
      .post(`http://localhost:3001/post/${userId}`, postData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response?.data);
        console.log(userId);
        getPostByUserId();
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };

  return (
    <div className="prof-post">
      <input placeholder="write post" name="content" onChange={handleChange} />
      <input
        placeholder="enter url photo"
        name="photo"
        onChange={handleChange}
      />
      <button onClick={() => handleClick(postData)}>post</button>
      {/* {Array.isArray(profilePost) &&
        profilePost?.map((e, i) => {
          return (
            <div>
              <div>{e.content}</div>
              <img className="imgg" src={e.photo} alt="User Post" />
            </div>
          );
        })} */}
    </div>
  );
};

export default Post;
