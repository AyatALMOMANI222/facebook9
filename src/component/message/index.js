import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './style.css'
const Message = ({token , userId}) => {

  const [allUser, setAllUser]=useState([])
const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user');
        setAllUser(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error('Error getting users:', error);
      }
    };
    

    fetchUsers();
  }, []);
 const handleClick=(user_id)=>{
  console.log(user_id);
navigate(`/messenger/${user_id}`)
 }


  return (
    <div>
{allUser.map((e)=>{
  return(
    <div>
     <span>{e.username}</span> 
      {e.user_id}
      <button onClick={()=>handleClick(e.user_id)}>sent message</button>
    </div>
  )
})}
    </div>
  )
}

export default Message
