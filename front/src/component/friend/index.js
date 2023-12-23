import React from 'react'
import { Link } from 'react-router-dom'


const Friend = (token , userId) => {
  
  return (
    <div>
                <Link to="/publicPage"className='link'>Home</Link>
          <Link to="/FriendRequests" className='link'>Friend Requests</Link>
          <Link to="/Suggestions" className='link'>Suggestions</Link>
          <Link to="/AllFriends" className='link'>All Friends</Link>

    </div>
  )
}

export default Friend
