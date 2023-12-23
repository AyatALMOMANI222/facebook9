import React, { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

import axios from "axios";
import { useParams } from "react-router-dom";

const FriendProfile = ({ token }) => {
  const [user, setUser] = useState([]);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [commentPost, setCommentPost] = useState([]);
  const [data, setData] = useState({ content: "", photo: "" });
  const [showComments, setShowComments] = useState(false);

  const usernamee = localStorage.getItem("username");
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const fetchUserById = () => {
    axios
      .get(`http://localhost:3001/user/${userId}`)
      .then((response) => {
        console.log("Fetched user data:", response.data.users[0]);
        setUser(response.data.users);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = (data) => {
    const userId = localStorage.getItem("userId");
    const { content, photo } = data;
    console.log(data, userId);
    axios
      .post(
        "http://localhost:3001/post",
        { userId, content, photo },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response?.data);
        // setPostData(response?.data);
        if (response) {
          axios
            .post(
              `http://localhost:3001/not`,
              {
                user_id: userId,
                notification_type: "post",
                item_id: response.data.postId,
                message: `New post created by ${usernamee}`,
              },
              { headers: { authorization: `Bearer ${token}` } }
            )
            .then((response) => {
              console.log(`New post created by ${usernamee}`, response.data);
            })
            .catch((error) => {
              console.error("Error creating notification:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };
  // const handleCommentClick=(comment, postId)=>{
  //   const userId = localStorage.getItem("userId");
  //   axios.post("http://localhost:3001/comment", {user_id:userId, post_id:postId, comment_text:comment} ,  { headers: { authorization: `Bearer ${token}` } })
  //   .then((response) => {
  //     console.log("Comment created successfully:", response.data);
  //     setCommentPost((prevComments) => [
  //       ...prevComments,
  //       { comment_id: response.data.comment_id, user_id: userId, post_id: postId, comment_text: comment }
  //     ]);
  //     axios
  //     .post(
  //       `http://localhost:3001/not`,
  //       {
  //         user_id: userId,
  //         notification_type: "comment",
  //         item_id: postId,
  //         message: `New comment created by ${usernamee}`,
  //       },
  //       { headers: { authorization: `Bearer ${token}` } }
  //     )
  //     .then((response) => {
  //       console.log(`New comment created by ${usernamee}`, response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error creating notification:", error);
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Failed to create comment:", error);

  //   });
  // }

  const handleCommentClick = (comment, postId) => {
    const userId = localStorage.getItem("userId");
    axios
      .post(
        "http://localhost:3001/comment",
        { user_id: userId, post_id: postId, comment_text: comment },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Comment created successfully:", response.data);
        const newComment = {
          comment_id: response.data.comment_id,
          user_id: userId,
          post_id: postId,
          comment_text: comment,
        };
        // Update the specific post's comments by postId
        setCommentPost((prevComments) => [
          ...prevComments.filter((comment) => comment.post_id !== postId),
          newComment,
        ]);
        // Rest of your code...
      })
      .catch((error) => {
        console.error("Failed to create comment:", error);
      });
  };

  useEffect(() => {
    fetchUserById();
  }, [userId]);

  
  // useEffect(() => {
  //   posts.forEach((post) => {
  //     axios
  //       .get(`http://localhost:3001/comment/${post.post_id}`, {
  //         headers: { authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         console.log(
  //           "Comments for post_id:",
  //           post.post_id,
  //           response.data.comments
  //         );
  //         setCommentPost((prevComments) =>
  //           prevComments.concat(response.data.comments)
  //         );
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Failed to fetch comments for post_id:",
  //           post.post_id,
  //           error
  //         );
  //       });
  //   });
  // }, [posts]);

  const fetchPostsByUserId = () => {
    axios
      .get(`http://localhost:3001/post/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Fetched posts by user:", response.data.posts);
        setPosts(response.data.posts);
        console.log(posts);
      })
      .catch((error) => {
        console.error("Failed to fetch posts by user:", error);
      });
  };
  // useEffect(() => {
  //   fetchPostsByUserId();
  // }, [userId]);

  useEffect(() => {
    fetchPostsByUserId();
  }, [posts]);

  // const deleteComment = (comment_id) => {
  //   const userId = localStorage.getItem("userId");

  //   axios
  //     .delete(`http://localhost:3001/comment/${comment_id}`, {
  //       data: { user_id: userId }, // يتم تمرير البيانات كجزء من الكائن data
  //       headers: { authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       const updatedComments = commentPost.filter(
  //         (comment) => comment.comment_id !== comment_id
  //       );
  //       setCommentPost(updatedComments);
  //       // هنا يمكنك تحديث الحالة أو القيام بإجراءات أخرى بعد حذف التعليق بنجاح
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting comment:", error);
  //       if (error.response) {
  //         console.error("Server responded with:", error.response.data);
  //       } else {
  //         console.error("Error message:", error.message);
  //       }
  //     });
  // };
  // const getCommentsByPostId = (post_id) => {
  //   axios
  //     .get(`http://localhost:3001/comment/${post_id}`)
  //     .then((response) => {
  //       setIdpost(post_id);
  //       setCommentForPost((prevComments) => ({
  //         ...prevComments,
  //         [post_id]: response.data.comments,
  //       }));
  //       setViewComment(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching comments:", error);
  //     });
  // };

  return (
    <div>
      {user.map((e) => {
        return (
          <div>
            <img src={e.cover_photo} />
            <img src={e.profile_picture} />
            <div>{e.username}</div>
            <div>
              <div>{e.bio}</div>
              <div>born in {e.date_of_birth.split("T")[0]}</div>
              <div>
                {" "}
                live in {e.country},{e.city}
              </div>
            </div>
            <input
              placeholder="write post"
              name="content"
              onChange={handleChange}
            />
            <input
              placeholder="enter url photo"
              name="photo"
              onChange={handleChange}
            />
            <button
              onClick={() => {
                handleClick(data);
               
              }}
            >
              post
            </button>

            {posts.map((e) => {
              return (
                <div>
                  <div>{e.content}</div>
                  <img src={e.photo} alt="photo" />

                  {/* {showComments &&
                    commentPost.map((e) => {
                      return (
                        <div>
                          <div>{e.comment_text}</div>
                          <VscChromeClose
                            onClick={() => deleteComment(e.comment_id)}
                          />
                        </div>
                      );
                    })} */}

                  {/* <input
                    placeholder="write comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  /> */}

                  {/* <button
                    onClick={() => handleCommentClick(comment, e.post_id)}
                  >
                    enter
                  </button> */}
                  {/* <button onClick={toggleComments}>
                    {showComments ? "Hide Comments" : "Show Comments"}
                  </button> */}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default FriendProfile;
