import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscChromeClose } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
// import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import "./style.css";

const PublicPage = ({userId,token}) => {
  const [data, setData] = useState({content: "", photo: "", feeling: "" });
  const [allpost, setAllpost] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const[comment,setComment] =useState("")

const navigate=useNavigate()

  // const token= localStorage.getItem("token")
  //  فقط هذه الجملة للوصول الى التوكن من localStorage




  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const user_id=userId
    const {content, photo, feeling } = data;
    axios
      .post("http://localhost:3001/post",{user_id,content, photo, feeling},
        {headers: { authorization: `Bearer ${token}` }})
      .then((response) => {
        console.log(response?.data);
        console.log(token,userId)
        getAllPost();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const getAllPost = () => {
    axios
      .get("http://localhost:3001/post")
      .then((response) => {
        console.log(response?.data.users);
        setAllpost(response.data.users);
      })
      .catch((error) => {
        console.error("Error get post:", error);
      });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const deletePostById = async (post_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/post/${post_id}`
      );
      console.log(response.data);
      getAllPost();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handleEditClick = () => {
    setEdit(true);
  };
  const handleUpdatedData = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateClick = (post_id) => {
    axios
      .put(`http://localhost:3001/post/${post_id}`, updatedData)
      .then((response) => {
        console.log(response.data);
        getAllPost();
        setEdit(!edit);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };
  const handleComment =(post_id, userId)=>{
    const user_id=userId
   
  axios.post('http://localhost:3001/comment', { user_id :user_id, post_id :post_id,
   comment_text: comment})
   .then((response) => {
      console.log(response.data);
      const comment_id =response.data.result.insertId
    
      console.log( user_id , post_id,comment_id);
    })
    .catch((error) => {
      console.error("Error updating comment:", error);
    });
  }
  




  return (
    <div className="all">
      <input
        placeholder="Whats on your mind ..."
        onChange={handleChange}
        name="content"
      />
      <input
        placeholder="أدخل رابط URL هنا..."
        onChange={handleChange}
        name="photo"
      />
   
      <button onClick={()=>handleClick(userId)}>Post</button>
      <div>
        {/* <h2>All Posts</h2> */}
        <ul>
          {allpost.map((post) => (
            <li key={post.post_id}>
              <div className="post-container">
                <div className="both">
                  <VscChromeClose
                    className="close"
                    onClick={() => {
                      console.log(post.post_id)
                      deletePostById(post.post_id) 
                    }}
                  />
                  {/* <FaRegEdit onClick={handleEditClick} /> */}
                  <p>{post.content}</p>
                </div>
                <img className="photo" src={post.photo} alt="Post" />
                <button>Like</button>
                <div className="comment">
                <input placeholder="write comment" onChange={(e)=>setComment(e.target.value)}/>
              <button onClick={()=>handleComment(post.post_id, userId)}>enter</button>
              </div>
              </div>

              {edit && (
                <>
                  <input
                    placeholder="Whats on your mind..."
                    onChange={handleUpdatedData}
                    name="content"
                  
                  />
                  <input
                    placeholder="أدخل رابط URL هنا..."
                    onChange={handleUpdatedData}
                    name="photo"
                  
                  />
                  <button onClick={() => handleUpdateClick(post.post_id)}>
                    update
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicPage;
